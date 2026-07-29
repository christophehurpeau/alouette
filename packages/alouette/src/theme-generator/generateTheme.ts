/* eslint-disable import-x/extensions */
// Public entry: turn per-accent hue params into a theme's two coupled outputs.

import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import type { ThemeScales } from "./buildTheme.ts";
import { buildPaletteCss, buildThemeVariables } from "./buildTheme.ts";
import { createColorScale } from "./createColorScale.ts";
import type { AccentName, PaletteSpec } from "./paletteSpecs.ts";
import { defaultPaletteSpecs } from "./paletteSpecs.ts";

export interface GenerateThemeResult {
  /**
   * Palette CSS to import after `alouette/core.css`: the `@theme` color defaults
   * (which generate the color utilities — bg-, text-, border-) plus the twelve
   * `:where(.<theme>)` selector blocks.
   */
  css: string;
  /**
   * Resolved CSS-variable map for every theme, to pass to
   * `<AlouetteProvider themeVariables={...}>` so JS token reads (gradients,
   * native Switch, placeholder/SVG tint) match the CSS.
   */
  themeVariables: Record<AlouetteTheme, Record<`--color-${string}`, string>>;
}

/**
 * Generate a coherent theme for the alouette accents from hue params. Overrides
 * are merged over {@link defaultPaletteSpecs}, so an app can re-color only the
 * accents it cares about (e.g. `brand`) and inherit the rest.
 */
export const generateTheme = (
  overrides?: Partial<Record<AccentName, PaletteSpec>>,
): GenerateThemeResult => {
  const specs: Record<AccentName, PaletteSpec> = {
    ...defaultPaletteSpecs,
    ...overrides,
  };

  const scales = Object.fromEntries(
    (Object.keys(specs) as AccentName[]).flatMap((name) => [
      [`${name}.light`, createColorScale(specs[name], "light")],
      [`${name}.dark`, createColorScale(specs[name], "dark")],
    ]),
  ) as ThemeScales;

  return {
    css: buildPaletteCss(scales),
    themeVariables: buildThemeVariables(scales),
  };
};
