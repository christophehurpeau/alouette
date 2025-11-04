#!/usr/bin/env node
import {
  readFileSync,
  writeFileSync,
  rmdirSync,
  existsSync,
  mkdirSync,
  copyFileSync,
} from "node:fs";
import path from "node:path";
import { transformSync as babelTransformSync } from "@babel/core";
import { icons } from "@phosphor-icons/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { transform as svgrTransform } from "@svgr/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import jsx from "@svgr/plugin-jsx";
// eslint-disable-next-line import/no-extraneous-dependencies
import prettier from "prettier";

const header =
  "// This file is generated automatically by scripts/generate-phosphor-icons.mjs\n";
let headerWithTsNoCheck = `${header}// @ts-nocheck\n\n`;
const importReactNativeSvgHeader = `${headerWithTsNoCheck}import Svg, { Path } from "react-native-svg";\n`;
const dtsContentHeader = `${header}\nimport * as React from 'react';

const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
`;

// let fileContent = `${headerWithTsNoCheck}`;
// let nodeFileContent = `${importReactNativeSvgHeader}`;
// let nodeWebFileContent = `${headerWithTsNoCheck}`;
// let fileDTSContent = dtsContentHeader;
// let fileCJSForReactNativeContent = `"use strict";\n${fileContent}module.exports = {\n`;

const formatWithPrettierAndSave = async (filename, content) => {
  writeFileSync(
    new URL(`../lib/${filename}`, import.meta.url),
    await prettier.format(content, {
      filepath: filename,
    }),
  );
};

if (existsSync(new URL("../lib/phosphor-icons", import.meta.url))) {
  console.log("Removing old phosphor-icons directory...");
  rmdirSync(new URL("../lib/phosphor-icons", import.meta.url), {
    recursive: true,
    force: true,
  });
}

console.log("Creating new phosphor-icons directory...");
mkdirSync(new URL("../lib/phosphor-icons", import.meta.url));

const babelTransformContent = (code) => {
  return babelTransformSync(code, {
    babelrc: false,
    configFile: false,
    presets: [
      ["@babel/preset-react", { useSpread: true, runtime: "automatic" }],
    ],
    minified: false,
    compact: false,
  }).code;
};

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

  console.log(`Generating icon: ${icon.name}...`);

  for (const [componentName, filepathInAssets] of [
    [`${icon.pascal_name}RegularIcon`, `regular/${icon.name}`],
    [`${icon.pascal_name}DuotoneIcon`, `duotone/${icon.name}-duotone`],
  ]) {
    // const mjsContent = `export { ReactComponent as ${componentName} } from "@phosphor-icons/core/assets/${filepathInAssets}.svg";\n`;
    // const dtsContent = `declare const ${componentName}: SVGComponent;\n`;
    // const cjsReactNativeContent = `  get ${componentName}() { return require("@phosphor-icons/core/assets/${filepathInAssets}.svg").ReactComponent },\n`;

    // fileContent += mjsContent;
    // fileDTSContent += dtsContent;
    // fileCJSForReactNativeContent += cjsReactNativeContent;

    await Promise.all([
      // formatWithPrettierAndSave(
      //   `phosphor-icons/${componentName}.mjs`,
      //   `${headerWithTsNoCheck}${mjsContent}`,
      // ),
      formatWithPrettierAndSave(
        `phosphor-icons/${componentName}.d.ts`,
        // `${dtsContentHeader}${dtsContent}`,
        `${header}\nimport * as React from 'react';\n\ndeclare const ${componentName}: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;\n`,
      ),
    ]);

    const filePath = path.resolve(
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
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
        const nodeContent = jsCode
          .replace('import Svg, { Path } from "react-native-svg";', "")
          .replace(`const ${componentName}`, `export const ${componentName}`)
          .replace(`export { ${componentName} };`, "");
        // nodeFileContent += nodeContent;

        await formatWithPrettierAndSave(
          `phosphor-icons/${componentName}.react-native.mjs`,
          babelTransformContent(`${importReactNativeSvgHeader}${nodeContent}`),
        );
      } else {
        const nodeWebContent = jsCode
          .replace(`const ${componentName}`, `export const ${componentName}`)
          .replace(`export { ${componentName} };`, "");
        // nodeWebFileContent += nodeWebContent;

        await formatWithPrettierAndSave(
          `phosphor-icons/${componentName}.web.mjs`,
          babelTransformContent(`${headerWithTsNoCheck}${nodeWebContent}`),
        );
      }
    }
  }
}

// fileCJSForReactNativeContent += "};\n";

// await formatWithPrettierAndSave("phosphor-icons.mjs", fileContent);
// await formatWithPrettierAndSave(
//   "phosphor-icons.cjs",
//   fileCJSForReactNativeContent,
// );
// await formatWithPrettierAndSave("phosphor-icons.d.ts", fileDTSContent);

// await formatWithPrettierAndSave(
//   "phosphor-icons.node.react-native.mjs",
//   babelTransformContent(nodeFileContent),
// );
// await formatWithPrettierAndSave(
//   "phosphor-icons.node.web.mjs",
//   babelTransformContent(nodeWebFileContent),
// );

await copyFileSync(
  new URL(
    "../../../node_modules/@phosphor-icons/core/LICENSE",
    import.meta.url,
  ),
  new URL("../lib/phosphor-icons/LICENSE", import.meta.url),
);
