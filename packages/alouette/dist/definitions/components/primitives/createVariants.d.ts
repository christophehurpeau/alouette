import type { VariantSpreadExtras } from "@tamagui/core";
export declare const fullscreenStyle: {
    readonly position: "absolute";
    readonly top: 0;
    readonly left: 0;
    readonly right: 0;
    readonly bottom: 0;
};
export type InternalPseudoState = "focus" | "hover" | "press";
export declare const getBorderAdditionalInteraction: ({ internalForcedPseudoState, disabled, interactive, }: VariantSpreadExtras<any>["props"]) => {
    readonly borderColor: "$interactive.forms.borderColor:disabled" | "$interactive.borderColor:disabled";
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    borderColor: string;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly borderColor: "$interactive.forms.borderColor" | "$interactive.borderColor";
    readonly hoverStyle: {
        readonly borderColor: "$interactive.forms.borderColor:hover" | "$interactive.borderColor:hover";
    };
    readonly pressStyle: {
        readonly borderColor: "$interactive.forms.borderColor:press" | "$interactive.borderColor:press";
    };
    readonly focusStyle: {
        readonly borderColor: "$interactive.forms.borderColor:focus" | "$interactive.borderColor:focus";
    };
};
export declare const getBackgroundAdditionalInteraction: ({ internalForcedPseudoState, disabled, interactive, variant, }: VariantSpreadExtras<any>["props"]) => {
    readonly backgroundColor: `$${string}.backgroundColor:disabled`;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    backgroundColor: string;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly backgroundColor: `$${string}.backgroundColor`;
    readonly hoverStyle: {
        readonly backgroundColor: `$${string}.backgroundColor:hover`;
    };
    readonly pressStyle: {
        readonly backgroundColor: `$${string}.backgroundColor:press`;
    };
    readonly focusStyle: {
        readonly backgroundColor: `$${string}.backgroundColor:focus`;
    };
};
//# sourceMappingURL=createVariants.d.ts.map