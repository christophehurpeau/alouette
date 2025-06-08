import type { VariantSpreadExtras } from "@tamagui/core";
export declare const fullscreenStyle: {
    readonly position: "absolute";
    readonly top: 0;
    readonly left: 0;
    readonly right: 0;
    readonly bottom: 0;
};
export type InternalPseudoState = "focus" | "hover" | "press";
export declare const getInteractionStyles: (name: "backgroundColor" | "borderColor" | "shadowColor", { internalForcedPseudoState, disabled, interactive, variant, }: VariantSpreadExtras<any>["props"]) => {
    readonly [x: string]: `$${string}.backgroundColor:disabled` | `$${string}.borderColor:disabled` | `$${string}.shadowColor:disabled`;
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly shadowColor: `$${string}.shadowColor`;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly [x: string]: `$${string}.backgroundColor:hover` | `$${string}.borderColor:hover`;
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly [x: string]: `$${string}.backgroundColor:press` | `$${string}.borderColor:press`;
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly [x: string]: `$${string}.backgroundColor:focus` | `$${string}.borderColor:focus`;
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly [x: string]: string | {
        readonly [x: string]: `$${string}.backgroundColor:hover` | `$${string}.borderColor:hover`;
    } | {
        readonly [x: string]: `$${string}.backgroundColor:press` | `$${string}.borderColor:press`;
    } | {
        readonly [x: string]: `$${string}.backgroundColor:focus` | `$${string}.borderColor:focus`;
    };
    readonly hoverStyle: {
        readonly [x: string]: `$${string}.backgroundColor:hover` | `$${string}.borderColor:hover`;
    };
    readonly pressStyle: {
        readonly [x: string]: `$${string}.backgroundColor:press` | `$${string}.borderColor:press`;
    };
    readonly focusStyle: {
        readonly [x: string]: `$${string}.backgroundColor:focus` | `$${string}.borderColor:focus`;
    };
    readonly shadowColor?: undefined;
};
//# sourceMappingURL=createVariants.d.ts.map