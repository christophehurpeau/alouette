import type { SizeTokens, VariantSpreadExtras, ViewStyle } from "@tamagui/core";
export declare const withBorder: (val: SizeTokens | boolean, { props }: VariantSpreadExtras<any>) => {
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/web").UnionableNumber | import("@tamagui/web").UnionableString;
} | {
    readonly shadowColor: `$${string}.shadowColor`;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/web").UnionableNumber | import("@tamagui/web").UnionableString;
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
    readonly borderWidth: 1 | import("@tamagui/web").UnionableNumber | import("@tamagui/web").UnionableString;
} | {
    readonly hoverStyle: {
        readonly [name]: `$${string}.borderColor:hover` | `$${string}.backgroundColor:hover`;
    };
    readonly pressStyle: {
        readonly [name]: `$${string}.borderColor:press` | `$${string}.backgroundColor:press`;
    };
    readonly focusStyle: {
        readonly [name]: `$${string}.borderColor:focus` | `$${string}.backgroundColor:focus`;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
    readonly borderWidth: 1 | import("@tamagui/web").UnionableNumber | import("@tamagui/web").UnionableString;
} | {
    readonly borderColor: string;
    readonly borderWidth: 1 | import("@tamagui/web").UnionableNumber | import("@tamagui/web").UnionableString;
};
export declare const withBackground: (val: boolean, { props }: VariantSpreadExtras<any>) => {
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
        readonly [name]: `$${string}.borderColor:hover` | `$${string}.backgroundColor:hover`;
    } | {
        readonly [name]: `$${string}.borderColor:press` | `$${string}.backgroundColor:press`;
    } | {
        readonly [name]: `$${string}.borderColor:focus` | `$${string}.backgroundColor:focus`;
    };
    readonly hoverStyle: {
        readonly [name]: `$${string}.borderColor:hover` | `$${string}.backgroundColor:hover`;
    };
    readonly pressStyle: {
        readonly [name]: `$${string}.borderColor:press` | `$${string}.backgroundColor:press`;
    };
    readonly focusStyle: {
        readonly [name]: `$${string}.borderColor:focus` | `$${string}.backgroundColor:focus`;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
} | {
    readonly focusVisibleStyle: {
        readonly outlineWidth: 2;
        readonly outlineStyle: "solid";
        readonly outlineOffset: 2;
        readonly outlineColor: `$${string}.outlineColor:focus`;
    };
    readonly shadowColor: `$${string}.shadowColor`;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
} | {
    readonly hoverStyle: {
        readonly [name]: `$${string}.borderColor:hover` | `$${string}.backgroundColor:hover`;
    };
    readonly pressStyle: {
        readonly [name]: `$${string}.borderColor:press` | `$${string}.backgroundColor:press`;
    };
    readonly focusStyle: {
        readonly [name]: `$${string}.borderColor:focus` | `$${string}.backgroundColor:focus`;
    };
    readonly shadowColor: `$${string}.shadowColor`;
    readonly focusVisibleStyle?: undefined;
} | {
    readonly hoverStyle: {
        readonly [name]: `$${string}.borderColor:hover` | `$${string}.backgroundColor:hover`;
    };
    readonly pressStyle: {
        readonly [name]: `$${string}.borderColor:press` | `$${string}.backgroundColor:press`;
    };
    readonly focusStyle: {
        readonly [name]: `$${string}.borderColor:focus` | `$${string}.backgroundColor:focus`;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle: {
        readonly outlineWidth: 2;
        readonly outlineStyle: "solid";
        readonly outlineOffset: 2;
        readonly outlineColor: `$${string}.outlineColor:focus`;
    };
} | {
    readonly backgroundColor: string;
};
export declare const withScreenBackground: (val: boolean | "translucent", { props }: VariantSpreadExtras<any>) => {
    readonly backgroundColor?: undefined;
    readonly backdropFilter?: undefined;
} | {
    readonly backgroundColor: "$screenBackgroundColor.translucent";
    readonly backdropFilter: "blur(14px)";
} | {
    readonly backgroundColor: "$screenBackgroundColor.elevated";
    readonly backdropFilter?: undefined;
} | {
    readonly backgroundColor: "$screenBackgroundColor";
    readonly backdropFilter?: undefined;
};
export declare const withElevation: (val: boolean, { props }: VariantSpreadExtras<any>) => {
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly elevationAndroid?: number | undefined;
    readonly shadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    readonly shadowOpacity?: number | undefined;
    readonly shadowRadius?: number | undefined;
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
    readonly elevationAndroid?: number | undefined;
    readonly shadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    readonly shadowOpacity?: number | undefined;
    readonly shadowRadius?: number | undefined;
} | {
    readonly hoverStyle: {
        readonly [name]: `$${string}.borderColor:hover` | `$${string}.backgroundColor:hover`;
    };
    readonly pressStyle: {
        readonly [name]: `$${string}.borderColor:press` | `$${string}.backgroundColor:press`;
    };
    readonly focusStyle: {
        readonly [name]: `$${string}.borderColor:focus` | `$${string}.backgroundColor:focus`;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
    readonly elevationAndroid?: number | undefined;
    readonly shadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    readonly shadowOpacity?: number | undefined;
    readonly shadowRadius?: number | undefined;
} | {
    readonly shadowColor: string;
    readonly elevationAndroid?: number | undefined;
    readonly shadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    readonly shadowOpacity?: number | undefined;
    readonly shadowRadius?: number | undefined;
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
export declare const fullscreen: {
    readonly true: {
        readonly position: "absolute";
        readonly top: 0;
        readonly left: 0;
        readonly right: 0;
        readonly bottom: 0;
    };
};
export declare const interactive: (isInteractiveOrInteractiveCursorType: ViewStyle["cursor"] | boolean, { props }: VariantSpreadExtras<any>) => {
    readonly cursor: "not-allowed";
    readonly transform?: undefined;
    readonly hoverStyle?: undefined;
    readonly pressStyle?: undefined;
} | {
    readonly cursor: import("csstype").Property.Cursor;
    readonly transform: readonly [{
        readonly scale: 1;
    }];
    readonly hoverStyle: {
        readonly transform: readonly [{
            readonly scale: 1.02;
        }];
    };
    readonly pressStyle: {
        readonly transform: readonly [{
            readonly scale: 0.98;
        }];
    };
} | null;
export declare const centered: {
    readonly true: {
        readonly alignItems: "center";
        readonly justifyContent: "center";
    };
};
//# sourceMappingURL=variants.d.ts.map