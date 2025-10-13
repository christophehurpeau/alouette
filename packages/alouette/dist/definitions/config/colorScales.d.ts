import type { IntRange } from "type-fest";
export declare const mappingLightToDark: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
};
export type AlouetteColorScaleNumber = IntRange<1, 11>;
export type AlouetteColorScale = Record<AlouetteColorScaleNumber, string>;
export declare const createColorScale: <const T extends AlouetteColorScale>(colorScale: T) => T;
export interface AlouetteThemeNames {
    primary: "primary";
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