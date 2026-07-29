/* eslint-disable import-x/extensions */
// Public entry for `alouette/theme-generator`: generate a coherent theme (CSS +
// runtime themeVariables) for the alouette accents from hue params, staying on
// the OKLCH ramp. Import in a build script to produce an app's own palette.

export type {
  AccentName,
  PaletteSpec,
} from "./theme-generator/paletteSpecs.ts";
export { defaultPaletteSpecs } from "./theme-generator/paletteSpecs.ts";
export type { ColorScale } from "./theme-generator/createColorScale.ts";
export { createColorScale } from "./theme-generator/createColorScale.ts";
export type { ThemeScales } from "./theme-generator/buildTheme.ts";
export {
  buildPaletteCss,
  buildThemeVariables,
} from "./theme-generator/buildTheme.ts";
export type { GenerateThemeResult } from "./theme-generator/generateTheme.ts";
export { generateTheme } from "./theme-generator/generateTheme.ts";
