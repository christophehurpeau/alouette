import type { AlouetteColorScales } from "./config/colorScales";
import type { AlouetteFontsOptions } from "./config/createAlouetteFonts";
import type { createAlouetteTokens } from "./config/createAlouetteTokens";
import type { createAlouetteThemes } from "./config/themes";
export { createAlouetteTokens } from "./config/createAlouetteTokens";
export interface AlouetteTamaguiOptions {
    fonts?: AlouetteFontsOptions;
}
export { createColorTheme, createAlouetteThemes, type FullTheme, } from "./config/themes";
export { createColorScale, type AlouetteColorScales, type AlouetteColorScale, } from "./config/colorScales";
export { defaultColorScales } from "./config/defaultColorScales";
export declare const createAlouetteTamagui: <const ColorScales extends AlouetteColorScales, const Tokens extends ReturnType<typeof createAlouetteTokens<ColorScales>>, const Themes extends ReturnType<typeof createAlouetteThemes<ColorScales>>>(tokens: Tokens, themes: Themes, options?: AlouetteTamaguiOptions) => import("@tamagui/web").TamaguiInternalConfig<Tokens extends Record<string, {
    [key: string]: import("@tamagui/web").VariableVal;
}> & {
    color?: {
        [key: string]: import("@tamagui/web").VariableVal;
    } | undefined;
    space?: {
        [key: string]: import("@tamagui/web").VariableVal;
    } | undefined;
    size?: {
        [key: string]: import("@tamagui/web").VariableVal;
    } | undefined;
    radius?: {
        [key: string]: import("@tamagui/web").VariableVal;
    } | undefined;
    zIndex?: {
        [key: string]: import("@tamagui/web").VariableVal;
    } | undefined;
} ? Tokens : {
    color: {};
    space: {};
    size: {};
    radius: {};
    zIndex: {};
}, Themes extends {
    [key: string]: Partial<import("@tamagui/web").TamaguiBaseTheme> & {
        [key: string]: import("@tamagui/web").VariableVal;
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
    medium: {
        type: "timing";
        duration: number;
        damping: number;
        stiffness: number;
    };
    slow: {
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
}, {
    readonly allowedStyleValues: "somewhat-strict-web";
    readonly autocompleteSpecificTokens: "except-special";
}>;
//# sourceMappingURL=createAlouetteTamagui.d.ts.map