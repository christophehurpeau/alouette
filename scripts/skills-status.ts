// Read-only reconciliation report for packages/alouette/skills: what changed
// since the last recorded run, what is not covered, and how much room each
// SKILL.md has left. Complements `intent stale`, which only knows about
// released versions and sourced files.
//
//   node scripts/skills-status.ts [--base <ref>] [--json]
//
// Workflow: .claude/skills/update-skills/SKILL.md

import { parse } from "yaml";
import {
  changedSince,
  descriptionLimit,
  exists,
  gitOrUndefined,
  indexPath,
  lineLimit,
  packageVersion,
  parseExports,
  read,
  readSkills,
  resolveBase,
  resolveModule,
  treePath,
  type Skill,
} from "./skills-lib.ts";

const args = process.argv.slice(2);
const baseArg = args.includes("--base")
  ? args[args.indexOf("--base") + 1]
  : undefined;
const asJson = args.includes("--json");

const base = resolveBase(baseArg);
const skills = readSkills();
const changed = changedSince(base.commit);
const changedFiles = new Set(changed.map((c) => c.file));
const statusOf = new Map(changed.map((c) => [c.file, c.status]));

const changedPerSkill = skills
  .map((skill) => ({
    skill,
    files: skill.sourcePaths.filter((file) => changedFiles.has(file)),
  }))
  .filter(({ files }) => files.length > 0);

const sourcedFiles = new Set(skills.flatMap((skill) => skill.sourcePaths));
const uncovered = changed
  .map((c) => c.file)
  .filter(
    (file) =>
      file.startsWith("packages/alouette/src/") &&
      !file.includes("/dist/") &&
      !file.endsWith(".test.ts") &&
      !file.endsWith(".test.tsx") &&
      !sourcedFiles.has(file),
  );

const baseIndex = gitOrUndefined(["show", `${base.commit}:${indexPath}`]);
const headExports = parseExports(read(indexPath));
const baseExports = baseIndex
  ? parseExports(baseIndex)
  : new Map<string, string>();
const skillsSourcing = (file: string | undefined): string[] =>
  file === undefined
    ? []
    : skills
        .filter((skill) => skill.sourcePaths.includes(file))
        .map((skill) => skill.name);
const addedExports = [...headExports]
  .filter(([name]) => !baseExports.has(name))
  .map(([name, module]) => {
    const file = resolveModule(module);
    return { name, module, file, coveredBy: skillsSourcing(file) };
  });
const removedExports = [...baseExports.keys()].filter(
  (name) => !headExports.has(name),
);

const budgets = skills.map((skill) => ({
  name: skill.name,
  descriptionChars: skill.descriptionChars,
  lineCount: skill.lineCount,
  overBudget:
    skill.descriptionChars > descriptionLimit || skill.lineCount > lineLimit,
}));

interface TreeSkillEntry {
  name: string;
  description?: string;
  requires?: string[];
  sources?: string[];
  references?: string[];
}
interface SkillTree {
  library?: { version?: string };
  skills?: TreeSkillEntry[];
}

const tree = parse(read(treePath)) as SkillTree;
const treeEntries = new Map(
  (tree.skills ?? []).map((entry) => [entry.name, entry]),
);
const sameList = (a: string[] = [], b: string[] = []): boolean =>
  a.length === b.length && a.every((value, index) => value === b[index]);
const driftOf = (skill: Skill): string[] => {
  const entry = treeEntries.get(skill.frontmatter.name);
  if (!entry) return ["missing from skill_tree.yaml"];
  const fields: string[] = [];
  if (entry.description?.trim() !== skill.frontmatter.description.trim()) {
    fields.push("description");
  }
  if (!sameList(entry.sources, skill.frontmatter.sources))
    fields.push("sources");
  if (!sameList(entry.references, skill.references)) fields.push("references");
  if (!sameList(entry.requires, skill.frontmatter.requires ?? [])) {
    fields.push("requires");
  }
  return fields;
};
const drift = skills
  .map((skill) => ({ name: skill.name, fields: driftOf(skill) }))
  .filter(({ fields }) => fields.length > 0);

const recordedVersion = skills[0]?.frontmatter.library_version ?? "none";
const versions = {
  package: packageVersion(),
  skills: recordedVersion,
  skillTree: tree.library?.version,
  mismatched:
    new Set([packageVersion(), recordedVersion, tree.library?.version]).size >
    1,
};

if (asJson) {
  console.log(
    JSON.stringify(
      {
        base,
        versions,
        changedPerSkill: changedPerSkill.map(({ skill, files }) => ({
          skill: skill.name,
          files,
        })),
        uncovered,
        addedExports,
        removedExports,
        budgets,
        drift,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

console.log(`base       ${base.commit.slice(0, 8)}  from ${base.origin}`);
console.log(
  `versions   package ${versions.package} · skills ${versions.skills} · skill_tree ${versions.skillTree}` +
    (versions.mismatched ? "   ← bump needed" : ""),
);

console.log(`\nchanged sources (${changedPerSkill.length} skills)`);
if (changedPerSkill.length === 0) console.log("  none");
for (const { skill, files } of changedPerSkill) {
  console.log(`  ${skill.name}`);
  for (const file of files) console.log(`    ${statusOf.get(file)} ${file}`);
  console.log(`    git diff ${base.commit.slice(0, 8)} -- ${files.join(" ")}`);
}

if (uncovered.length > 0) {
  console.log(`\nchanged but sourced by no skill (${uncovered.length})`);
  for (const file of uncovered) console.log(`  ${statusOf.get(file)} ${file}`);
}

if (addedExports.length > 0) {
  console.log(`\nnew exports in ${indexPath}`);
  for (const entry of addedExports) {
    const covered =
      entry.coveredBy.length > 0
        ? entry.coveredBy.join(", ")
        : "NO SKILL SOURCES IT";
    console.log(`  ${entry.name}  ${entry.module}  → ${covered}`);
  }
}
if (removedExports.length > 0) {
  console.log(`\nremoved exports (delete their coverage)`);
  for (const name of removedExports) console.log(`  ${name}`);
}

const tight = budgets.filter(
  (b) =>
    b.overBudget ||
    b.descriptionChars > descriptionLimit * 0.85 ||
    b.lineCount > lineLimit * 0.85,
);
if (tight.length > 0) {
  console.log(
    `\nbudget (limits: ${descriptionLimit} chars, ${lineLimit} lines)`,
  );
  for (const b of tight) {
    console.log(
      `  ${b.name.padEnd(26)} description ${String(b.descriptionChars).padStart(4)}  lines ${String(b.lineCount).padStart(3)}${b.overBudget ? "   ← OVER, split into references/" : ""}`,
    );
  }
}

if (drift.length > 0) {
  console.log(`\nskill_tree.yaml drift — run: node scripts/skills-sync.ts`);
  for (const { name, fields } of drift) {
    console.log(`  ${name}: ${fields.join(", ")}`);
  }
}

const treeOnly = [...treeEntries.keys()].filter(
  (name) => !skills.some((skill) => skill.frontmatter.name === name),
);
if (treeOnly.length > 0) {
  console.log(
    `\nin skill_tree.yaml but not on disk (add to REMOVED_SKILLS in packages/alouette/bin/install-skills.mjs if deleted)`,
  );
  for (const name of treeOnly) console.log(`  ${name}`);
}

const missingSources = skills.flatMap((skill) =>
  skill.sourcePaths
    .filter((file) => !exists(file))
    .map((file) => `${skill.name}: ${file}`),
);
if (missingSources.length > 0) {
  console.log(`\nsources that no longer exist`);
  for (const entry of missingSources) console.log(`  ${entry}`);
}
