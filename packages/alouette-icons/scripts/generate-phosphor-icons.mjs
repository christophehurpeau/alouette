import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { transform as babelTransform } from "@babel/core";
import { icons } from "@phosphor-icons/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { transform as svgrTransform } from "@svgr/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import jsx from "@svgr/plugin-jsx";

const header =
  "// This file is generated automatically by scripts/generate-phosphor-icons.mjs\n\n";
let fileContent = `${header}`;
let nodeFileContent = `${fileContent}import Svg, { Path } from "react-native-svg";\n`;
let nodeWebFileContent = `${fileContent}`;
let fileDTSContent = `${header}import * as React from 'react';

const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
`;
let fileCJSForReactNativeContent = `"use strict";\n${header}
module.exports = {
`;

for (const icon of icons) {
  // aliases
  if (
    [
      "file-search",
      "archive-box",
      "archive-tray",
      "folder-notch",
      "folder-notch-minus",
      "folder-notch-open",
      "folder-notch-plus",
    ].includes(icon.name)
  ) {
    continue;
  }

  for (const [componentName, filepathInAssets] of [
    [`${icon.pascal_name}RegularIcon`, `regular/${icon.name}`],
    [`${icon.pascal_name}FillIcon`, `fill/${icon.name}-fill`],
  ]) {
    fileContent += `export { ReactComponent as ${componentName} } from "@phosphor-icons/core/assets/${filepathInAssets}.svg";\n`;
    fileDTSContent += `declare const ${componentName} = SVGComponent;\n`;
    fileCJSForReactNativeContent += `  get ${componentName}() { return require("@phosphor-icons/core/assets/${filepathInAssets}.svg").ReactComponent },\n`;

    const filePath = path.resolve(
      import.meta.dirname,
      "../../../node_modules",
      `@phosphor-icons/core/assets/${filepathInAssets}.svg`,
    );

    for (const platform of ["native", "web"]) {
      const jsCode = await svgrTransform(
        await readFileSync(filePath, "utf8"),
        {
          jsxRuntime: "automatic",
          exportType: "named",
          native: platform === "native",
          namedExport: componentName,
          runtimeConfig: false,
          dimensions: false,
          svgo: false,
          plugins: [jsx],
        },
        {
          componentName,
          filePath,
          caller: {
            name: "rollup-plugin-svgr",
            previousExport: null,
          },
        },
      );
      if (platform === "native") {
        nodeFileContent += jsCode
          .replace('import Svg, { Path } from "react-native-svg";', "")
          .replace(`const ${componentName}`, `export const ${componentName}`)
          .replace(`export { ${componentName} };`, "");
      } else {
        nodeWebFileContent += jsCode
          .replace(`const ${componentName}`, `export const ${componentName}`)
          .replace(`export { ${componentName} };`, "");
      }
    }
  }
}

fileCJSForReactNativeContent += "};\n";

writeFileSync(
  new URL("../lib/phosphor-icons.mjs", import.meta.url),
  fileContent,
);
writeFileSync(
  new URL("../lib/phosphor-icons.cjs", import.meta.url),
  fileCJSForReactNativeContent,
);
writeFileSync(
  new URL("../lib/phosphor-icons.d.ts", import.meta.url),
  fileDTSContent,
);

writeFileSync(
  new URL("../lib/phosphor-icons.node.mjs", import.meta.url),
  await babelTransform(nodeFileContent, {
    babelrc: false,
    configFile: false,
    presets: [["@babel/preset-react", { useSpread: true }]],
    minified: false,
    compact: false,
  }).code,
);
writeFileSync(
  new URL("../lib/phosphor-icons.node.web.mjs", import.meta.url),
  await babelTransform(nodeWebFileContent, {
    babelrc: false,
    configFile: false,
    presets: [["@babel/preset-react", { useSpread: true }]],
    minified: false,
    compact: false,
  }).code,
);
