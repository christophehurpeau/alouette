import type { VariantSpreadExtras } from "@tamagui/core";
export declare const absoluteFillStyle: {
    readonly position: "absolute";
    readonly top: 0;
    readonly left: 0;
    readonly right: 0;
    readonly bottom: 0;
};
export type InternalPseudoState = "focus" | "hover" | "press";
export declare const getInteractionStyles: (name: "backgroundColor" | "borderColor" | "outlineColor" | "shadowColor", { disabled, interactive, variant, tint, }: VariantSpreadExtras<any>["props"]) => {
    readonly [x: string]: `$${string}.backgroundColor:disabled` | `$${string}.borderColor:disabled` | `$${string}.outlineColor:disabled` | `$${string}.shadowColor:disabled`;
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly disabledStyle?: undefined;
} | {
    readonly shadowColor: `$${string}.shadowColor`;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly disabledStyle?: undefined;
} | {
    readonly focusVisibleStyle: {
        readonly outlineWidth: 0 | 2;
        readonly outlineStyle: "solid";
        readonly outlineOffset: 0 | 2;
        readonly outlineColor: `$${string}.outlineColor:focus`;
    };
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly disabledStyle?: undefined;
} | {
    readonly [x: string]: string | {
        readonly [x: string]: `$${string}.backgroundColor:hover` | `$${string}.borderColor:hover`;
    } | {
        readonly [x: string]: `$${string}.backgroundColor:focus` | `$${string}.borderColor:focus`;
    } | {
        readonly [x: string]: `$${string}.backgroundColor:press` | `$${string}.borderColor:press`;
    } | {
        readonly [x: string]: `$${string}.backgroundColor:disabled` | `$${string}.borderColor:disabled`;
    };
    readonly hoverStyle: {
        readonly [x: string]: `$${string}.backgroundColor:hover` | `$${string}.borderColor:hover`;
    };
    readonly focusStyle: {
        readonly [x: string]: `$${string}.backgroundColor:focus` | `$${string}.borderColor:focus`;
    };
    readonly pressStyle: {
        readonly [x: string]: `$${string}.backgroundColor:press` | `$${string}.borderColor:press`;
    };
    readonly disabledStyle: {
        readonly [x: string]: `$${string}.backgroundColor:disabled` | `$${string}.borderColor:disabled`;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
};
//# sourceMappingURL=createVariants.d.ts.map