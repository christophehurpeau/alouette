import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import type { ColorScale } from "./createColorScale.ts";
import type { AccentName } from "./paletteSpecs.ts";
import type { Mode } from "./tokenScaleMap.ts";
export type ThemeScales = Record<`${AccentName}.${Mode}`, ColorScale>;
/**
 * The palette CSS for a set of scales: the `@theme` color defaults (light
 * grayscale, which generate the color utilities) plus the twelve
 * `:where(.<theme>)` selector blocks. Structural CSS (fonts, spacing, keyframes,
 * utilities) lives in `core.css`, not here.
 */
export declare const buildPaletteCss: (scales: ThemeScales) => string;
/**
 * The fully-resolved CSS-variable map for every theme (base mode tokens + accent
 * overrides merged), keyed `--color-*`. Feeds `ScopedTheme` and `useThemeToken`.
 */
export declare const buildThemeVariables: (scales: ThemeScales) => Record<AlouetteTheme, Record<`--color-${string}`, string>>;
//# sourceMappingURL=buildTheme.d.ts.map