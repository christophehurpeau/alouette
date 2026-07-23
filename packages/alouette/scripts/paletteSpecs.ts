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

// Decorative hues carry no semantic meaning — they exist to tell categories
// apart (badges, tags, labels). They are not themes: only the three values a
// Badge needs are emitted, never a token set.
export type DecorativeName =
  | "indigo"
  | "mint"
  | "orange"
  | "sky"
  | "violet"
  | "yellow";

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

// Every decorative hue uses the plain `accent` ramp — the same one brand/info/
// success run through — so a decorative badge is built from identical steps to
// an accent badge. `brightAccent` is reserved for warning, whose lifted dark
// steps are what makes it read as gold; applied here it would lighten the tints
// enough to drop text-on-tint below AA.
export const decorativeSpecs: Record<DecorativeName, PaletteSpec> = {
  yellow: { type: "accent", hue: 93 },
  orange: { type: "accent", hue: 62 },
  mint: { type: "accent", hue: 148 },
  sky: { type: "accent", hue: 222 },
  indigo: { type: "accent", hue: 264 },
  violet: { type: "accent", hue: 305 },
};
