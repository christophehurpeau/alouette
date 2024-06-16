import type { SizeTokens, VariantSpreadExtras, ViewStyle } from "@tamagui/core";
import type { InternalPseudoState } from "../primitives/createVariants";
export declare const internalForcedPseudoState: (val: InternalPseudoState) => {};
export declare const withBorder: (val: SizeTokens | boolean, { props }: VariantSpreadExtras<any>) => {
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber;
    readonly borderColor: "$borderColor";
} | {
    readonly borderColor: "$interactive.forms.borderColor:disabled" | "$interactive.borderColor:disabled";
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber;
} | {
    readonly borderColor: string;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber;
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
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber;
};
export declare const withBackground: (val: boolean, { props }: VariantSpreadExtras<any>) => {};
export declare const size: (val: number) => {
    readonly width: number;
    readonly height: number;
};
export declare const circular: {
    readonly true: (val: boolean, { props, tokens }: VariantSpreadExtras<any>) => {
        borderRadius: number;
        padding: number;
    } | {
        width: import("@tamagui/core").VariableVal;
        height: import("@tamagui/core").VariableVal;
        maxWidth: import("@tamagui/core").VariableVal;
        maxHeight: import("@tamagui/core").VariableVal;
        minWidth: import("@tamagui/core").VariableVal;
        minHeight: import("@tamagui/core").VariableVal;
        borderRadius: number;
        padding: number;
    };
};
export declare const interactive: (isInteractiveOrInteractiveCursorType: boolean | ViewStyle["cursor"], { props }: VariantSpreadExtras<any>) => {
    readonly cursor: import("csstype").Property.Cursor;
} | null;
export declare const centered: {
    readonly true: {
        readonly alignItems: "center";
        readonly justifyContent: "center";
    };
};
//# sourceMappingURL=variants.d.ts.map