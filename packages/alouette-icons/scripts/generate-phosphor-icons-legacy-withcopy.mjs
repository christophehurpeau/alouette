import { copyFileSync, mkdirSync, rmdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { icons } from "@phosphor-icons/core";

const phosphorAssetsPath = dirname(
  dirname(
    fileURLToPath(
      await import.meta.resolve("@phosphor-icons/core/assets/regular/dot.svg"),
    ),
  ),
);

const assetsPath = fileURLToPath(
  new URL("../phosphor-icons-assets", import.meta.url),
);

try {
  rmdirSync(assetsPath, { recursive: true });
} catch {
  console.warn("Could not remove assets directory");
}
mkdirSync(`${assetsPath}/regular`, { recursive: true });
mkdirSync(`${assetsPath}/fill`);

const header =
  "// This file is generated automatically by scripts/generate-phosphor-icons.mjs\n\n";
let fileContent = `/* eslint-disable max-lines */\n${header}`;
let fileDTSContent = `${header}import * as React from 'react';

const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
`;

icons.forEach((icon) => {
  if (icon.name === "file-search") {
    // alias for "file-magnifying-glass"
    return;
  }
  copyFileSync(
    new URL(`${phosphorAssetsPath}/regular/${icon.name}.svg`, import.meta.url),
    `${assetsPath}/regular/${icon.name}.svg`,
  );
  copyFileSync(
    new URL(
      `${phosphorAssetsPath}/fill/${icon.name}-fill.svg`,
      import.meta.url,
    ),
    `${assetsPath}/fill/${icon.name}-fill.svg`,
  );

  fileContent += `export { ReactComponent as ${icon.pascal_name}RegularIcon } from '../phosphor-icons-assets/regular/${icon.name}.svg';\n`;
  fileContent += `export { ReactComponent as ${icon.pascal_name}FillIcon } from '../phosphor-icons-assets/fill/${icon.name}-fill.svg';\n`;
  fileDTSContent += `declare const ${icon.pascal_name}RegularIcon = SVGComponent;\n`;
  fileDTSContent += `declare const ${icon.pascal_name}FillIcon = SVGComponent;\n`;
});

writeFileSync(
  new URL("../src/phosphor-icons.ts", import.meta.url),
  fileContent,
);
writeFileSync(
  new URL("../src/phosphor-icons.d.ts", import.meta.url),
  fileDTSContent,
);
