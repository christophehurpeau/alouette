import type { VariantSpreadExtras } from "@tamagui/core";
export declare const fullscreenStyle: {
    readonly position: "absolute";
    readonly top: 0;
    readonly left: 0;
    readonly right: 0;
    readonly bottom: 0;
};
export type InternalPseudoState = "focus" | "hover" | "press";
export declare const getInteractionStyles: (name: "backgroundColor" | "borderColor" | "outlineColor" | "shadowColor", { disabled, interactive, variant }: VariantSpreadExtras<any>["props"]) => {
    readonly [x: string]: `$${string}.borderColor:disabled` | `$${string}.shadowColor:disabled` | `$${string}.backgroundColor:disabled` | `$${string}.outlineColor:disabled`;
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly shadowColor: `$${string}.shadowColor`;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly focusVisibleStyle: {
        readonly outlineWidth: 2;
        readonly outlineStyle: "solid";
        readonly outlineOffset: 2;
        readonly outlineColor: `$${string}.outlineColor:focus`;
    };
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly [x: string]: string | {
        readonly [x: string]: `$${string}.borderColor:hover` | `$${string}.backgroundColor:hover`;
    } | {
        readonly [x: string]: `$${string}.borderColor:press` | `$${string}.backgroundColor:press`;
    } | {
        readonly [x: string]: `$${string}.borderColor:focus` | `$${string}.backgroundColor:focus`;
    };
    readonly hoverStyle: {
        readonly [x: string]: `$${string}.borderColor:hover` | `$${string}.backgroundColor:hover`;
    };
    readonly pressStyle: {
        readonly [x: string]: `$${string}.borderColor:press` | `$${string}.backgroundColor:press`;
    };
    readonly focusStyle: {
        readonly [x: string]: `$${string}.borderColor:focus` | `$${string}.backgroundColor:focus`;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
};
//# sourceMappingURL=createVariants.d.ts.map