/* eslint-disable import-x/extensions */
// Public entry: turn per-accent hue params into a theme's two coupled outputs.

import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import type { ThemeScales } from "./buildTheme.ts";
import {
  buildOklchPaletteCss,
  buildPaletteCss,
  buildThemeVariables,
} from "./buildTheme.ts";
import type { Gamut } from "./createColorScale.ts";
import { createOklchScale } from "./createColorScale.ts";
import type { AccentName, PaletteSpec } from "./paletteSpecs.ts";
import { defaultPaletteSpecs } from "./paletteSpecs.ts";

type ThemeVariables = Record<
  AlouetteTheme,
  Record<`--color-${string}`, string>
>;

export interface GenerateThemeResult {
  /**
   * Base palette CSS to import after `alouette/core.css`: the `@theme` color
   * defaults (which generate the color utilities — bg-, text-, border-) and the
   * twelve `.<theme>` selector blocks, in sRGB hex. Complete on its own,
   * on every platform.
   */
  css: string;
  /**
   * Optional wide-gamut overlay, re-declaring the same tokens as `oklch()`
   * behind `@supports` with display-p3 chroma headroom. Import it after
   * {@link GenerateThemeResult.css} to opt web into the more vivid ramp; skip it
   * to stay on sRGB everywhere.
   */
  oklchCss: string;
  /**
   * Resolved CSS-variable map for every theme in sRGB hex, to pass to
   * `<AlouetteProvider themeVariables={...}>` so JS token reads (gradients,
   * native Switch, placeholder/SVG tint) match the CSS. The only format native
   * can parse — write it to `themeVariables.ts`.
   */
  themeVariables: ThemeVariables;
  /**
   * The same map with display-p3 chroma headroom, serialized as `oklch()`.
   * Web-only material: the web build resolves every token from the palette CSS
   * and ignores this map, so it exists for tooling that needs the oklch values,
   * not for `<AlouetteProvider>`.
   */
  oklchThemeVariables: ThemeVariables;
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

  const scalesForGamut = (gamut: Gamut): ThemeScales =>
    Object.fromEntries(
      (Object.keys(specs) as AccentName[]).flatMap((name) => [
        [`${name}.light`, createOklchScale(specs[name], "light", gamut)],
        [`${name}.dark`, createOklchScale(specs[name], "dark", gamut)],
      ]),
    ) as ThemeScales;

  const srgbScales = scalesForGamut("srgb");
  const p3Scales = scalesForGamut("p3");

  return {
    css: buildPaletteCss(srgbScales),
    oklchCss: buildOklchPaletteCss(p3Scales),
    themeVariables: buildThemeVariables(srgbScales, "srgb"),
    oklchThemeVariables: buildThemeVariables(p3Scales, "oklch"),
  };
};
