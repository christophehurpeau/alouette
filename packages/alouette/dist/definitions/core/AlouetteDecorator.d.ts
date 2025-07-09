import type { Decorator } from "@storybook/react-vite";
export declare const AlouetteTamaguiConfigContext: import("react").Context<import("@tamagui/web").TamaguiInternalConfig<Record<string, {
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
}, {
    [key: string]: Partial<import("@tamagui/web").TamaguiBaseTheme> & {
        [key: string]: import("@tamagui/web").VariableVal;
    };
}, import("@tamagui/web").GenericShorthands, {
    [key: string]: {
        [key: string]: string | number;
    };
}, {
    [key: string]: string | any[] | {
        [key: string]: any;
    };
}, import("@tamagui/web").GenericFonts, import("@tamagui/web").GenericTamaguiSettings> | null | undefined>;
export declare const AlouetteDecorator: Decorator;
//# sourceMappingURL=AlouetteDecorator.d.ts.map