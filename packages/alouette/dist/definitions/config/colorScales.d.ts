import type { IntRange } from "type-fest";
export type AlouetteColorScaleNumber = IntRange<1, 12>;
export type AlouetteColorScale = Record<AlouetteColorScaleNumber, string>;
export declare const createColorScale: <const T extends AlouetteColorScale>(colorScale: T) => T;
export interface AlouetteThemeNames {
    brand: "brand";
    info: "info";
    success: "success";
    warning: "warning";
    danger: "danger";
    grayscale: "grayscale";
}
export type AlouetteColorScaleNames = `${keyof AlouetteThemeNames}.dark` | `${keyof AlouetteThemeNames}.light`;
export type ColorScaleTokens = {
    [K in AlouetteColorScaleNames as `${K}.${AlouetteColorScaleNumber}`]: string;
};
export type AlouetteColorScales = Record<AlouetteColorScaleNames, AlouetteColorScale>;
//# sourceMappingURL=colorScales.d.ts.map