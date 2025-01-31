import type { IntRange } from "type-fest";

// scale inspired by https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
// 1: interactive outlined background hover/focus color
// 2: interactive contained background press color
// 3: interactive outlined background press color
// 4: interactive contained background hover/focus color
// 5: interactive contained background color
// 6: main color
// 7: border hover/focus color
// 8: border color
// 9: text color
// 10: form border color (default)

export type AlouetteColorScaleNumber = IntRange<1, 11>;

export type AlouetteColorScale = Record<AlouetteColorScaleNumber, string>;

export const createColorScale = <const T extends AlouetteColorScale>(
  colorScale: T,
): T => colorScale;

export type AlouetteColorScaleNames =
  | "danger"
  | "grayscale"
  | "info"
  | "primary"
  | "success"
  | "warning";

export type ColorScaleTokens = {
  [K in AlouetteColorScaleNames as `${K}.${AlouetteColorScaleNumber}`]: string; //(typeof colorScales)[K][AlouetteColorScaleNumber];
};

export type AlouetteColorScales = Record<
  AlouetteColorScaleNames,
  AlouetteColorScale
>;

// Tool: https://m2.material.io/inline-tools/color/

export const defaultColorScales: AlouetteColorScales = {
  grayscale: createColorScale({
    1: "#faf9f8",
    2: "#f4f3ef",
    3: "#ebe9e5",
    4: "#dedad2",
    5: "#d1cdc5",
    6: "#bab8ae",
    7: "#aeaba3",
    8: "#9c9a92",
    9: "#8e8c83",
    10: "#74726a",
  }),
  success: createColorScale({
    1: "#f0f9f3",
    2: "#d4f0d4",
    3: "#a8e6a8",
    4: "#7edc7e",
    5: "#54d254",
    6: "#2ac82a",
    7: "#00be00",
    8: "#00b400",
    9: "#00aa00",
    10: "#009200",
  }),
  info: createColorScale({
    1: "#f0f9ff",
    2: "#d4f0ff",
    3: "#a8e6ff",
    4: "#7edcff",
    5: "#54d2ff",
    6: "#2ac8ff",
    7: "#00beff",
    8: "#00b4ff",
    9: "#00aaff",
    10: "#0092ff",
  }),
  warning: createColorScale({
    1: "#fff9f0",
    2: "#fff0d4",
    3: "#ffe6a8",
    4: "#ffdc7e",
    5: "#ffd254",
    6: "#ffc82a",
    7: "#ffbe00",
    8: "#ffb400",
    9: "#ffaa00",
    10: "#ff9200",
  }),
  danger: createColorScale({
    1: "#fff0f0",
    2: "#ffd4d4",
    3: "#ffaaaa",
    4: "#ff7e7e",
    5: "#ff5454",
    6: "#ff2a2a",
    7: "#ff0000",
    8: "#f40000",
    9: "#ea0000",
    10: "#d20000",
  }),
  primary: createColorScale({
    1: "#e1f4f6",
    2: "#b4e2e9",
    3: "#86cfdc",
    4: "#60bcd0",
    5: "#46aeca",
    6: "#31a1c4",
    7: "#2994b7",
    8: "#1e82a6",
    9: "#1c7193",
    10: "#125272",
  }),
} as const;
