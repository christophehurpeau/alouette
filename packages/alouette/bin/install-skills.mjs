#!/usr/bin/env node
// Symlinks alouette's packages/alouette/skills/* into the consuming
// project's .claude/skills/ so AI coding agents pick them up.
//
// Usage: npx alouette-install-skills

import { existsSync, lstatSync, mkdirSync, readdirSync, readlinkSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// Names of skills retired from packages/alouette/skills. Listed here so
// `alouette-install-skills` removes their leftover symlinks from projects
// that installed an earlier version. Add a name the same release its
// skills/<name> directory is deleted.
const REMOVED_SKILLS = [];

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceSkillsDir = join(packageRoot, "skills");
const targetSkillsDir = join(process.cwd(), ".claude", "skills");

if (!existsSync(sourceSkillsDir)) {
  console.error(`No skills directory found at ${sourceSkillsDir}`);
  process.exit(1);
}

mkdirSync(targetSkillsDir, { recursive: true });

for (const name of readdirSync(sourceSkillsDir)) {
  const source = join(sourceSkillsDir, name);
  if (!lstatSync(source).isDirectory()) continue;

  const target = join(targetSkillsDir, name);
  const link = relative(targetSkillsDir, source);
  const stat = lstatSync(target, { throwIfNoEntry: false });

  if (stat) {
    if (stat.isSymbolicLink() && readlinkSync(target) === link) {
      console.log(`up to date: ${name}`);
      continue;
    }
    if (!stat.isSymbolicLink()) {
      console.warn(`skipping ${name}: ${target} already exists and is not a symlink`);
      continue;
    }
    rmSync(target);
  }

  symlinkSync(link, target, "dir");
  console.log(`linked: ${name}`);
}

for (const name of REMOVED_SKILLS) {
  const target = join(targetSkillsDir, name);
  const stat = lstatSync(target, { throwIfNoEntry: false });
  if (!stat) continue;
  if (!stat.isSymbolicLink()) {
    console.warn(`skipping removal of ${name}: ${target} is not a symlink`);
    continue;
  }
  rmSync(target);
  console.log(`removed (retired): ${name}`);
}
