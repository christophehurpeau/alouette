import { globSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function readStoryExports(source: string): Map<string, string> {
  const storyExports = new Map<string, string>();
  const exportPattern = /^export const (\w+)\b[^\n]*= \{\n([\s\S]*?)^\};$/gm;
  for (const [, exportName, body] of source.matchAll(exportPattern)) {
    storyExports.set(exportName!, body!);
  }
  return storyExports;
}

// Chromatic snapshots the Variants story, which already renders what the
// Preview shows; the Preview only serves the docs page and the controls.
describe.each(globSync("**/*.stories.tsx", { cwd: srcDir }).toSorted())(
  "%s",
  (path) => {
    const storyExports = readStoryExports(
      readFileSync(resolve(srcDir, path), "utf8"),
    );
    const previews = [...storyExports].filter(([exportName]) =>
      exportName.includes("Preview"),
    );

    it.runIf(previews.length > 0)("has a Variants story", () => {
      expect(
        [...storyExports.keys()].some((exportName) =>
          exportName.includes("Variants"),
        ),
      ).toBe(true);
    });

    it.each(previews)("%s skips the Chromatic snapshot", (_, body) => {
      expect(body).toContain("chromatic: { disableSnapshot: true }");
    });
  },
);
