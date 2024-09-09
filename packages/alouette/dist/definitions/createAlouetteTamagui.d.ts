import type { AlouetteColorScales } from "./config/colorScales";
import type { AlouetteFontsOptions } from "./config/createAlouetteFonts";
import type { createAlouetteTokens } from "./config/createAlouetteTokens";
import type { createAlouetteThemes } from "./config/themes";
export { createAlouetteTokens } from "./config/createAlouetteTokens";
export interface AlouetteTamaguiOptions {
    fonts?: AlouetteFontsOptions;
}
export { createColorTheme, createAlouetteThemes, type FullTheme, } from "./config/themes";
export { defaultColorScales, createColorScale, type AlouetteColorScales, type AlouetteColorScale, } from "./config/colorScales";
export declare const createAlouetteTamagui: <const ColorScales extends AlouetteColorScales, const Tokens extends ReturnType<typeof createAlouetteTokens<ColorScales>>, const Themes extends ReturnType<typeof createAlouetteThemes<ColorScales>>>(tokens: Tokens, themes: Themes, options?: AlouetteTamaguiOptions) => import("@tamagui/core").TamaguiInternalConfig<Tokens extends Record<string, {
    [key: string]: import("@tamagui/core").VariableVal;
}> & {
    color: {
        [key: string]: import("@tamagui/core").VariableVal;
    };
    space: {
        [key: string]: import("@tamagui/core").VariableVal;
    };
    size: {
        [key: string]: import("@tamagui/core").VariableVal;
    };
    radius: {
        [key: string]: import("@tamagui/core").VariableVal;
    };
    zIndex: {
        [key: string]: import("@tamagui/core").VariableVal;
    };
} ? Tokens : {
    color: {};
    space: {};
    size: {};
    radius: {};
    zIndex: {};
}, Themes extends {
    [key: string]: Partial<import("@tamagui/core").TamaguiBaseTheme> & {
        [key: string]: import("@tamagui/core").VariableVal;
    };
} ? Themes : {}, {}, {
    readonly small: {
        readonly minWidth: 480;
    };
    readonly medium: {
        readonly minWidth: 768;
    };
    readonly large: {
        readonly minWidth: 1024;
    };
    readonly wide: {
        readonly minWidth: 1280;
    };
}, {
    fast: {
        type: "timing";
        duration: number;
        damping: number;
        stiffness: number;
    };
    formElement: {
        type: "timing";
        duration: number;
        damping: number;
        stiffness: number;
    };
}, {
    heading: {
        family: string;
        weight: {
            regular: string;
            bold: string;
            black: string;
        };
        face: {
            400: {
                normal: string;
            };
            700: {
                normal: string;
            };
            900: {
                normal: string;
            };
        };
        size: {
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
        lineHeight: {
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
    };
    body: {
        family: string;
        weight: {
            regular: string;
            bold: string;
            black: string;
        };
        face: {
            400: {
                normal: string;
            };
            700: {
                normal: string;
            };
            900: {
                normal: string;
            };
        };
        size: {
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
        lineHeight: {
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
    };
}, boolean | undefined, {
    readonly allowedStyleValues: "somewhat-strict-web";
    readonly autocompleteSpecificTokens: "except-special";
}>;
//# sourceMappingURL=createAlouetteTamagui.d.ts.map