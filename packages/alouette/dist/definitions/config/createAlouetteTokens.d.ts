import type { AlouetteColorScaleNumber, AlouetteColorScales } from "./colorScales";
type ColorScaleTokens<ColorScales extends AlouetteColorScales> = {
    [K in string & keyof ColorScales as `${K}.${AlouetteColorScaleNumber}`]: string;
};
export interface AlouetteTokensOptions {
    spacing?: number;
}
export declare const createAlouetteTokens: <const ColorScales extends AlouetteColorScales>(colorScales: ColorScales, { spacing }?: AlouetteTokensOptions) => {
    color: {
        readonly blackBackground: "#1f1e1e";
        readonly whiteBackground: "#ffffff";
        readonly blackBackgroundTranslucent: "#1f1e1e55";
        readonly whiteBackgroundTranslucent: "#ffffff66";
        readonly blackText: "#000000";
        readonly whiteText: "#fdfdfd";
        readonly transparent: "transparent";
    } & ColorScaleTokens<ColorScales> extends infer T ? { [Key in keyof T as Key extends number ? `${Key}` : Key]: import("@tamagui/web").Variable<Type>; } : never;
    space: {
        readonly "-1.0": import("@tamagui/web").Variable<number>;
        readonly 0.25: import("@tamagui/web").Variable<number>;
        readonly 0.5: import("@tamagui/web").Variable<number>;
        readonly 0.75: import("@tamagui/web").Variable<number>;
        readonly "1.0": import("@tamagui/web").Variable<number>;
        readonly 1.25: import("@tamagui/web").Variable<number>;
        readonly 1.5: import("@tamagui/web").Variable<number>;
        readonly "2.0": import("@tamagui/web").Variable<number>;
        readonly "3.0": import("@tamagui/web").Variable<number>;
    };
    size: {};
    radius: {
        readonly xs: import("@tamagui/web").Variable<number>;
        readonly sm: import("@tamagui/web").Variable<number>;
        readonly md: import("@tamagui/web").Variable<number>;
        readonly lg: import("@tamagui/web").Variable<number>;
    };
    zIndex: {};
} & Omit<{
    readonly color: {
        readonly blackBackground: "#1f1e1e";
        readonly whiteBackground: "#ffffff";
        readonly blackBackgroundTranslucent: "#1f1e1e55";
        readonly whiteBackgroundTranslucent: "#ffffff66";
        readonly blackText: "#000000";
        readonly whiteText: "#fdfdfd";
        readonly transparent: "transparent";
    } & ColorScaleTokens<ColorScales> extends infer T_1 ? { [Key_1 in keyof T_1 as Key_1 extends number ? `${Key_1}` : Key_1]: import("@tamagui/web").Variable<Type>; } : never;
    readonly radius: {
        readonly xs: import("@tamagui/web").Variable<number>;
        readonly sm: import("@tamagui/web").Variable<number>;
        readonly md: import("@tamagui/web").Variable<number>;
        readonly lg: import("@tamagui/web").Variable<number>;
    };
    readonly space: {
        readonly "-1.0": import("@tamagui/web").Variable<number>;
        readonly 0.25: import("@tamagui/web").Variable<number>;
        readonly 0.5: import("@tamagui/web").Variable<number>;
        readonly 0.75: import("@tamagui/web").Variable<number>;
        readonly "1.0": import("@tamagui/web").Variable<number>;
        readonly 1.25: import("@tamagui/web").Variable<number>;
        readonly 1.5: import("@tamagui/web").Variable<number>;
        readonly "2.0": import("@tamagui/web").Variable<number>;
        readonly "3.0": import("@tamagui/web").Variable<number>;
    };
    readonly size: {};
    readonly zIndex: {};
    readonly opacity: {
        readonly disabled: import("@tamagui/web").Variable<0.7>;
    };
}, "color" | "space" | "size" | "radius" | "zIndex">;
export {};
//# sourceMappingURL=createAlouetteTokens.d.ts.map