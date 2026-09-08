// Push SKILL.md frontmatter into _artifacts/skill_tree.yaml (description,
// sources, references, requires, type), optionally bump the library version
// everywhere, and record the commit the skills were reconciled at.
//
//   node scripts/skills-sync.ts              # sync skill_tree.yaml
//   node scripts/skills-sync.ts --check      # report only, exit 1 on drift (CI)
//   node scripts/skills-sync.ts --version    # + set every version to package.json's
//   node scripts/skills-sync.ts --record     # + stamp _artifacts/skills_state.json
//
// Workflow: .claude/skills/update-skills/SKILL.md

import { isMap, isSeq, parseDocument, Scalar, type YAMLMap } from "yaml";
import {
  domainMapPath,
  git,
  packageVersion,
  read,
  readSkills,
  statePath,
  treePath,
  write,
} from "./skills-lib.ts";

const args = new Set(process.argv.slice(2));
const checkOnly = args.has("--check");
const withVersion = args.has("--version");
const withRecord = args.has("--record");

const skills = readSkills();
const version = packageVersion();
const changes: string[] = [];

// Keep the emitted YAML in the file's own style: one line per entry, strings
// double-quoted, keys plain.
const yamlOptions = {
  lineWidth: 0,
  defaultStringType: "QUOTE_DOUBLE",
  defaultKeyType: "PLAIN",
} as const;

const quoted = (value: string): Scalar => {
  const scalar = new Scalar(value);
  scalar.type = Scalar.QUOTE_DOUBLE;
  return scalar;
};

const tree = parseDocument(read(treePath));
const treeSkills = tree.get("skills");
const treeEntries = isSeq(treeSkills)
  ? (treeSkills.items as YAMLMap<string, unknown>[])
  : [];

for (const skill of skills) {
  const entry = treeEntries.find(
    (item) => item.get("name") === skill.frontmatter.name,
  );
  if (!entry) {
    changes.push(
      `${skill.name}: missing from skill_tree.yaml (add the entry by hand — it needs a domain and slug)`,
    );
    continue;
  }
  const setScalar = (key: string, value: string): void => {
    if (entry.get(key) === value) return;
    entry.set(key, quoted(value));
    changes.push(`${skill.name}: ${key}`);
  };
  const setList = (key: string, values: string[]): void => {
    const node = entry.get(key);
    const current = isSeq(node) ? (node.toJSON() as string[]) : [];
    if (
      current.length === values.length &&
      current.every((item, index) => item === values[index])
    ) {
      return;
    }
    if (values.length === 0) {
      if (entry.has(key)) {
        entry.delete(key);
        changes.push(`${skill.name}: ${key} (removed)`);
      }
      return;
    }
    entry.set(key, values.map(quoted));
    changes.push(`${skill.name}: ${key}`);
  };

  setScalar("description", skill.frontmatter.description.trim());
  setScalar("type", skill.frontmatter.type);
  setScalar("path", skill.file);
  setList("requires", skill.frontmatter.requires ?? []);
  setList("sources", skill.frontmatter.sources);
  setList("references", skill.references);
}

if (withVersion) {
  for (const skill of skills) {
    if (skill.frontmatter.library_version === version) continue;
    write(
      skill.file,
      read(skill.file).replace(
        /^library_version: .*$/m,
        `library_version: "${version}"`,
      ),
    );
    changes.push(`${skill.name}: library_version → ${version}`);
  }
  const treeLibrary = tree.get("library");
  if (isMap(treeLibrary) && treeLibrary.get("version") !== version) {
    treeLibrary.set("version", quoted(version));
    changes.push(`skill_tree.yaml: library.version → ${version}`);
  }
  const domainMap = parseDocument(read(domainMapPath));
  const domainLibrary = domainMap.get("library");
  if (isMap(domainLibrary) && domainLibrary.get("version") !== version) {
    domainLibrary.set("version", quoted(version));
    if (!checkOnly) write(domainMapPath, domainMap.toString(yamlOptions));
    changes.push(`domain_map.yaml: library.version → ${version}`);
  }
}

// Written even when nothing changed: the round-trip preserves comments and
// layout, so re-emitting also normalizes any hand-edited formatting.
if (!checkOnly) {
  write(treePath, tree.toString(yamlOptions));
}

if (withRecord && !checkOnly) {
  const commit = git(["rev-parse", "HEAD"]);
  write(
    statePath,
    `${JSON.stringify(
      {
        comment:
          "Commit the alouette skills were last reconciled against. Written by scripts/skills-sync.ts --record, read by scripts/skills-status.ts.",
        commit,
        libraryVersion: version,
        reconciledAt: new Date().toISOString().slice(0, 10),
      },
      null,
      2,
    )}\n`,
  );
  console.log(`recorded ${commit.slice(0, 8)} (alouette@${version})`);
}

if (changes.length === 0) {
  console.log("artifacts in sync with SKILL.md frontmatter");
} else {
  console.log(
    `${checkOnly ? "drift" : "synced"} (${changes.length}):\n  ${changes.join("\n  ")}`,
  );
}
process.exit(checkOnly && changes.length > 0 ? 1 : 0);
