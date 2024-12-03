import type { IntRange } from "type-fest";
export type AlouetteColorScaleNumber = IntRange<1, 10>;
export type AlouetteColorScale = Record<AlouetteColorScaleNumber, string>;
export declare const createColorScale: <const T extends AlouetteColorScale>(colorScale: T) => T;
export type AlouetteColorScaleNames = "danger" | "grayscale" | "info" | "primary" | "success" | "warning";
export type ColorScaleTokens = {
    [K in AlouetteColorScaleNames as `${K}.${AlouetteColorScaleNumber}`]: string;
};
export type AlouetteColorScales = Record<AlouetteColorScaleNames, AlouetteColorScale>;
export declare const defaultColorScales: AlouetteColorScales;
//# sourceMappingURL=colorScales.d.ts.map