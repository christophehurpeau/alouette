#!/usr/bin/env node
// Rewrites a project's source for an alouette migration. Parsing uses the
// project's own `typescript` package; nothing else is needed.
//
// Usage: npx alouette-codemod <transform> [--dry-run] [--only=<group>] <paths...>
//
// Transforms:
//   surface-and-stacks  Surface → <Box className="surface …">,
//                       HStack / VStack / Stack → <View className="…">,
//                       EditableSurface / FormEditableSurface →
//                       EditableSection / FormEditableSection
//                       (--only=surface, --only=stacks or --only=editable to
//                       run one part)

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, relative } from "node:path";
import {
  GROUPS,
  transformSurfaceAndStacks,
} from "./codemods/surface-and-stacks.mjs";

const TRANSFORMS = {
  "surface-and-stacks": {
    run: transformSurfaceAndStacks,
    groups: GROUPS,
  },
};

const EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".mts",
  ".cts",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
]);
const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  "dist",
  "build",
  ".git",
  ".expo",
]);

function usage(message) {
  if (message) console.error(`${message}\n`);
  console.error(
    `Usage: alouette-codemod <transform> [--dry-run] [--only=<group>] <paths...>\n\nTransforms: ${Object.keys(TRANSFORMS).join(", ")}`,
  );
  process.exit(1);
}

function loadTypescript() {
  for (const base of [join(process.cwd(), "package.json"), import.meta.url]) {
    try {
      return createRequire(base)("typescript");
    } catch {
      // try the next resolution base
    }
  }
  console.error(
    "alouette-codemod parses with the `typescript` package: add it to the project's devDependencies.",
  );
  process.exit(1);
}

function* sourceFiles(path) {
  const stats = statSync(path);
  if (stats.isFile()) {
    if (EXTENSIONS.has(extname(path)) && !path.endsWith(".d.ts")) yield path;
    return;
  }
  for (const entry of readdirSync(path)) {
    if (IGNORED_DIRECTORIES.has(entry)) continue;
    yield* sourceFiles(join(path, entry));
  }
}

const args = process.argv.slice(2);
const transformName = args.shift();
const transform = TRANSFORMS[transformName];
if (!transform) {
  usage(transformName ? `Unknown transform: ${transformName}` : undefined);
}

const dryRun = args.includes("--dry-run");
const only = args
  .find((arg) => arg.startsWith("--only="))
  ?.slice("--only=".length);
if (only && !transform.groups.includes(only)) {
  usage(`--only must be one of: ${transform.groups.join(", ")}`);
}
const paths = args.filter((arg) => !arg.startsWith("--"));
if (paths.length === 0) usage("No paths given.");

const ts = loadTypescript();
const groups = only ? [only] : transform.groups;
let changedCount = 0;
let warningCount = 0;

for (const path of paths) {
  for (const file of sourceFiles(path)) {
    const text = readFileSync(file, "utf8");
    const { output, changed, warnings } = transform.run(text, file, ts, {
      groups,
    });
    const displayPath = relative(process.cwd(), file);
    for (const { line, message } of warnings) {
      console.warn(`${displayPath}:${line}: ${message}`);
    }
    warningCount += warnings.length;
    if (!changed) continue;
    changedCount += 1;
    if (dryRun) console.log(`would rewrite ${displayPath}`);
    else writeFileSync(file, output);
  }
}

console.log(
  `${dryRun ? "Would rewrite" : "Rewrote"} ${changedCount} file(s), ${warningCount} warning(s). Run your formatter and linter to reorder imports.`,
);
