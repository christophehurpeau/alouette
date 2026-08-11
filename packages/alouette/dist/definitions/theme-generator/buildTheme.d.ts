import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import type { OklchScale } from "./createColorScale.ts";
import type { AccentName } from "./paletteSpecs.ts";
import type { Mode } from "./tokenScaleMap.ts";
export type ThemeScales = Record<`${AccentName}.${Mode}`, OklchScale>;
export type ColorFormatName = "oklch" | "srgb";
/**
 * The base palette CSS for a set of sRGB scales: the `@theme` color defaults
 * (light grayscale, which generate the color utilities) and the twelve
 * `.<theme>` selector blocks, all in hex.
 *
 * Hex is the only format native can compile, so this file alone is a complete
 * palette on every platform. Layer {@link buildOklchPaletteCss} after it to opt
 * web into the wide-gamut ramp. Structural CSS (fonts, spacing, keyframes,
 * utilities) lives in `core.css`, not here.
 *
 * Only the `@theme` half compiles on native; the theme blocks are {@link webOnly}.
 * Native must therefore keep the color tokens out of react-native-css's variable
 * inliner — `withAlouetteConfig` (metro.cjs) passes `inlineVariables.exclude`,
 * without which every token collapses to its light value.
 */
export declare const buildPaletteCss: (srgbScales: ThemeScales) => string;
/**
 * The wide-gamut overlay for a set of display-p3 scales: the same tokens as
 * {@link buildPaletteCss}, re-declared as `oklch()` inside `@supports`. Import
 * it *after* the base palette CSS, and only on projects that want the extra
 * chroma — it is purely additive.
 *
 * The `@supports` rule is what keeps native safe if the overlay is imported in a
 * shared CSS entry: the react-native-css compiler drops feature queries it
 * cannot evaluate, so native keeps the hex from the base palette.
 */
export declare const buildOklchPaletteCss: (p3Scales: ThemeScales) => string;
/**
 * The fully-resolved CSS-variable map for every theme (base mode tokens + accent
 * overrides merged), keyed `--color-*`. Feeds `ScopedTheme` and `useThemeToken`.
 * Pair `srgb` with sRGB scales (the native-safe map) and `oklch` with p3 scales.
 */
export declare const buildThemeVariables: (scales: ThemeScales, formatName?: ColorFormatName) => Record<AlouetteTheme, Record<`--color-${string}`, string>>;
//# sourceMappingURL=buildTheme.d.ts.map