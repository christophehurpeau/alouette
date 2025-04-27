import type { SizeTokens, VariantSpreadExtras, ViewStyle } from "@tamagui/core";
import type { InternalPseudoState } from "../primitives/createVariants.ts";
export declare const internalForcedPseudoState: (val: InternalPseudoState) => {};
export declare const withBorder: (val: SizeTokens | boolean, { props }: VariantSpreadExtras<any>) => {
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber | import("@tamagui/core").UnionableString;
} | {
    readonly shadowColor: `$${string}.shadowColor`;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber | import("@tamagui/core").UnionableString;
} | {
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber | import("@tamagui/core").UnionableString;
} | {
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber | import("@tamagui/core").UnionableString;
} | {
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber | import("@tamagui/core").UnionableString;
} | {
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
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber | import("@tamagui/core").UnionableString;
} | {
    readonly borderColor: string;
    readonly borderWidth: 1 | import("@tamagui/core").UnionableNumber | import("@tamagui/core").UnionableString;
};
export declare const withBackground: (val: boolean, { props }: VariantSpreadExtras<any>) => {
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
} | {
    readonly backgroundColor: string;
};
export declare const withElevation: (val: boolean, { props }: VariantSpreadExtras<any>) => {
    readonly shadowColor?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly shadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    readonly shadowOpacity?: number | undefined;
    readonly shadowRadius?: number | undefined;
    readonly elevation?: number | undefined;
} | {
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
    readonly shadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    readonly shadowOpacity?: number | undefined;
    readonly shadowRadius?: number | undefined;
    readonly elevation?: number | undefined;
} | {
    readonly shadowColor: string;
    readonly shadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    readonly shadowOpacity?: number | undefined;
    readonly shadowRadius?: number | undefined;
    readonly elevation?: number | undefined;
};
export declare const size: (val: number) => {
    readonly width: number;
    readonly height: number;
};
export declare const circular: {
    readonly true: (val: boolean, { props, tokens }: {
        props: any;
        tokens: any;
    }) => {
        borderRadius: number;
        padding: number;
    } | {
        width: any;
        height: any;
        maxWidth: any;
        maxHeight: any;
        minWidth: any;
        minHeight: any;
        borderRadius: number;
        padding: number;
    };
};
export declare const interactive: (isInteractiveOrInteractiveCursorType: ViewStyle["cursor"] | boolean, { props }: VariantSpreadExtras<any>) => {
    readonly cursor: import("csstype").Property.Cursor;
} | null;
export declare const centered: {
    readonly true: {
        readonly alignItems: "center";
        readonly justifyContent: "center";
    };
};
//# sourceMappingURL=variants.d.ts.map