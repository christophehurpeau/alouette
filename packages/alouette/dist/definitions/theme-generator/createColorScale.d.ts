import type { PaletteSpec } from "./paletteSpecs.ts";
import type { Mode, ScaleNum } from "./tokenScaleMap.ts";
export type ColorScale = Record<ScaleNum, string>;
export declare const maxSrgbChroma: (lightness: number, hue: number) => number;
export declare const createColorScale: (spec: PaletteSpec, mode: Mode) => ColorScale;
//# sourceMappingURL=createColorScale.d.ts.map