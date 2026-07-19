// Palette definitions: the single place declaring each accent — its hue
// parameters (consumed by the repo-root `scripts/generate-palette.ts`, which
// turns them into color scales) and its traits (consumed by `tokenScaleMap.ts`
// when a token's step depends on the accent, e.g. `brightFill`).

export type AccentName =
  | "brand"
  | "danger"
  | "grayscale"
  | "info"
  | "success"
  | "warning";

export interface PaletteSpec {
  type: "grayscale" | "accent" | "brightAccent";
  hue: number;
  // Optional hue ramp keyed on perceptual lightness: `hueHi` applies at the
  // lightest end, `hueLo` at the darkest. Both default to `hue` (no ramp).
  hueHi?: number;
  hueLo?: number;
  // Uniform multiplier on the relative chroma curve (grayscale = 0).
  intensity?: number;
}

// Insertion order is the order palettes are emitted into defaultColorScales.
export const paletteSpecs: Record<AccentName, PaletteSpec> = {
  grayscale: { type: "grayscale", hue: 0, intensity: 0 },
  brand: { type: "accent", hue: 225 },
  // Slightly pinker tints (hueHi 20) matching the old palette's pale reds.
  danger: { type: "accent", hue: 27, hueHi: 20 },
  info: { type: "accent", hue: 233 },
  success: { type: "accent", hue: 145 },
  // Amber ramp: cream tints at the light end, bronze shadows — the classic
  // warning gold rather than lemon yellow.
  warning: { type: "brightAccent", hue: 85, hueHi: 95, hueLo: 75 },
};
