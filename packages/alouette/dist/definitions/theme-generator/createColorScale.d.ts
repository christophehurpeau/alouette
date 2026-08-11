import type { PaletteSpec } from "./paletteSpecs.ts";
import type { Mode, ScaleNum } from "./tokenScaleMap.ts";
export interface OklchColor {
    lightness: number;
    chroma: number;
    hue: number;
}
export type ColorScale = Record<ScaleNum, string>;
export type OklchScale = Record<ScaleNum, OklchColor>;
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
export declare const maxChroma: ({ lightness, hue, gamut, }: MaxChromaParams) => number;
export declare const maxSrgbChroma: (lightness: number, hue: number) => number;
export declare const toHex: ({ lightness, chroma, hue }: OklchColor) => string;
export declare const createOklchScale: (spec: PaletteSpec, mode: Mode, gamut: Gamut) => OklchScale;
export declare const createColorScale: (spec: PaletteSpec, mode: Mode) => ColorScale;
export {};
//# sourceMappingURL=createColorScale.d.ts.map