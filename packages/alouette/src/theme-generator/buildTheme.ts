/* eslint-disable import-x/extensions */
// Assembles resolved color scales + the semantic tokenScaleMap into the coupled
// outputs of a theme: the base palette CSS (the `@theme` color defaults that
// generate bg-*/text-*/border-* utilities plus the twelve `.<theme>`
// blocks in hex), the optional oklch overlay CSS (the same twelve blocks
// re-emitted as `oklch()` behind `@supports`) and the resolved `themeVariables`
// maps (fully merged per theme so a theme can be applied at any depth in JS).
// Shared by the internal default build (`scripts/build-css.ts`) and the exposed
// `generateTheme`.
//
// The two outputs feed the two halves of `ScopedTheme`: the CSS blocks are what
// web applies (a `className={theme}` element, resolved by custom-property
// inheritance), the maps are what native applies (NativeWind's
// `VariableContextProvider`).
//
// Two serializations of the same ramp: sRGB hex is the only format native can
// consume (`@react-native/normalize-colors` has no oklch parser, and the JS map
// bypasses the CSS compiler entirely), so it stays the baseline everywhere;
// `oklch()` carries the display-p3 chroma headroom, is web-only, and ships as a
// separate file so a project opts into it.

import Color from "colorjs.io";
import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import type { OklchColor, OklchScale } from "./createColorScale.ts";
import { toHex } from "./createColorScale.ts";
import type { AccentName } from "./paletteSpecs.ts";
import type { Mode, ScaleNum } from "./tokenScaleMap.ts";
import { tokenScaleMap } from "./tokenScaleMap.ts";

export type ThemeScales = Record<`${AccentName}.${Mode}`, OklchScale>;

export type ColorFormatName = "oklch" | "srgb";

// Emit order (grayscale first, then accents) — the order tokens/blocks appear in
// the generated CSS and themeVariables. Kept explicit so the output is stable
// regardless of the palette-specs insertion order.
const accentEmitOrder: AccentName[] = [
  "grayscale",
  "brand",
  "info",
  "success",
  "warning",
  "danger",
];

interface ColorFormat {
  serialize: (color: OklchColor) => string;
  /** `alpha` is the hex suffix the token map is written in, e.g. `"40"`. */
  withAlpha: (serialized: string, alpha: string) => string;
  /** Re-express a hex literal from the token map in this format. */
  literal: (hex: string) => string;
}

const round = (value: number, digits: number): number =>
  Number(value.toFixed(digits));

const formatOklch = ({ lightness, chroma, hue }: OklchColor): string =>
  `oklch(${round(lightness, 4)} ${round(chroma, 4)} ${round(hue, 2)})`;

const hexAlphaToFraction = (alpha: string): number =>
  round(Number.parseInt(alpha, 16) / 255, 3);

const withOklchAlpha = (serialized: string, alpha: number): string =>
  alpha === 1 ? serialized : `${serialized.slice(0, -1)} / ${alpha})`;

const colorFormats: Record<ColorFormatName, ColorFormat> = {
  srgb: {
    serialize: toHex,
    withAlpha: (serialized, alpha) => serialized + alpha,
    literal: (hex) => hex,
  },
  oklch: {
    serialize: formatOklch,
    withAlpha: (serialized, alpha) =>
      withOklchAlpha(serialized, hexAlphaToFraction(alpha)),
    literal: (hex) => {
      const { coords, alpha } = new Color(hex).to("oklch");
      const [lightness, chroma, hue] = coords;
      // colorjs leaves missing components null (hue on achromatic colors); 0 is
      // the CSS spelling.
      return withOklchAlpha(
        formatOklch({
          lightness: lightness ?? 0,
          chroma: chroma ?? 0,
          hue: hue || 0,
        }),
        round(alpha, 3),
      );
    },
  },
};

interface ColorAtParams {
  scales: ThemeScales;
  mode: Mode;
  accentName: AccentName;
  step: ScaleNum;
}

const colorAt = ({
  scales,
  mode,
  accentName,
  step,
}: ColorAtParams): OklchColor => scales[`${accentName}.${mode}`][step];

interface BuildThemeVarsParams {
  scales: ThemeScales;
  mode: Mode;
  accentName: AccentName;
  format: ColorFormat;
}

// Resolve every token's scale step to a concrete color for this mode/accent.
// Grayscale-only tokens resolve to null on colored accents and are skipped
// (they inherit through the CSS cascade / the merged themeVariables map).
const buildThemeVars = ({
  scales,
  mode,
  accentName,
  format,
}: BuildThemeVarsParams): Record<string, string> => {
  const isGrayscale = accentName === "grayscale";
  const vars: Record<string, string> = {};

  for (const [token, resolver] of Object.entries(tokenScaleMap)) {
    const resolved = resolver({ mode, isGrayscale, accent: accentName });
    if (!resolved) continue;

    if ("literal" in resolved) {
      vars[token] = format.literal(resolved.literal);
      continue;
    }

    const serialized = format.serialize(
      colorAt({
        scales,
        mode,
        accentName: resolved.source === "grayscale" ? "grayscale" : accentName,
        step: resolved.step,
      }),
    );
    vars[token] = resolved.alpha
      ? format.withAlpha(serialized, resolved.alpha)
      : serialized;
  }

  return vars;
};

const emit = (vars: Record<string, string>, indent: string): string =>
  Object.entries(vars)
    .map(([key, value]) => `${indent}--color-${key}: ${value};`)
    .join("\n");

const prefixVars = (
  vars: Record<string, string>,
): Record<`--color-${string}`, string> =>
  Object.fromEntries(
    Object.entries(vars).map(([key, value]) => [`--color-${key}`, value]),
  );

const accents = accentEmitOrder.filter((name) => name !== "grayscale");

interface ThemeTarget {
  theme: AlouetteTheme;
  mode: Mode;
  accentName: AccentName;
}

// Base modes first, then the accent sub-themes — the order the blocks appear in
// the CSS and the keys in themeVariables.
const themeTargets: ThemeTarget[] = [
  ...(["light", "dark"] as const).map(
    (mode): ThemeTarget => ({
      theme: mode,
      mode,
      accentName: "grayscale",
    }),
  ),
  ...(["light", "dark"] as const).flatMap((mode) =>
    accents.map(
      (accentName): ThemeTarget => ({
        theme: `${mode}_${accentName}` as AlouetteTheme,
        mode,
        accentName,
      }),
    ),
  ),
];

interface EmitThemeBlocksParams {
  scales: ThemeScales;
  format: ColorFormat;
  indent: string;
}

// The twelve `.<theme>` blocks — a web-only mechanism. `ScopedTheme.web.tsx`
// applies a theme as a className and lets CSS resolve it; native pushes the
// resolved `themeVariables` map through NativeWind's `VariableContextProvider`
// and never sets a className, so these blocks are dead weight there. Both
// callers therefore keep them behind a feature query the native compiler cannot
// evaluate — {@link webOnly} here, the `oklch()` query in the overlay.
//
// Each block declares its variables on the themed element *only*: descendants
// pick them up by custom-property inheritance, and an element's own declaration
// always beats an inherited value, so the closest theme class in the tree wins
// for its whole subtree. A descendant selector (`.<theme> *`) would break that —
// every themed ancestor would match a nested element at equal specificity in the
// same layer, making file order, not proximity, decide.
//
// Plain class selectors, not `:where()`: the blocks sit in `@layer theme`, so
// unlayered author rules (Tailwind's utilities, including an arbitrary
// `[--color-x:…]`) and inline styles override them whatever their specificity.
// What the specificity does buy is the `:root`/`:host` case — a theme class set
// on the document element ties with the `@theme` defaults and wins on order.
//
// Accent blocks are partial (only the tokens the accent redefines); the rest
// inherit from the nearest ancestor theme class. `AccentScope` derives the
// accent theme from the current mode, so that ancestor is the matching base
// mode. A forced-mode scope (`<AccentScope mode="light">` under a `dark`
// ancestor) therefore resolves base tokens from the dark ancestor on web, while
// native's merged `themeVariables` map gives the light ones.
const emitThemeBlocks = ({
  scales,
  format,
  indent,
}: EmitThemeBlocksParams): string =>
  themeTargets
    .map(({ theme, mode, accentName }) => {
      const vars = buildThemeVars({ scales, mode, accentName, format });
      return `${indent}.${theme} {\n${emit(vars, `${indent}  `)}\n${indent}}`;
    })
    .join("\n\n");

// Hides web-only rules from the native compiler, which skips any `@supports`
// whose condition it cannot evaluate — so the block never reaches the native
// bundle, while every browser (Vite web and Expo web alike) evaluates it true.
// `display: contents` is the condition because it is exactly what
// `ScopedTheme.web.tsx` renders to apply a theme class without affecting layout.
const webOnly = (rules: string): string => `  @supports (display: contents) {
${rules}
  }`;

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
export const buildPaletteCss = (srgbScales: ThemeScales): string => {
  const srgb = colorFormats.srgb;
  const lightVars = buildThemeVars({
    scales: srgbScales,
    mode: "light",
    accentName: "grayscale",
    format: srgb,
  });

  return `@theme {
  /* color tokens — light theme as defaults, enabling bg-*, text-*, border-*
     color utilities. This block is the whole palette on native, where ScopedTheme
     overrides it at runtime with the themeVariables map fed to NativeWind's
     VariableContextProvider. Web instead resolves the .<theme> blocks below,
     applied as a className (the closest theme class wins, through inheritance). */
${emit(lightVars, "  ")}
}

@layer theme {
${webOnly(emitThemeBlocks({ scales: srgbScales, format: srgb, indent: "    " }))}
}
`;
};

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
export const buildOklchPaletteCss = (p3Scales: ThemeScales): string => {
  const oklch = colorFormats.oklch;
  const lightOklchVars = buildThemeVars({
    scales: p3Scales,
    mode: "light",
    accentName: "grayscale",
    format: oklch,
  });

  return `/* Wide-gamut palette: the same ramp with display-p3 chroma headroom. Web only —
   the native compiler drops this feature query and keeps the base palette hex. */
@supports (color: oklch(0 0 0)) {
  @layer theme {
    /* overrides the @theme defaults, which cannot host a feature query */
    :root, :host {
${emit(lightOklchVars, "      ")}
    }

${emitThemeBlocks({ scales: p3Scales, format: oklch, indent: "    " })}
  }
}
`;
};

/**
 * The fully-resolved CSS-variable map for every theme (base mode tokens + accent
 * overrides merged), keyed `--color-*`. Feeds `ScopedTheme` and `useThemeToken`.
 * Pair `srgb` with sRGB scales (the native-safe map) and `oklch` with p3 scales.
 */
export const buildThemeVariables = (
  scales: ThemeScales,
  formatName: ColorFormatName = "srgb",
): Record<AlouetteTheme, Record<`--color-${string}`, string>> => {
  const format = colorFormats[formatName];
  const baseVars = {
    light: buildThemeVars({
      scales,
      mode: "light",
      accentName: "grayscale",
      format,
    }),
    dark: buildThemeVars({
      scales,
      mode: "dark",
      accentName: "grayscale",
      format,
    }),
  };

  return Object.fromEntries(
    themeTargets.map(({ theme, mode, accentName }) => [
      theme,
      prefixVars(
        accentName === "grayscale"
          ? baseVars[mode]
          : {
              ...baseVars[mode],
              ...buildThemeVars({ scales, mode, accentName, format }),
            },
      ),
    ]),
  ) as Record<AlouetteTheme, Record<`--color-${string}`, string>>;
};
