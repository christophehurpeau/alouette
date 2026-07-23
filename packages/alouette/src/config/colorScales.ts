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

// Decorative colors distinguish categories (badges, tags) rather than convey
// state. They are not themes: instead of a full scale each one carries only the
// three values a Badge needs, mirroring the steps the accent tokens resolve to.
export type AlouetteDecorativeName =
  | "indigo"
  | "mint"
  | "orange"
  | "sky"
  | "violet"
  | "yellow";

export interface AlouetteDecorativeColor {
  /** Pale fill for a tinted badge — same step as `--color-highlight-accent`. */
  tint: string;
  /** Saturated fill carrying `--color-on-accent` text — same step as `--color-enabled`. */
  fill: string;
  /** Text and border color on a neutral surface — same step as `--color-accent`. */
  text: string;
}

export type AlouetteDecorativeColorNames =
  | `${AlouetteDecorativeName}.dark`
  | `${AlouetteDecorativeName}.light`;

export type AlouetteDecorativeColors = Record<
  AlouetteDecorativeColorNames,
  AlouetteDecorativeColor
>;
