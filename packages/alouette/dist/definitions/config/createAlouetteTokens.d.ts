import type { AlouetteColorScaleNumber, AlouetteColorScales } from "./colorScales";
type ColorScaleTokens<ColorScales extends AlouetteColorScales> = {
    [K in string & keyof ColorScales as `${K}.${AlouetteColorScaleNumber}`]: string;
};
export interface AlouetteTokensOptions {
    spacing?: number;
}
export declare const createAlouetteTokens: <const ColorScales extends AlouetteColorScales>(colorScales: ColorScales, { spacing }?: AlouetteTokensOptions) => {
    color: { [Key in "black" | "white" | "disabled" | "contrastDisabled" | keyof ColorScaleTokens<ColorScales> extends number ? `${number & keyof ColorScaleTokens<ColorScales>}` : "black" | "white" | "disabled" | "contrastDisabled" | keyof ColorScaleTokens<ColorScales>]: import("@tamagui/core").Variable<string>; };
    space: {
        0: import("@tamagui/core").Variable<number>;
        20: import("@tamagui/core").Variable<number>;
        1: import("@tamagui/core").Variable<number>;
        10: import("@tamagui/core").Variable<number>;
        4: import("@tamagui/core").Variable<number>;
        2: import("@tamagui/core").Variable<number>;
        3: import("@tamagui/core").Variable<number>;
        5: import("@tamagui/core").Variable<number>;
        6: import("@tamagui/core").Variable<number>;
        7: import("@tamagui/core").Variable<number>;
        8: import("@tamagui/core").Variable<number>;
        9: import("@tamagui/core").Variable<number>;
        48: import("@tamagui/core").Variable<number>;
        40: import("@tamagui/core").Variable<number>;
        32: import("@tamagui/core").Variable<number>;
        24: import("@tamagui/core").Variable<number>;
        18: import("@tamagui/core").Variable<number>;
        16: import("@tamagui/core").Variable<number>;
        14: import("@tamagui/core").Variable<number>;
        12: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        sm: import("@tamagui/core").Variable<number>;
        xs: import("@tamagui/core").Variable<number>;
        11: import("@tamagui/core").Variable<number>;
        13: import("@tamagui/core").Variable<number>;
        15: import("@tamagui/core").Variable<number>;
        17: import("@tamagui/core").Variable<number>;
        19: import("@tamagui/core").Variable<number>;
        21: import("@tamagui/core").Variable<number>;
        22: import("@tamagui/core").Variable<number>;
        23: import("@tamagui/core").Variable<number>;
        25: import("@tamagui/core").Variable<number>;
        26: import("@tamagui/core").Variable<number>;
        27: import("@tamagui/core").Variable<number>;
        28: import("@tamagui/core").Variable<number>;
        29: import("@tamagui/core").Variable<number>;
        30: import("@tamagui/core").Variable<number>;
        31: import("@tamagui/core").Variable<number>;
        33: import("@tamagui/core").Variable<number>;
        34: import("@tamagui/core").Variable<number>;
        35: import("@tamagui/core").Variable<number>;
        36: import("@tamagui/core").Variable<number>;
        37: import("@tamagui/core").Variable<number>;
        38: import("@tamagui/core").Variable<number>;
        39: import("@tamagui/core").Variable<number>;
        41: import("@tamagui/core").Variable<number>;
        42: import("@tamagui/core").Variable<number>;
        43: import("@tamagui/core").Variable<number>;
        44: import("@tamagui/core").Variable<number>;
        45: import("@tamagui/core").Variable<number>;
        46: import("@tamagui/core").Variable<number>;
        47: import("@tamagui/core").Variable<number>;
        49: import("@tamagui/core").Variable<number>;
        50: import("@tamagui/core").Variable<number>;
        51: import("@tamagui/core").Variable<number>;
        52: import("@tamagui/core").Variable<number>;
        53: import("@tamagui/core").Variable<number>;
        54: import("@tamagui/core").Variable<number>;
        55: import("@tamagui/core").Variable<number>;
        56: import("@tamagui/core").Variable<number>;
        57: import("@tamagui/core").Variable<number>;
        58: import("@tamagui/core").Variable<number>;
        59: import("@tamagui/core").Variable<number>;
        60: import("@tamagui/core").Variable<number>;
        61: import("@tamagui/core").Variable<number>;
        62: import("@tamagui/core").Variable<number>;
        63: import("@tamagui/core").Variable<number>;
        "-0": import("@tamagui/core").Variable<number>;
        [-20]: import("@tamagui/core").Variable<number>;
        [-1]: import("@tamagui/core").Variable<number>;
        [-10]: import("@tamagui/core").Variable<number>;
        [-4]: import("@tamagui/core").Variable<number>;
        [-2]: import("@tamagui/core").Variable<number>;
        [-3]: import("@tamagui/core").Variable<number>;
        [-5]: import("@tamagui/core").Variable<number>;
        [-6]: import("@tamagui/core").Variable<number>;
        [-7]: import("@tamagui/core").Variable<number>;
        [-8]: import("@tamagui/core").Variable<number>;
        [-9]: import("@tamagui/core").Variable<number>;
        [-48]: import("@tamagui/core").Variable<number>;
        [-40]: import("@tamagui/core").Variable<number>;
        [-32]: import("@tamagui/core").Variable<number>;
        [-24]: import("@tamagui/core").Variable<number>;
        [-18]: import("@tamagui/core").Variable<number>;
        [-16]: import("@tamagui/core").Variable<number>;
        [-14]: import("@tamagui/core").Variable<number>;
        [-12]: import("@tamagui/core").Variable<number>;
        [-11]: import("@tamagui/core").Variable<number>;
        [-13]: import("@tamagui/core").Variable<number>;
        [-15]: import("@tamagui/core").Variable<number>;
        [-17]: import("@tamagui/core").Variable<number>;
        [-19]: import("@tamagui/core").Variable<number>;
        [-21]: import("@tamagui/core").Variable<number>;
        [-22]: import("@tamagui/core").Variable<number>;
        [-23]: import("@tamagui/core").Variable<number>;
        [-25]: import("@tamagui/core").Variable<number>;
        [-26]: import("@tamagui/core").Variable<number>;
        [-27]: import("@tamagui/core").Variable<number>;
        [-28]: import("@tamagui/core").Variable<number>;
        [-29]: import("@tamagui/core").Variable<number>;
        [-30]: import("@tamagui/core").Variable<number>;
        [-31]: import("@tamagui/core").Variable<number>;
        [-33]: import("@tamagui/core").Variable<number>;
        [-34]: import("@tamagui/core").Variable<number>;
        [-35]: import("@tamagui/core").Variable<number>;
        [-36]: import("@tamagui/core").Variable<number>;
        [-37]: import("@tamagui/core").Variable<number>;
        [-38]: import("@tamagui/core").Variable<number>;
        [-39]: import("@tamagui/core").Variable<number>;
        [-41]: import("@tamagui/core").Variable<number>;
        [-42]: import("@tamagui/core").Variable<number>;
        [-43]: import("@tamagui/core").Variable<number>;
        [-44]: import("@tamagui/core").Variable<number>;
        [-45]: import("@tamagui/core").Variable<number>;
        [-46]: import("@tamagui/core").Variable<number>;
        [-47]: import("@tamagui/core").Variable<number>;
        [-49]: import("@tamagui/core").Variable<number>;
        [-50]: import("@tamagui/core").Variable<number>;
        [-51]: import("@tamagui/core").Variable<number>;
        [-52]: import("@tamagui/core").Variable<number>;
        [-53]: import("@tamagui/core").Variable<number>;
        [-54]: import("@tamagui/core").Variable<number>;
        [-55]: import("@tamagui/core").Variable<number>;
        [-56]: import("@tamagui/core").Variable<number>;
        [-57]: import("@tamagui/core").Variable<number>;
        [-58]: import("@tamagui/core").Variable<number>;
        [-59]: import("@tamagui/core").Variable<number>;
        [-60]: import("@tamagui/core").Variable<number>;
        [-61]: import("@tamagui/core").Variable<number>;
        [-62]: import("@tamagui/core").Variable<number>;
        [-63]: import("@tamagui/core").Variable<number>;
    };
    size: {
        1: import("@tamagui/core").Variable<number>;
        10: import("@tamagui/core").Variable<number>;
        0: import("@tamagui/core").Variable<number>;
        20: import("@tamagui/core").Variable<number>;
        4: import("@tamagui/core").Variable<number>;
        2: import("@tamagui/core").Variable<number>;
        3: import("@tamagui/core").Variable<number>;
        5: import("@tamagui/core").Variable<number>;
        6: import("@tamagui/core").Variable<number>;
        7: import("@tamagui/core").Variable<number>;
        8: import("@tamagui/core").Variable<number>;
        9: import("@tamagui/core").Variable<number>;
        48: import("@tamagui/core").Variable<number>;
        40: import("@tamagui/core").Variable<number>;
        32: import("@tamagui/core").Variable<number>;
        24: import("@tamagui/core").Variable<number>;
        18: import("@tamagui/core").Variable<number>;
        16: import("@tamagui/core").Variable<number>;
        14: import("@tamagui/core").Variable<number>;
        12: import("@tamagui/core").Variable<number>;
        11: import("@tamagui/core").Variable<number>;
        13: import("@tamagui/core").Variable<number>;
        15: import("@tamagui/core").Variable<number>;
        17: import("@tamagui/core").Variable<number>;
        19: import("@tamagui/core").Variable<number>;
        21: import("@tamagui/core").Variable<number>;
        22: import("@tamagui/core").Variable<number>;
        23: import("@tamagui/core").Variable<number>;
        25: import("@tamagui/core").Variable<number>;
        26: import("@tamagui/core").Variable<number>;
        27: import("@tamagui/core").Variable<number>;
        28: import("@tamagui/core").Variable<number>;
        29: import("@tamagui/core").Variable<number>;
        30: import("@tamagui/core").Variable<number>;
        31: import("@tamagui/core").Variable<number>;
        33: import("@tamagui/core").Variable<number>;
        34: import("@tamagui/core").Variable<number>;
        35: import("@tamagui/core").Variable<number>;
        36: import("@tamagui/core").Variable<number>;
        37: import("@tamagui/core").Variable<number>;
        38: import("@tamagui/core").Variable<number>;
        39: import("@tamagui/core").Variable<number>;
        41: import("@tamagui/core").Variable<number>;
        42: import("@tamagui/core").Variable<number>;
        43: import("@tamagui/core").Variable<number>;
        44: import("@tamagui/core").Variable<number>;
        45: import("@tamagui/core").Variable<number>;
        46: import("@tamagui/core").Variable<number>;
        47: import("@tamagui/core").Variable<number>;
        49: import("@tamagui/core").Variable<number>;
        50: import("@tamagui/core").Variable<number>;
        51: import("@tamagui/core").Variable<number>;
        52: import("@tamagui/core").Variable<number>;
        53: import("@tamagui/core").Variable<number>;
        54: import("@tamagui/core").Variable<number>;
        55: import("@tamagui/core").Variable<number>;
        56: import("@tamagui/core").Variable<number>;
        57: import("@tamagui/core").Variable<number>;
        58: import("@tamagui/core").Variable<number>;
        59: import("@tamagui/core").Variable<number>;
        60: import("@tamagui/core").Variable<number>;
        61: import("@tamagui/core").Variable<number>;
        62: import("@tamagui/core").Variable<number>;
        63: import("@tamagui/core").Variable<number>;
    };
    radius: {
        0: import("@tamagui/core").Variable<number>;
        20: import("@tamagui/core").Variable<number>;
        1: import("@tamagui/core").Variable<number>;
        10: import("@tamagui/core").Variable<number>;
        4: import("@tamagui/core").Variable<number>;
        2: import("@tamagui/core").Variable<number>;
        3: import("@tamagui/core").Variable<number>;
        5: import("@tamagui/core").Variable<number>;
        6: import("@tamagui/core").Variable<number>;
        7: import("@tamagui/core").Variable<number>;
        8: import("@tamagui/core").Variable<number>;
        9: import("@tamagui/core").Variable<number>;
        48: import("@tamagui/core").Variable<number>;
        40: import("@tamagui/core").Variable<number>;
        32: import("@tamagui/core").Variable<number>;
        24: import("@tamagui/core").Variable<number>;
        18: import("@tamagui/core").Variable<number>;
        16: import("@tamagui/core").Variable<number>;
        14: import("@tamagui/core").Variable<number>;
        12: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        sm: import("@tamagui/core").Variable<number>;
        xs: import("@tamagui/core").Variable<number>;
        11: import("@tamagui/core").Variable<number>;
        13: import("@tamagui/core").Variable<number>;
        15: import("@tamagui/core").Variable<number>;
        17: import("@tamagui/core").Variable<number>;
        19: import("@tamagui/core").Variable<number>;
        21: import("@tamagui/core").Variable<number>;
        22: import("@tamagui/core").Variable<number>;
        23: import("@tamagui/core").Variable<number>;
        25: import("@tamagui/core").Variable<number>;
        26: import("@tamagui/core").Variable<number>;
        27: import("@tamagui/core").Variable<number>;
        28: import("@tamagui/core").Variable<number>;
        29: import("@tamagui/core").Variable<number>;
        30: import("@tamagui/core").Variable<number>;
        31: import("@tamagui/core").Variable<number>;
        33: import("@tamagui/core").Variable<number>;
        34: import("@tamagui/core").Variable<number>;
        35: import("@tamagui/core").Variable<number>;
        36: import("@tamagui/core").Variable<number>;
        37: import("@tamagui/core").Variable<number>;
        38: import("@tamagui/core").Variable<number>;
        39: import("@tamagui/core").Variable<number>;
        41: import("@tamagui/core").Variable<number>;
        42: import("@tamagui/core").Variable<number>;
        43: import("@tamagui/core").Variable<number>;
        44: import("@tamagui/core").Variable<number>;
        45: import("@tamagui/core").Variable<number>;
        46: import("@tamagui/core").Variable<number>;
        47: import("@tamagui/core").Variable<number>;
        49: import("@tamagui/core").Variable<number>;
        50: import("@tamagui/core").Variable<number>;
        51: import("@tamagui/core").Variable<number>;
        52: import("@tamagui/core").Variable<number>;
        53: import("@tamagui/core").Variable<number>;
        54: import("@tamagui/core").Variable<number>;
        55: import("@tamagui/core").Variable<number>;
        56: import("@tamagui/core").Variable<number>;
        57: import("@tamagui/core").Variable<number>;
        58: import("@tamagui/core").Variable<number>;
        59: import("@tamagui/core").Variable<number>;
        60: import("@tamagui/core").Variable<number>;
        61: import("@tamagui/core").Variable<number>;
        62: import("@tamagui/core").Variable<number>;
        63: import("@tamagui/core").Variable<number>;
    };
    zIndex: {};
} & Omit<{
    readonly color: { [Key_1 in "black" | "white" | "disabled" | "contrastDisabled" | keyof ColorScaleTokens<ColorScales> extends number ? `${number & keyof ColorScaleTokens<ColorScales>}` : "black" | "white" | "disabled" | "contrastDisabled" | keyof ColorScaleTokens<ColorScales>]: import("@tamagui/core").Variable<({
        readonly black: "#000000";
        readonly white: "#ffffff";
        readonly disabled: string;
        readonly contrastDisabled: string;
    } & ColorScaleTokens<ColorScales>)["black" | "white" | "disabled" | "contrastDisabled" | keyof ColorScaleTokens<ColorScales>]>; };
    readonly radius: {
        0: import("@tamagui/core").Variable<number>;
        20: import("@tamagui/core").Variable<number>;
        1: import("@tamagui/core").Variable<number>;
        10: import("@tamagui/core").Variable<number>;
        4: import("@tamagui/core").Variable<number>;
        2: import("@tamagui/core").Variable<number>;
        3: import("@tamagui/core").Variable<number>;
        5: import("@tamagui/core").Variable<number>;
        6: import("@tamagui/core").Variable<number>;
        7: import("@tamagui/core").Variable<number>;
        8: import("@tamagui/core").Variable<number>;
        9: import("@tamagui/core").Variable<number>;
        48: import("@tamagui/core").Variable<number>;
        40: import("@tamagui/core").Variable<number>;
        32: import("@tamagui/core").Variable<number>;
        24: import("@tamagui/core").Variable<number>;
        18: import("@tamagui/core").Variable<number>;
        16: import("@tamagui/core").Variable<number>;
        14: import("@tamagui/core").Variable<number>;
        12: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        sm: import("@tamagui/core").Variable<number>;
        xs: import("@tamagui/core").Variable<number>;
        11: import("@tamagui/core").Variable<number>;
        13: import("@tamagui/core").Variable<number>;
        15: import("@tamagui/core").Variable<number>;
        17: import("@tamagui/core").Variable<number>;
        19: import("@tamagui/core").Variable<number>;
        21: import("@tamagui/core").Variable<number>;
        22: import("@tamagui/core").Variable<number>;
        23: import("@tamagui/core").Variable<number>;
        25: import("@tamagui/core").Variable<number>;
        26: import("@tamagui/core").Variable<number>;
        27: import("@tamagui/core").Variable<number>;
        28: import("@tamagui/core").Variable<number>;
        29: import("@tamagui/core").Variable<number>;
        30: import("@tamagui/core").Variable<number>;
        31: import("@tamagui/core").Variable<number>;
        33: import("@tamagui/core").Variable<number>;
        34: import("@tamagui/core").Variable<number>;
        35: import("@tamagui/core").Variable<number>;
        36: import("@tamagui/core").Variable<number>;
        37: import("@tamagui/core").Variable<number>;
        38: import("@tamagui/core").Variable<number>;
        39: import("@tamagui/core").Variable<number>;
        41: import("@tamagui/core").Variable<number>;
        42: import("@tamagui/core").Variable<number>;
        43: import("@tamagui/core").Variable<number>;
        44: import("@tamagui/core").Variable<number>;
        45: import("@tamagui/core").Variable<number>;
        46: import("@tamagui/core").Variable<number>;
        47: import("@tamagui/core").Variable<number>;
        49: import("@tamagui/core").Variable<number>;
        50: import("@tamagui/core").Variable<number>;
        51: import("@tamagui/core").Variable<number>;
        52: import("@tamagui/core").Variable<number>;
        53: import("@tamagui/core").Variable<number>;
        54: import("@tamagui/core").Variable<number>;
        55: import("@tamagui/core").Variable<number>;
        56: import("@tamagui/core").Variable<number>;
        57: import("@tamagui/core").Variable<number>;
        58: import("@tamagui/core").Variable<number>;
        59: import("@tamagui/core").Variable<number>;
        60: import("@tamagui/core").Variable<number>;
        61: import("@tamagui/core").Variable<number>;
        62: import("@tamagui/core").Variable<number>;
        63: import("@tamagui/core").Variable<number>;
    };
    readonly space: {
        0: import("@tamagui/core").Variable<number>;
        20: import("@tamagui/core").Variable<number>;
        1: import("@tamagui/core").Variable<number>;
        10: import("@tamagui/core").Variable<number>;
        4: import("@tamagui/core").Variable<number>;
        2: import("@tamagui/core").Variable<number>;
        3: import("@tamagui/core").Variable<number>;
        5: import("@tamagui/core").Variable<number>;
        6: import("@tamagui/core").Variable<number>;
        7: import("@tamagui/core").Variable<number>;
        8: import("@tamagui/core").Variable<number>;
        9: import("@tamagui/core").Variable<number>;
        48: import("@tamagui/core").Variable<number>;
        40: import("@tamagui/core").Variable<number>;
        32: import("@tamagui/core").Variable<number>;
        24: import("@tamagui/core").Variable<number>;
        18: import("@tamagui/core").Variable<number>;
        16: import("@tamagui/core").Variable<number>;
        14: import("@tamagui/core").Variable<number>;
        12: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        sm: import("@tamagui/core").Variable<number>;
        xs: import("@tamagui/core").Variable<number>;
        11: import("@tamagui/core").Variable<number>;
        13: import("@tamagui/core").Variable<number>;
        15: import("@tamagui/core").Variable<number>;
        17: import("@tamagui/core").Variable<number>;
        19: import("@tamagui/core").Variable<number>;
        21: import("@tamagui/core").Variable<number>;
        22: import("@tamagui/core").Variable<number>;
        23: import("@tamagui/core").Variable<number>;
        25: import("@tamagui/core").Variable<number>;
        26: import("@tamagui/core").Variable<number>;
        27: import("@tamagui/core").Variable<number>;
        28: import("@tamagui/core").Variable<number>;
        29: import("@tamagui/core").Variable<number>;
        30: import("@tamagui/core").Variable<number>;
        31: import("@tamagui/core").Variable<number>;
        33: import("@tamagui/core").Variable<number>;
        34: import("@tamagui/core").Variable<number>;
        35: import("@tamagui/core").Variable<number>;
        36: import("@tamagui/core").Variable<number>;
        37: import("@tamagui/core").Variable<number>;
        38: import("@tamagui/core").Variable<number>;
        39: import("@tamagui/core").Variable<number>;
        41: import("@tamagui/core").Variable<number>;
        42: import("@tamagui/core").Variable<number>;
        43: import("@tamagui/core").Variable<number>;
        44: import("@tamagui/core").Variable<number>;
        45: import("@tamagui/core").Variable<number>;
        46: import("@tamagui/core").Variable<number>;
        47: import("@tamagui/core").Variable<number>;
        49: import("@tamagui/core").Variable<number>;
        50: import("@tamagui/core").Variable<number>;
        51: import("@tamagui/core").Variable<number>;
        52: import("@tamagui/core").Variable<number>;
        53: import("@tamagui/core").Variable<number>;
        54: import("@tamagui/core").Variable<number>;
        55: import("@tamagui/core").Variable<number>;
        56: import("@tamagui/core").Variable<number>;
        57: import("@tamagui/core").Variable<number>;
        58: import("@tamagui/core").Variable<number>;
        59: import("@tamagui/core").Variable<number>;
        60: import("@tamagui/core").Variable<number>;
        61: import("@tamagui/core").Variable<number>;
        62: import("@tamagui/core").Variable<number>;
        63: import("@tamagui/core").Variable<number>;
        "-0": import("@tamagui/core").Variable<number>;
        [-20]: import("@tamagui/core").Variable<number>;
        [-1]: import("@tamagui/core").Variable<number>;
        [-10]: import("@tamagui/core").Variable<number>;
        [-4]: import("@tamagui/core").Variable<number>;
        [-2]: import("@tamagui/core").Variable<number>;
        [-3]: import("@tamagui/core").Variable<number>;
        [-5]: import("@tamagui/core").Variable<number>;
        [-6]: import("@tamagui/core").Variable<number>;
        [-7]: import("@tamagui/core").Variable<number>;
        [-8]: import("@tamagui/core").Variable<number>;
        [-9]: import("@tamagui/core").Variable<number>;
        [-48]: import("@tamagui/core").Variable<number>;
        [-40]: import("@tamagui/core").Variable<number>;
        [-32]: import("@tamagui/core").Variable<number>;
        [-24]: import("@tamagui/core").Variable<number>;
        [-18]: import("@tamagui/core").Variable<number>;
        [-16]: import("@tamagui/core").Variable<number>;
        [-14]: import("@tamagui/core").Variable<number>;
        [-12]: import("@tamagui/core").Variable<number>;
        [-11]: import("@tamagui/core").Variable<number>;
        [-13]: import("@tamagui/core").Variable<number>;
        [-15]: import("@tamagui/core").Variable<number>;
        [-17]: import("@tamagui/core").Variable<number>;
        [-19]: import("@tamagui/core").Variable<number>;
        [-21]: import("@tamagui/core").Variable<number>;
        [-22]: import("@tamagui/core").Variable<number>;
        [-23]: import("@tamagui/core").Variable<number>;
        [-25]: import("@tamagui/core").Variable<number>;
        [-26]: import("@tamagui/core").Variable<number>;
        [-27]: import("@tamagui/core").Variable<number>;
        [-28]: import("@tamagui/core").Variable<number>;
        [-29]: import("@tamagui/core").Variable<number>;
        [-30]: import("@tamagui/core").Variable<number>;
        [-31]: import("@tamagui/core").Variable<number>;
        [-33]: import("@tamagui/core").Variable<number>;
        [-34]: import("@tamagui/core").Variable<number>;
        [-35]: import("@tamagui/core").Variable<number>;
        [-36]: import("@tamagui/core").Variable<number>;
        [-37]: import("@tamagui/core").Variable<number>;
        [-38]: import("@tamagui/core").Variable<number>;
        [-39]: import("@tamagui/core").Variable<number>;
        [-41]: import("@tamagui/core").Variable<number>;
        [-42]: import("@tamagui/core").Variable<number>;
        [-43]: import("@tamagui/core").Variable<number>;
        [-44]: import("@tamagui/core").Variable<number>;
        [-45]: import("@tamagui/core").Variable<number>;
        [-46]: import("@tamagui/core").Variable<number>;
        [-47]: import("@tamagui/core").Variable<number>;
        [-49]: import("@tamagui/core").Variable<number>;
        [-50]: import("@tamagui/core").Variable<number>;
        [-51]: import("@tamagui/core").Variable<number>;
        [-52]: import("@tamagui/core").Variable<number>;
        [-53]: import("@tamagui/core").Variable<number>;
        [-54]: import("@tamagui/core").Variable<number>;
        [-55]: import("@tamagui/core").Variable<number>;
        [-56]: import("@tamagui/core").Variable<number>;
        [-57]: import("@tamagui/core").Variable<number>;
        [-58]: import("@tamagui/core").Variable<number>;
        [-59]: import("@tamagui/core").Variable<number>;
        [-60]: import("@tamagui/core").Variable<number>;
        [-61]: import("@tamagui/core").Variable<number>;
        [-62]: import("@tamagui/core").Variable<number>;
        [-63]: import("@tamagui/core").Variable<number>;
    };
    readonly size: {
        1: import("@tamagui/core").Variable<number>;
        10: import("@tamagui/core").Variable<number>;
        0: import("@tamagui/core").Variable<number>;
        20: import("@tamagui/core").Variable<number>;
        4: import("@tamagui/core").Variable<number>;
        2: import("@tamagui/core").Variable<number>;
        3: import("@tamagui/core").Variable<number>;
        5: import("@tamagui/core").Variable<number>;
        6: import("@tamagui/core").Variable<number>;
        7: import("@tamagui/core").Variable<number>;
        8: import("@tamagui/core").Variable<number>;
        9: import("@tamagui/core").Variable<number>;
        48: import("@tamagui/core").Variable<number>;
        40: import("@tamagui/core").Variable<number>;
        32: import("@tamagui/core").Variable<number>;
        24: import("@tamagui/core").Variable<number>;
        18: import("@tamagui/core").Variable<number>;
        16: import("@tamagui/core").Variable<number>;
        14: import("@tamagui/core").Variable<number>;
        12: import("@tamagui/core").Variable<number>;
        11: import("@tamagui/core").Variable<number>;
        13: import("@tamagui/core").Variable<number>;
        15: import("@tamagui/core").Variable<number>;
        17: import("@tamagui/core").Variable<number>;
        19: import("@tamagui/core").Variable<number>;
        21: import("@tamagui/core").Variable<number>;
        22: import("@tamagui/core").Variable<number>;
        23: import("@tamagui/core").Variable<number>;
        25: import("@tamagui/core").Variable<number>;
        26: import("@tamagui/core").Variable<number>;
        27: import("@tamagui/core").Variable<number>;
        28: import("@tamagui/core").Variable<number>;
        29: import("@tamagui/core").Variable<number>;
        30: import("@tamagui/core").Variable<number>;
        31: import("@tamagui/core").Variable<number>;
        33: import("@tamagui/core").Variable<number>;
        34: import("@tamagui/core").Variable<number>;
        35: import("@tamagui/core").Variable<number>;
        36: import("@tamagui/core").Variable<number>;
        37: import("@tamagui/core").Variable<number>;
        38: import("@tamagui/core").Variable<number>;
        39: import("@tamagui/core").Variable<number>;
        41: import("@tamagui/core").Variable<number>;
        42: import("@tamagui/core").Variable<number>;
        43: import("@tamagui/core").Variable<number>;
        44: import("@tamagui/core").Variable<number>;
        45: import("@tamagui/core").Variable<number>;
        46: import("@tamagui/core").Variable<number>;
        47: import("@tamagui/core").Variable<number>;
        49: import("@tamagui/core").Variable<number>;
        50: import("@tamagui/core").Variable<number>;
        51: import("@tamagui/core").Variable<number>;
        52: import("@tamagui/core").Variable<number>;
        53: import("@tamagui/core").Variable<number>;
        54: import("@tamagui/core").Variable<number>;
        55: import("@tamagui/core").Variable<number>;
        56: import("@tamagui/core").Variable<number>;
        57: import("@tamagui/core").Variable<number>;
        58: import("@tamagui/core").Variable<number>;
        59: import("@tamagui/core").Variable<number>;
        60: import("@tamagui/core").Variable<number>;
        61: import("@tamagui/core").Variable<number>;
        62: import("@tamagui/core").Variable<number>;
        63: import("@tamagui/core").Variable<number>;
    };
    readonly zIndex: {};
}, "color" | "space" | "size" | "radius" | "zIndex">;
export {};
//# sourceMappingURL=createAlouetteTokens.d.ts.map