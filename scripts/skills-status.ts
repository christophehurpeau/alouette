// Reconciliation report for packages/alouette/skills: what changed since the
// last release, what no skill covers, and whether every SKILL.md is valid.
// Exits 1 when a skill is invalid.
//
//   node scripts/skills-status.ts [--base <ref>]
//
// Workflow: .claude/skills/update-skills/SKILL.md

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const skillsDir = "packages/alouette/skills";
const packageJsonPath = "packages/alouette/package.json";
const indexPath = "packages/alouette/src/index.ts";

// agentskills.io limits
const descriptionLimit = 1024;
const lineLimit = 500;
const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const read = (file: string): string =>
  fs.readFileSync(path.join(repoRoot, file), "utf8");

const exists = (file: string): boolean =>
  fs.existsSync(path.join(repoRoot, file));

const git = (args: string[]): string =>
  execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  }).trim();

const gitOrUndefined = (args: string[]): string | undefined => {
  try {
    return git(args);
  } catch {
    return undefined;
  }
};

interface Frontmatter {
  scalars: Map<string, string>;
  lists: Map<string, string[]>;
}

const unquote = (value: string): string =>
  /^(["']).*\1$/.test(value) ? value.slice(1, -1) : value;

/**
 * Reads the subset of YAML the skills use: `key: value`, folded/literal block
 * scalars (`key: >`) and lists of `- item`.
 */
const parseFrontmatter = (content: string): Frontmatter | undefined => {
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(content);
  if (!match?.[1]) return undefined;
  const scalars = new Map<string, string>();
  const lists = new Map<string, string[]>();
  const lines = match[1].split("\n");
  for (let index = 0; index < lines.length; index++) {
    const keyMatch = /^([\w-]+):(.*)$/.exec(lines[index] ?? "");
    if (!keyMatch) continue;
    const [, key = "", rawRest = ""] = keyMatch;
    const rest = rawRest.trimStart();
    const block: string[] = [];
    while (
      index + 1 < lines.length &&
      /^(?:\s|$)/.test(lines[index + 1] ?? "")
    ) {
      block.push((lines[++index] ?? "").trim());
    }
    if (rest === ">" || rest === "|") {
      scalars.set(key, block.join(rest === ">" ? " " : "\n").trim());
    } else if (rest) {
      scalars.set(key, unquote(rest));
    } else {
      lists.set(
        key,
        block
          .filter((line) => line.startsWith("- "))
          .map((line) => unquote(line.slice(2).trim())),
      );
    }
  }
  return { scalars, lists };
};

interface Skill {
  name: string;
  description: string;
  lineCount: number;
  sources: string[];
  problems: string[];
}

const readSkill = (name: string): Skill => {
  const content = read(`${skillsDir}/${name}/SKILL.md`);
  const frontmatter = parseFrontmatter(content);
  const description = frontmatter?.scalars.get("description") ?? "";
  const sources = frontmatter?.lists.get("sources") ?? [];
  const lineCount =
    content.split("\n").length - (content.endsWith("\n") ? 1 : 0);
  const problems: string[] = [];
  if (!frontmatter) problems.push("no frontmatter");
  if (frontmatter?.scalars.get("name") !== name) {
    problems.push(`name must be "${name}", the directory name`);
  }
  if (!namePattern.test(name)) {
    problems.push("name must be lowercase words joined by single hyphens");
  }
  if (!description) problems.push("no description");
  if (description.length > descriptionLimit) {
    problems.push(
      `description is ${description.length} chars (max ${descriptionLimit})`,
    );
  }
  if (lineCount > lineLimit) {
    problems.push(
      `${lineCount} lines (max ${lineLimit}): split into references/`,
    );
  }
  if (sources.length === 0) problems.push("no sources");
  for (const source of sources) {
    if (!exists(source)) problems.push(`source no longer exists: ${source}`);
  }
  return { name, description, lineCount, sources, problems };
};

const readSkills = (): Skill[] =>
  fs
    .readdirSync(path.join(repoRoot, skillsDir))
    .filter((name) => exists(`${skillsDir}/${name}/SKILL.md`))
    .toSorted()
    .map(readSkill);

/** `--base`, else the tag of the last release (`package.json` still holds it). */
const resolveBase = (): { ref: string; commit: string } => {
  const args = process.argv.slice(2);
  const ref = args.includes("--base")
    ? args[args.indexOf("--base") + 1]
    : `alouette@${(JSON.parse(read(packageJsonPath)) as { version: string }).version}`;
  const commit =
    ref && gitOrUndefined(["rev-parse", "--verify", `${ref}^{commit}`]);
  if (!ref || !commit) throw new Error(`Unknown base ref: ${ref ?? "(none)"}`);
  return { ref, commit };
};

/**
 * Files touched between `base` and the working tree: committed, staged and
 * unstaged, so work not yet committed for the release is reported too.
 */
const changedSince = (base: string): Map<string, string> => {
  const changes = new Map<string, string>();
  const add = (status: string, file: string): void => {
    const previous = changes.get(file);
    changes.set(file, previous && previous !== status ? "M" : status);
  };
  for (const line of git(["diff", "--name-status", base, "HEAD"]).split("\n")) {
    const [status = "", ...paths] = line.split("\t");
    const file = paths.at(-1);
    if (file) add(status.slice(0, 1), file);
  }
  for (const line of git(["status", "--porcelain"]).split("\n")) {
    const status = line.slice(0, 2).trim();
    const file = line.slice(3).split(" -> ").at(-1);
    if (file) add(status.startsWith("?") ? "A" : status.slice(0, 1), file);
  }
  return new Map([...changes].toSorted(([a], [b]) => a.localeCompare(b)));
};

/** Exported names of an index barrel, keyed by name → source module. */
const parseExports = (content: string): Map<string, string> => {
  const exportsByName = new Map<string, string>();
  const namedRe = /export\s+(?:type\s+)?\{([^}]*)\}\s*from\s*"([^"]+)"/g;
  for (const [, names = "", module = ""] of content.matchAll(namedRe)) {
    for (const entry of names.split(",")) {
      const name = entry
        .trim()
        .replace(/^type\s+/, "")
        .split(/\s+as\s+/)
        .at(-1);
      if (name) exportsByName.set(name, module);
    }
  }
  const starRe = /export\s+\*\s+from\s*"([^"]+)"/g;
  for (const [, module = ""] of content.matchAll(starRe)) {
    exportsByName.set(`* (${module})`, module);
  }
  return exportsByName;
};

/** `./ui/containers/Box` → the repo path of the file it resolves to. */
const resolveModule = (module: string): string | undefined => {
  const base = path.posix.join(
    path.posix.dirname(indexPath),
    module.replace(/^\.\//, ""),
  );
  return [
    `${base}.tsx`,
    `${base}.ts`,
    `${base}/index.tsx`,
    `${base}/index.ts`,
  ].find(exists);
};

const base = resolveBase();
const skills = readSkills();
const changed = changedSince(base.commit);
const sourcedFiles = new Set(skills.flatMap((skill) => skill.sources));
const shortBase = base.commit.slice(0, 8);

console.log(`base  ${base.ref} (${shortBase})`);

console.log("\nchanged sources");
let changedSkillCount = 0;
for (const skill of skills) {
  const files = skill.sources.filter((file) => changed.has(file));
  if (files.length === 0) continue;
  changedSkillCount++;
  console.log(`  ${skill.name}`);
  for (const file of files)
    console.log(`    ${changed.get(file) ?? ""} ${file}`);
  console.log(`    git diff ${shortBase} -- ${files.join(" ")}`);
}
if (changedSkillCount === 0) console.log("  none");

const uncovered = [...changed.keys()].filter(
  (file) =>
    file.startsWith("packages/alouette/src/") &&
    !/\.(?:test|stories)\.tsx?$/.test(file) &&
    !sourcedFiles.has(file),
);
if (uncovered.length > 0) {
  console.log("\nchanged but sourced by no skill");
  for (const file of uncovered)
    console.log(`  ${changed.get(file) ?? ""} ${file}`);
}

const baseIndex = gitOrUndefined(["show", `${base.commit}:${indexPath}`]);
const headExports = parseExports(read(indexPath));
const baseExports = parseExports(baseIndex ?? "");
const addedExports = [...headExports].filter(
  ([name]) => !baseExports.has(name),
);
if (addedExports.length > 0) {
  console.log(`\nnew exports in ${indexPath}`);
  for (const [name, module] of addedExports) {
    const file = resolveModule(module);
    const coveredBy = skills
      .filter((skill) => file !== undefined && skill.sources.includes(file))
      .map((skill) => skill.name);
    console.log(
      `  ${name}  ${module}  → ${coveredBy.join(", ") || "NO SKILL SOURCES IT"}`,
    );
  }
}
const removedExports = [...baseExports.keys()].filter(
  (name) => !headExports.has(name),
);
if (removedExports.length > 0) {
  console.log("\nremoved exports (delete their coverage)");
  for (const name of removedExports) console.log(`  ${name}`);
}

const tight = skills.filter(
  (skill) =>
    skill.description.length > descriptionLimit * 0.85 ||
    skill.lineCount > lineLimit * 0.85,
);
if (tight.length > 0) {
  console.log(
    `\nbudget (limits: ${descriptionLimit} chars, ${lineLimit} lines)`,
  );
  for (const skill of tight) {
    console.log(
      `  ${skill.name.padEnd(26)} description ${String(skill.description.length).padStart(4)}  lines ${String(skill.lineCount).padStart(3)}`,
    );
  }
}

const invalid = skills.filter((skill) => skill.problems.length > 0);
if (invalid.length > 0) {
  console.log("\ninvalid skills");
  for (const skill of invalid) {
    for (const problem of skill.problems) {
      console.log(`  ${skill.name}: ${problem}`);
    }
  }
  process.exitCode = 1;
}
