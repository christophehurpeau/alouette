/// <reference lib="dom" />
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import path from "node:path";
import { parseArgs } from "node:util";
import { type Browser, type Page, chromium } from "playwright";

interface IndexEntry {
  id: string;
  title: string;
  name: string;
  type: string;
}

interface Shot {
  storyId: string;
  section?: string;
}

const packageDir = path.resolve(import.meta.dirname, "..");
const staticDir = path.join(packageDir, "storybook-static");
const mimeTypes: Record<string, string> = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".mjs": "text/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    "no-build": { type: "boolean", default: false },
    list: { type: "string" },
    width: { type: "string", default: "1200" },
    out: { type: "string" },
    upload: { type: "string" },
  },
});

function readIndex(): IndexEntry[] {
  const index = JSON.parse(
    fs.readFileSync(path.join(staticDir, "index.json"), "utf8"),
  ) as { entries: Record<string, IndexEntry> };
  return Object.values(index.entries).filter((entry) => entry.type === "story");
}

function parseShot(arg: string): Shot {
  const separatorIndex = arg.indexOf("#");
  if (separatorIndex === -1) return { storyId: arg };
  return {
    storyId: arg.slice(0, separatorIndex),
    section: arg.slice(separatorIndex + 1),
  };
}

function shotFileName({ storyId, section }: Shot): string {
  const slug = section
    ? `${storyId}-${section.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`
    : storyId;
  return `${slug.replace("alouette-", "")}.png`;
}

function resolveStaticFile(requestUrl: string | undefined): string | null {
  let urlPath: string;
  try {
    urlPath = decodeURIComponent(
      new URL(requestUrl ?? "/", "http://localhost").pathname,
    );
  } catch {
    return null;
  }
  const filePath = path.join(
    staticDir,
    urlPath === "/" ? "index.html" : urlPath,
  );
  const relativePath = path.relative(staticDir, filePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }
  return fs.statSync(filePath, { throwIfNoEntry: false })?.isFile()
    ? filePath
    : null;
}

function startStaticServer(): Promise<http.Server> {
  const server = http.createServer((request, response) => {
    const filePath = resolveStaticFile(request.url);
    if (filePath === null) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, {
      "Content-Type":
        mimeTypes[path.extname(filePath)] ?? "application/octet-stream",
    });
    fs.createReadStream(filePath)
      .on("error", () => response.destroy())
      .pipe(response);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

type StoryStatus = "error" | "success";

// Resolves on Storybook's `storyFinished`, emitted once the story has rendered
// and its `play` has run. The listener is attached from an init script the
// moment Storybook installs its channel, so the event cannot be missed, and
// reports through a Playwright binding, which keeps working once
// `freeze=finished` has stopped the page's timers.
async function listenForStoryFinished(
  page: Page,
): Promise<() => Promise<StoryStatus>> {
  const { promise, resolve } = Promise.withResolvers<StoryStatus>();
  await page.exposeFunction("__onStoryFinished", resolve);
  await page.addInitScript(() => {
    interface Channel {
      on: (
        event: string,
        listener: (payload: { status: StoryStatus }) => void,
      ) => void;
    }
    const scope = globalThis as unknown as {
      __onStoryFinished: (status: StoryStatus) => void;
      __storybookChannelInstalled?: boolean;
    };
    const listened = new WeakSet<Channel>();
    let channel: Channel | undefined;
    Object.defineProperty(globalThis, "__STORYBOOK_ADDONS_CHANNEL__", {
      configurable: true,
      get: () => channel,
      set: (next: Channel) => {
        channel = next;
        scope.__storybookChannelInstalled = true;
        if (listened.has(next)) return;
        listened.add(next);
        next.on("storyFinished", ({ status }) =>
          scope.__onStoryFinished(status),
        );
      },
    });
  });
  return () => promise;
}

const storyFinishedTimeoutMs = 30_000;
const storybookInternalsHint =
  "Storybook internals used by scripts/screenshot-stories.ts may have changed in a Storybook upgrade";

// Names which of the Storybook internals the script relies on is missing, so a
// Storybook upgrade fails with the fix to make rather than a bare timeout.
async function explainStoryTimeout(
  page: Page,
  storyId: string,
): Promise<string> {
  const { channelInstalled, phase } = await page.evaluate(() => {
    const scope = globalThis as unknown as {
      __storybookChannelInstalled?: boolean;
      __STORYBOOK_PREVIEW__?: { currentRender?: { phase?: string } };
    };
    return {
      channelInstalled: scope.__storybookChannelInstalled === true,
      phase: scope.__STORYBOOK_PREVIEW__?.currentRender?.phase,
    };
  });
  const waited = `Story ${storyId}: no "storyFinished" event after ${storyFinishedTimeoutMs / 1000}s.`;
  if (!channelInstalled) {
    return `${waited} The preview never assigned globalThis.__STORYBOOK_ADDONS_CHANNEL__, where the listener is attached. ${storybookInternalsHint}: find how the preview now exposes its channel and update listenForStoryFinished.`;
  }
  if (phase === "finished") {
    return `${waited} The story reached the "finished" render phase, so the event was emitted under another name or payload. ${storybookInternalsHint}: look up STORY_FINISHED in storybook/internal/core-events and update listenForStoryFinished.`;
  }
  if (phase === undefined) {
    return `${waited} __STORYBOOK_PREVIEW__.currentRender.phase is unreadable, so the render state is unknown. ${storybookInternalsHint}.`;
  }
  return `${waited} The render is stuck in the "${phase}" phase: the story's play function (or a loader) never settles. Fix the story, or capture another one.`;
}

async function waitForStoryFinished(
  page: Page,
  storyFinished: () => Promise<StoryStatus>,
  storyId: string,
): Promise<void> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timedOut = new Promise<"timeout">((resolve) => {
    timeout = setTimeout(() => {
      resolve("timeout");
    }, storyFinishedTimeoutMs);
  });
  const status = await Promise.race([storyFinished(), timedOut]);
  clearTimeout(timeout);
  if (status === "timeout") {
    throw new Error(await explainStoryTimeout(page, storyId));
  }
  if (status === "error") {
    throw new Error(`Story ${storyId} failed to render or its play threw`);
  }
}

async function screenshotSection(
  page: Page,
  shot: Shot & { section: string },
  file: string,
): Promise<void> {
  const titles = page.getByText(shot.section, { exact: true });
  if ((await titles.count()) === 0) {
    throw new Error(
      `Story ${shot.storyId} has no section titled "${shot.section}"`,
    );
  }
  await titles
    .first()
    .locator("xpath=..")
    .screenshot({ path: file, animations: "disabled" });
}

async function capture(shots: Shot[], outDir: string): Promise<string[]> {
  const server = await startStaticServer();
  const { port } = server.address() as AddressInfo;
  const files: string[] = [];
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch();
    for (const shot of shots) {
      const page = await browser.newPage({
        viewport: { width: Number(values.width), height: 800 },
      });
      const storyFinished = await listenForStoryFinished(page);
      await page.goto(
        `http://127.0.0.1:${port}/iframe.html?id=${shot.storyId}&viewMode=story&freeze=finished`,
      );
      await waitForStoryFinished(page, storyFinished, shot.storyId);
      await page.evaluate(() => document.fonts.ready);
      const file = path.join(outDir, shotFileName(shot));
      if (shot.section) {
        await screenshotSection(page, { ...shot, section: shot.section }, file);
      } else {
        await page.screenshot({
          path: file,
          fullPage: true,
          animations: "disabled",
        });
      }
      files.push(file);
      await page.close();
    }
  } finally {
    server.close();
    await browser?.close();
  }
  return files;
}

function git(args: string[], input?: string): string {
  return execFileSync("git", args, {
    cwd: packageDir,
    input,
    stdio: ["pipe", "pipe", "pipe"],
  })
    .toString()
    .trim();
}

// The images are served from the repository the commit is pushed to, which
// is `origin`, not necessarily the repository `gh` defaults to (a fork).
function githubRepoOfOrigin(): string {
  const url = git(["remote", "get-url", "origin"]);
  const repo = /github\.com[:/](?<repo>[^/]+\/[^/]+?)(?:\.git)?$/.exec(url)
    ?.groups?.repo;
  if (repo === undefined) {
    throw new Error(`origin is not a GitHub repository: ${url}`);
  }
  return repo;
}

function upload(files: string[], pr: string): string[] {
  const tree = git(
    ["mktree"],
    files
      .map(
        (file) =>
          `100644 blob ${git(["hash-object", "-w", file])}\t${path.basename(file)}\n`,
      )
      .join(""),
  );
  const branch = `refs/heads/pr-assets/${pr}`;
  const repo = githubRepoOfOrigin();
  // Chained onto the previous upload, never force-pushed: a PR body keeps
  // linking the earlier commits by SHA, which must stay reachable.
  const parent = git(["ls-remote", "origin", branch]).split("\t")[0];
  if (parent) git(["fetch", "--quiet", "origin", branch]);
  const commit = git([
    "commit-tree",
    tree,
    ...(parent ? ["-p", parent] : []),
    "-m",
    `chore: screenshots for #${pr}`,
  ]);
  git(["push", "--quiet", "origin", `${commit}:${branch}`]);
  return files.map(
    (file) =>
      `<img src="https://raw.githubusercontent.com/${repo}/${commit}/${path.basename(file)}" width="600">`,
  );
}

if (!values["no-build"]) {
  execFileSync("pnpm", ["run", "build-storybook"], {
    cwd: packageDir,
    stdio: ["ignore", "ignore", "inherit"],
  });
}

if (values.list !== undefined) {
  const filter = values.list.toLowerCase();
  for (const entry of readIndex()) {
    if (
      entry.id.includes(filter) ||
      entry.title.toLowerCase().includes(filter)
    ) {
      console.log(`${entry.id}\t${entry.title} / ${entry.name}`);
    }
  }
} else {
  if (positionals.length === 0) {
    throw new Error(
      "Usage: screenshot-stories [--no-build] [--width 1200] [--out dir] [--upload <pr>] <storyId>[#<section title>]...",
    );
  }
  const outDir =
    values.out ??
    fs.mkdtempSync(path.join(process.env.TMPDIR ?? "/tmp", "shots-"));
  const shots = positionals.map(parseShot);
  const storyIds = new Set(readIndex().map((entry) => entry.id));
  const unknownIds = shots
    .map((shot) => shot.storyId)
    .filter((storyId) => !storyIds.has(storyId));
  if (unknownIds.length > 0) {
    throw new Error(`Unknown story ids (see --list): ${unknownIds.join(", ")}`);
  }
  const files = await capture(shots, outDir);
  console.log(files.join("\n"));
  if (values.upload !== undefined) {
    console.log(upload(files, values.upload).join("\n\n"));
  }
}
