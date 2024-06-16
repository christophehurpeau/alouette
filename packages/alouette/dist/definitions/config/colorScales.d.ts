import type { IntRange } from "type-fest";
export type AlouetteColorScaleNumber = IntRange<1, 10>;
export type AlouetteColorScale = {
    [K in AlouetteColorScaleNumber]: string;
};
export declare const createColorScale: <const T extends AlouetteColorScale>(colorScale: T) => T;
export type AlouetteColorScaleNames = "grayscale" | "success" | "info" | "warning" | "danger" | "primary";
export type ColorScaleTokens = {
    [K in AlouetteColorScaleNames as `${K}.${AlouetteColorScaleNumber}`]: string;
};
export type AlouetteColorScales = Record<AlouetteColorScaleNames, AlouetteColorScale>;
export declare const defaultColorScales: AlouetteColorScales;
//# sourceMappingURL=colorScales.d.ts.map