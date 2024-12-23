import { writeFileSync } from "node:fs";
import { icons } from "@phosphor-icons/core";

const header =
  "// This file is generated automatically by scripts/generate-phosphor-icons.mjs\n\n";
let fileContent = `/* prettier-ignore */\n${header}`;
let fileDTSContent = `${header}import * as React from 'react';

const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
`;
let fileCJSForReactNativeContent = `/* prettier-ignore */\n"use strict";\n${header}
module.exports = {
`;

icons.forEach((icon) => {
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
    return;
  }

  fileContent += `export { ReactComponent as ${icon.pascal_name}RegularIcon } from '@phosphor-icons/core/assets/regular/${icon.name}.svg';\n`;
  fileContent += `export { ReactComponent as ${icon.pascal_name}FillIcon } from '@phosphor-icons/core/assets/fill/${icon.name}-fill.svg';\n`;
  fileDTSContent += `declare const ${icon.pascal_name}RegularIcon = SVGComponent;\n`;
  fileDTSContent += `declare const ${icon.pascal_name}FillIcon = SVGComponent;\n`;
  fileCJSForReactNativeContent += `  get ${icon.pascal_name}RegularIcon() { return require('@phosphor-icons/core/assets/regular/${icon.name}.svg').ReactComponent },\n`;
  fileCJSForReactNativeContent += `  get ${icon.pascal_name}FillIcon() { return require('@phosphor-icons/core/assets/fill/${icon.name}-fill.svg').ReactComponent },\n`;
});

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
