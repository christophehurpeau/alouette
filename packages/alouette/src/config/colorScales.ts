import type { IntRange } from "type-fest";

// scale inspired by https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale

// LIGHT SCALE
// 1: colored page background color
// 2: interactive outlined background hover/focus color
// 3: interactive contained background press color / non interactive background color
// 4: interactive outlined background press color / non interactive shadow color
// 5: interactive contained background hover/focus color
// 6: interactive contained background color
// 7: interactive border color
// 8: interactive shadow color / text:press / interactive border hover/focus color
// 9: text color
// 10: text:hover/focus

// DARK SCALE
// 1: colored page background color
// 2: interactive outlined background press color / non interactive shadow color
// 3: interactive contained background press color / non interactive background color
// 4: interactive outlined background hover/focus color
// 5: interactive contained background color
// 6: interactive contained background hover/focus color
// 7: interactive border color
// 8: interactive shadow color / text:press / interactive border hover/focus color
// 9: text color
// 10: text:hover/focus

// this mapping is used to keep focus/hover colors brighter
export const mappingLightToDark = {
  1: 1,
  2: 4,
  3: 3,
  4: 2,
  5: 6,
  6: 5,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
};

export type AlouetteColorScaleNumber = IntRange<1, 11>;

export type AlouetteColorScale = Record<AlouetteColorScaleNumber, string>;

export const createColorScale = <const T extends AlouetteColorScale>(
  colorScale: T,
): T => colorScale;

export type AlouetteColorIntent =
  | "danger"
  | "grayscale"
  | "info"
  | "primary"
  | "success"
  | "warning";

export type AlouetteColorScaleNames =
  | `${AlouetteColorIntent}.dark`
  | `${AlouetteColorIntent}.light`;

export type ColorScaleTokens = {
  [K in AlouetteColorScaleNames as `${K}.${AlouetteColorScaleNumber}`]: string; //(typeof colorScales)[K][AlouetteColorScaleNumber];
};

export type AlouetteColorScales = Record<
  AlouetteColorScaleNames,
  AlouetteColorScale
>;
