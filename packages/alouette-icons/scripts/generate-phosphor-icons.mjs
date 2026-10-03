#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  copyFileSync,
} from "node:fs";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { icons } from "@phosphor-icons/core";

const header =
  "// This file is generated automatically by scripts/generate-phosphor-icons.mjs\n";

const outDir = new URL("../lib/phosphor-icons/", import.meta.url);
const assetsDir = new URL(
  "../../../node_modules/@phosphor-icons/core/assets/",
  import.meta.url,
);

// aliases
const skippedIcons = new Set([
  "file-search",
  "archive-box",
  "archive-tray",
  "folder-notch",
  "folder-notch-minus",
  "folder-notch-open",
  "folder-notch-plus",
]);

const weights = [
  ["Regular", (name) => `regular/${name}`],
  ["Duotone", (name) => `duotone/${name}-duotone`],
  ["Fill", (name) => `fill/${name}-fill`],
];

const svgPattern =
  /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 256 256" fill="currentColor">(.*)<\/svg>$/;
const pathPattern = /<path d="([^"]*)"( opacity="0\.2")?\/>/g;

/**
 * Reads a Phosphor asset as its path data. Every asset is an `<svg>` of
 * `<path>`s only; a duotone one leads with its 20% opacity background layer.
 */
const readPaths = (assetPath) => {
  const svg = readFileSync(new URL(`${assetPath}.svg`, assetsDir), "utf8");
  const content = svgPattern.exec(svg.trim())?.[1];
  if (content === undefined) {
    throw new Error(`Unexpected svg root in ${assetPath}`);
  }
  let backgroundPath;
  const paths = [];
  let rest = content;
  for (const [element, d, opacity] of content.matchAll(pathPattern)) {
    if (opacity) {
      if (backgroundPath !== undefined || paths.length > 0) {
        throw new Error(`Unexpected background layer position in ${assetPath}`);
      }
      backgroundPath = d;
    } else {
      paths.push(d);
    }
    rest = rest.replace(element, "");
  }
  if (rest !== "" || paths.length === 0) {
    throw new Error(`Unexpected svg content in ${assetPath}`);
  }
  return { backgroundPath, paths };
};

const createIconCall = ({ backgroundPath, paths }) => {
  const args = paths.map((d) => JSON.stringify(d)).join(", ");
  return backgroundPath === undefined
    ? `createIcon(${args})`
    : `createDuotoneIcon(${JSON.stringify(backgroundPath)}, ${args})`;
};

if (existsSync(outDir)) {
  console.log("Removing old phosphor-icons directory...");
  rmSync(outDir, { recursive: true, force: true });
}
mkdirSync(outDir);

const writes = [];

for (const icon of icons) {
  if (skippedIcons.has(icon.name)) continue;

  const variants = weights.map(([weight, assetPath]) => ({
    componentName: `${icon.pascal_name}${weight}Icon`,
    iconPaths: readPaths(assetPath(icon.name)),
  }));
  const factories = [
    "createIcon",
    ...(variants.some(({ iconPaths }) => iconPaths.backgroundPath)
      ? ["createDuotoneIcon"]
      : []),
  ].sort();

  writes.push(
    writeFile(
      new URL(`${icon.pascal_name}.mjs`, outDir),
      `${header}\nimport { ${factories.join(", ")} } from "alouette-icons/createIcon";\n\n${variants
        .map(
          ({ componentName, iconPaths }) =>
            `export const ${componentName} = /*#__PURE__*/ ${createIconCall(iconPaths)};\n`,
        )
        .join("")}`,
    ),
    writeFile(
      new URL(`${icon.pascal_name}.d.ts`, outDir),
      `${header}\nimport type { IconComponent } from "alouette-icons/createIcon";\n\n${variants
        .map(
          ({ componentName }) =>
            `export declare const ${componentName}: IconComponent;\n`,
        )
        .join("")}`,
    ),
  );
}

await Promise.all(writes);

copyFileSync(
  new URL(
    "../../../node_modules/@phosphor-icons/core/LICENSE",
    import.meta.url,
  ),
  new URL("LICENSE", outDir),
);

execFileSync("pnpm", ["exec", "oxfmt", fileURLToPath(outDir)], {
  stdio: "inherit",
});

console.log(`Generated ${writes.length / 2} icons.`);
