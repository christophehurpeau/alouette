// Shared helpers for the skills reconciliation scripts
// (scripts/skills-status.ts, scripts/skills-sync.ts).
// Workflow: .claude/skills/update-skills/SKILL.md

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

export const repoRoot = path.resolve(import.meta.dirname, "..");

export const skillsDir = "packages/alouette/skills";
export const statePath = "_artifacts/skills_state.json";
export const treePath = "_artifacts/skill_tree.yaml";
export const domainMapPath = "_artifacts/domain_map.yaml";
export const packageJsonPath = "packages/alouette/package.json";
export const indexPath = "packages/alouette/src/index.ts";

// intent validate limits
export const descriptionLimit = 1024;
export const lineLimit = 500;

export interface SkillFrontmatter {
  name: string;
  description: string;
  type: string;
  library: string;
  library_version: string;
  requires?: string[];
  sources: string[];
}

export interface Skill {
  name: string;
  dir: string;
  file: string;
  frontmatter: SkillFrontmatter;
  descriptionChars: number;
  lineCount: number;
  /** `sources` with the `owner/repo:` prefix stripped — repo-relative paths. */
  sourcePaths: string[];
  /** `references/*.md` present on disk, skill-relative. */
  references: string[];
}

export interface SkillsState {
  commit: string;
  libraryVersion: string;
  reconciledAt: string;
}

export const read = (file: string): string =>
  fs.readFileSync(path.join(repoRoot, file), "utf8");

export const write = (file: string, content: string): void => {
  fs.writeFileSync(path.join(repoRoot, file), content);
};

export const exists = (file: string): boolean =>
  fs.existsSync(path.join(repoRoot, file));

export const git = (args: string[]): string =>
  execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  }).trim();

export const gitOrUndefined = (args: string[]): string | undefined => {
  try {
    return git(args);
  } catch {
    return undefined;
  }
};

export const stripSourcePrefix = (source: string): string => {
  const colon = source.indexOf(":");
  return colon === -1 ? source : source.slice(colon + 1);
};

export const packageVersion = (): string =>
  JSON.parse(read(packageJsonPath)).version;

export const readState = (): SkillsState | undefined =>
  exists(statePath) ? JSON.parse(read(statePath)) : undefined;

export const readSkills = (): Skill[] => {
  const dir = path.join(repoRoot, skillsDir);
  return fs
    .readdirSync(dir)
    .filter((name) => fs.existsSync(path.join(dir, name, "SKILL.md")))
    .sort()
    .map((name) => {
      const file = `${skillsDir}/${name}/SKILL.md`;
      const content = read(file);
      const end = content.indexOf("\n---", 4);
      const frontmatter: SkillFrontmatter = parse(content.slice(4, end));
      const referencesDir = path.join(dir, name, "references");
      return {
        name,
        dir: `${skillsDir}/${name}`,
        file,
        frontmatter,
        descriptionChars: frontmatter.description.trim().length,
        lineCount:
          content.split("\n").length - (content.endsWith("\n") ? 1 : 0),
        sourcePaths: (frontmatter.sources ?? []).map(stripSourcePrefix),
        references: fs.existsSync(referencesDir)
          ? fs
              .readdirSync(referencesDir)
              .filter((f) => f.endsWith(".md"))
              .sort()
              .map((f) => `references/${f}`)
          : [],
      };
    });
};

/** The commit reconciliation should diff from, and where it came from. */
export const resolveBase = (
  argBase: string | undefined,
): { ref: string; commit: string; origin: string } => {
  const state = readState();
  const candidates: { ref: string; origin: string }[] = [];
  if (argBase) candidates.push({ ref: argBase, origin: "--base" });
  if (state) {
    candidates.push({
      ref: state.commit,
      origin: `${statePath} (${state.reconciledAt}, alouette@${state.libraryVersion})`,
    });
  }
  const skills = readSkills();
  const recordedVersion = skills[0]?.frontmatter.library_version;
  if (recordedVersion) {
    candidates.push({
      ref: `alouette@${recordedVersion}`,
      origin: "library_version tag (no state file)",
    });
  }
  for (const candidate of candidates) {
    const commit = gitOrUndefined([
      "rev-parse",
      "--verify",
      `${candidate.ref}^{commit}`,
    ]);
    if (commit) return { ...candidate, commit };
  }
  throw new Error(
    `No usable base ref (tried ${candidates.map((c) => c.ref).join(", ")})`,
  );
};

export interface ChangedFile {
  file: string;
  status: string;
}

/**
 * Files touched between `base` and the working tree — committed changes plus
 * staged and unstaged ones, so components that only exist in the index (the
 * usual pre-release state) are still reported.
 */
export const changedSince = (base: string): ChangedFile[] => {
  const changes = new Map<string, string>();
  const add = (status: string, file: string): void => {
    const previous = changes.get(file);
    changes.set(file, previous && previous !== status ? "M" : status);
  };
  for (const line of git(["diff", "--name-status", base, "HEAD"]).split("\n")) {
    if (!line) continue;
    const [status = "", ...paths] = line.split("\t");
    const file = paths.at(-1);
    if (file) add(status.slice(0, 1), file);
  }
  for (const line of git(["status", "--porcelain"]).split("\n")) {
    if (!line) continue;
    const status = line.slice(0, 2).trim();
    const file = line.slice(3).split(" -> ").at(-1);
    if (file) add(status.startsWith("?") ? "A" : status.slice(0, 1), file);
  }
  return [...changes]
    .map(([file, status]) => ({ file, status }))
    .sort((a, b) => a.file.localeCompare(b.file));
};

export interface ExportedName {
  name: string;
  module: string;
}

/** Exported names of an index barrel, keyed by name → source module. */
export const parseExports = (content: string): Map<string, string> => {
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

/** `./ui/containers/EditableSurface` → the repo path of the file it resolves to. */
export const resolveModule = (module: string): string | undefined => {
  const base = path.posix.join(
    path.posix.dirname(indexPath),
    module.replace(/^\.\//, ""),
  );
  for (const candidate of [
    `${base}.tsx`,
    `${base}.ts`,
    `${base}/index.tsx`,
    `${base}/index.ts`,
  ]) {
    if (exists(candidate)) return candidate;
  }
  return undefined;
};
