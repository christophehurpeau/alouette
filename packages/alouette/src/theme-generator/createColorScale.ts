/* eslint-disable import-x/extensions */
// OKLCH color-scale generator. Palettes are generated in OKLCH so a single
// lightness ramp is perceptually uniform across every hue (HSL lightness is not
// — yellow at HSL L=56 reads far brighter than blue at the same L). Chroma is
// specified *relative to the target gamut*: each step requests a fraction of the
// maximum chroma that gamut can render at that step's lightness and hue. The
// fraction curve is shared by every palette and tiered by usage (muted surface
// tints, medium highlight mids, near-vivid interactive and text steps), so all
// hues are equally saturated relative to what's possible — no per-palette chroma
// table. The same ramp generated against display-p3 instead of sRGB is what the
// `oklch()` palette ships to web.

import Color from "colorjs.io";
import type { PaletteSpec } from "./paletteSpecs.ts";
import type { Mode, ScaleNum } from "./tokenScaleMap.ts";

export interface OklchColor {
  lightness: number;
  chroma: number;
  hue: number;
}

export type ColorScale = Record<ScaleNum, string>;
export type OklchScale = Record<ScaleNum, OklchColor>;

// step:                     1     2     3     4     5     6     7     8     9    10    11
const lightnessRamps = {
  grayscale: {
    dark: [0.18, 0.24, 0.28, 0.32, 0.36, 0.4, 0.45, 0.795, 0.865, 0.96, 1],
    // only diff is on the first 2 values
    light: [1, 0.98, 0.948, 0.89, 0.85, 0.79, 0.61, 0.54, 0.48, 0.42, 0.27],
  },
  accent: {
    dark: [0.18, 0.22, 0.26, 0.3, 0.34, 0.4, 0.5, 0.7, 0.82, 0.865, 0.955],
    light: [
      0.988, 0.968, 0.948, 0.89, 0.85, 0.79, 0.62, 0.54, 0.48, 0.42, 0.27,
    ],
  },
  brightAccent: {
    dark: [0.28, 0.32, 0.4, 0.45, 0.5, 0.53, 0.56, 0.8, 0.86, 0.9, 0.955],
    light: [0.988, 0.968, 0.948, 0.928, 0.89, 0.82, 0.8, 0.6, 0.56, 0.44, 0.27],
  },
} as const;

// Fraction of the max in-gamut chroma requested at each step. Usage tiers
// mirror the old HSL generator's 56/82/96 saturation bands: steps 1-3 pale
// surfaces, 4-6 highlight/message tints, 7-11 interactive fills and text.
const relativeChromaCurve: Record<Mode, number[]> = {
  dark: [0.6, 0.68, 0.72, 0.76, 0.78, 0.84, 0.88, 0.88, 0.85, 0.82, 0.86],
  light: [0.5, 0.52, 0.55, 0.6, 0.75, 0.78, 0.92, 0.97, 0.97, 0.97, 0.95],
};

/**
 * Which gamut the chroma budget is measured against. `srgb` is what every
 * platform can render (and what the hex output is mapped into); `p3` gives the
 * same lightness ramp more chroma headroom, used by the `oklch()` output that
 * only web consumes.
 */
export type Gamut = "p3" | "srgb";

interface MaxChromaParams {
  lightness: number;
  hue: number;
  gamut: Gamut;
}

// Largest OKLCH chroma still inside the given gamut at this lightness/hue.
export const maxChroma = ({
  lightness,
  hue,
  gamut,
}: MaxChromaParams): number => {
  const space = gamut === "p3" ? "p3" : "srgb";
  let low = 0;
  let high = 0.5;
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    if (new Color("oklch", [lightness, mid, hue]).to(space).inGamut()) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return low;
};

export const maxSrgbChroma = (lightness: number, hue: number): number =>
  maxChroma({ lightness, hue, gamut: "srgb" });

export const toHex = ({ lightness, chroma, hue }: OklchColor): string => {
  const color = new Color("oklch", [lightness, chroma, hue]).to("srgb");
  const hex = color.toGamut({ method: "css" }).toString({ format: "hex" });
  // colorjs collapses to 3-digit shorthand (#050); expand so appended alpha
  // suffixes (e.g. selection = step + "40") stay valid 8-digit hex.
  const full =
    hex.length === 4 ? hex.replace(/^#(.)(.)(.)$/, "#$1$1$2$2$3$3") : hex;
  return full.toUpperCase();
};

export const createOklchScale = (
  spec: PaletteSpec,
  mode: Mode,
  gamut: Gamut,
): OklchScale => {
  const hueHi = spec.hueHi ?? spec.hue;
  const hueLo = spec.hueLo ?? spec.hue;
  const intensity = spec.intensity ?? 1;
  const ramp = lightnessRamps[spec.type][mode];
  const steps = ramp.map((lightness, index): OklchColor => {
    const hue = hueLo + (hueHi - hueLo) * lightness;
    const chroma =
      relativeChromaCurve[mode][index]! *
      intensity *
      maxChroma({ lightness, hue, gamut });
    return { lightness, chroma, hue };
  });
  return Object.fromEntries(
    steps.map((color, index) => [index + 1, color]),
  ) as unknown as OklchScale;
};

export const createColorScale = (spec: PaletteSpec, mode: Mode): ColorScale => {
  const scale = createOklchScale(spec, mode, "srgb");
  return Object.fromEntries(
    Object.entries(scale).map(([step, color]) => [step, toHex(color)]),
  ) as unknown as ColorScale;
};
