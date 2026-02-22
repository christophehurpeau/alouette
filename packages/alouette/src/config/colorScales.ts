import type { IntRange } from "type-fest";

// scale inspired by https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale

export type AlouetteColorScaleNumber = IntRange<1, 12>;

export type AlouetteColorScale = Record<AlouetteColorScaleNumber, string>;

export const createColorScale = <const T extends AlouetteColorScale>(
  colorScale: T,
): T => colorScale;

export interface AlouetteThemeNames {
  brand: "brand";
  info: "info";
  success: "success";
  warning: "warning";
  danger: "danger";
  grayscale: "grayscale";
}

export type AlouetteColorScaleNames =
  | `${keyof AlouetteThemeNames}.dark`
  | `${keyof AlouetteThemeNames}.light`;

export type ColorScaleTokens = {
  [K in AlouetteColorScaleNames as `${K}.${AlouetteColorScaleNumber}`]: string; //(typeof colorScales)[K][AlouetteColorScaleNumber];
};

export type AlouetteColorScales = Record<
  AlouetteColorScaleNames,
  AlouetteColorScale
>;
