/* eslint-disable import-x/extensions */
// Assembles resolved color scales + the semantic tokenScaleMap into the two
// coupled outputs of a theme: the palette CSS (the `@theme` color defaults that
// generate bg-*/text-*/border-* utilities, plus the twelve `:where(.<theme>)`
// blocks) and the resolved `themeVariables` map (fully merged per theme so a
// theme can be applied at any depth in JS). Shared by the internal default
// build (`scripts/build-css.ts`) and the exposed `generateTheme`.

import type { AlouetteTheme } from "../core/AlouetteConfig.ts";
import type { ColorScale } from "./createColorScale.ts";
import type { AccentName } from "./paletteSpecs.ts";
import type { Mode, ScaleNum } from "./tokenScaleMap.ts";
import { tokenScaleMap } from "./tokenScaleMap.ts";

export type ThemeScales = Record<`${AccentName}.${Mode}`, ColorScale>;

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

const colorAt = (
  scales: ThemeScales,
  mode: Mode,
  accentName: AccentName,
  step: ScaleNum,
): string => scales[`${accentName}.${mode}`][step];

// Resolve every token's scale step to a concrete color for this mode/accent.
// Grayscale-only tokens resolve to null on colored accents and are skipped
// (they inherit through the CSS cascade / the merged themeVariables map).
const buildThemeVars = (
  scales: ThemeScales,
  mode: Mode,
  accentName: AccentName,
): Record<string, string> => {
  const isGrayscale = accentName === "grayscale";
  const vars: Record<string, string> = {};

  for (const [token, resolver] of Object.entries(tokenScaleMap)) {
    const resolved = resolver({ mode, isGrayscale, accent: accentName });
    if (!resolved) continue;

    vars[token] =
      "literal" in resolved
        ? resolved.literal
        : colorAt(
            scales,
            mode,
            resolved.source === "grayscale" ? "grayscale" : accentName,
            resolved.step,
          ) + (resolved.alpha ?? "");
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

/**
 * The palette CSS for a set of scales: the `@theme` color defaults (light
 * grayscale, which generate the color utilities) plus the twelve
 * `:where(.<theme>)` selector blocks. Structural CSS (fonts, spacing, keyframes,
 * utilities) lives in `core.css`, not here.
 */
export const buildPaletteCss = (scales: ThemeScales): string => {
  const lightVars = buildThemeVars(scales, "light", "grayscale");
  const darkVars = buildThemeVars(scales, "dark", "grayscale");

  const baseBlocks = (
    [
      ["light", lightVars],
      ["dark", darkVars],
    ] as const
  )
    .map(
      ([name, vars]) =>
        `  :where(.${name}, .${name} *) {\n${emit(vars, "    ")}\n  }`,
    )
    .join("\n\n");

  const accentBlocks = (["light", "dark"] as const)
    .flatMap((mode) =>
      accents.map((accentName) => {
        const vars = buildThemeVars(scales, mode, accentName);
        return `  :where(.${mode}_${accentName}, .${mode}_${accentName} *) {\n${emit(vars, "    ")}\n  }`;
      }),
    )
    .join("\n\n");

  return `@theme {
  /* color tokens — light theme as defaults, enabling bg-*, text-*, border-*
     color utilities. Other themes override via the :where(.<theme>) blocks below,
     applied at runtime through ScopedTheme (NativeWind's VariableContextProvider). */
${emit(lightVars, "  ")}
}

@layer theme {
${baseBlocks}

${accentBlocks}
}
`;
};

/**
 * The fully-resolved CSS-variable map for every theme (base mode tokens + accent
 * overrides merged), keyed `--color-*`. Feeds `ScopedTheme` and `useThemeToken`.
 */
export const buildThemeVariables = (
  scales: ThemeScales,
): Record<AlouetteTheme, Record<`--color-${string}`, string>> => {
  const resolved: Record<string, Record<`--color-${string}`, string>> = {
    light: prefixVars(buildThemeVars(scales, "light", "grayscale")),
    dark: prefixVars(buildThemeVars(scales, "dark", "grayscale")),
  };

  for (const mode of ["light", "dark"] as const) {
    const base = buildThemeVars(scales, mode, "grayscale");
    for (const accent of accents) {
      resolved[`${mode}_${accent}`] = prefixVars({
        ...base,
        ...buildThemeVars(scales, mode, accent),
      });
    }
  }

  return resolved;
};
