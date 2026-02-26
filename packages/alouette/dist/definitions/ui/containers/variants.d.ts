import type { SizeTokens, VariantSpreadExtras, ViewProps } from "@tamagui/core";
export declare const absoluteFill: {
    readonly true: {
        readonly position: "absolute";
        readonly top: 0;
        readonly left: 0;
        readonly right: 0;
        readonly bottom: 0;
    };
};
export declare const center: {
    readonly true: {
        readonly justifyContent: "center";
        readonly alignItems: "center";
    };
};
export declare const tint: {
    readonly accent: {};
};
export declare function interactive(isInteractiveOrInteractiveCursorType: ViewProps["cursor"] | boolean, { props }: VariantSpreadExtras<any>): {
    cursor: string;
    pressStyle: {
        transform: {
            scale: number;
        }[];
    };
    disabledStyle: {
        cursor: string;
        opacity: string;
        transform: {
            scale: number;
        }[];
    };
} | {
    readonly cursor: import("csstype").Property.Cursor;
    readonly disabledStyle: {
        readonly cursor: "not-allowed";
        readonly opacity: "$opacity.disabled";
        transform?: undefined;
    };
    readonly pressStyle?: undefined;
} | null;
export declare const layer: {
    readonly surface: {
        readonly backgroundColor: "$bg-surface";
    };
    readonly highlight: {
        readonly backgroundColor: "$bg-highlight";
    };
    readonly "highlight-accent": {
        readonly backgroundColor: "$bg-highlight-accent";
    };
    readonly lowered: {
        readonly backgroundColor: "$bg-lowered";
    };
    readonly translucent: {
        readonly backgroundColor: "$bg-translucent";
    };
};
export declare const shadow: {
    readonly none: {
        readonly boxShadow: "none";
        readonly elevationAndroid: 0;
    };
    readonly s: {
        readonly boxShadow: "inset 0 1px 2px #ffffff40, 0 1px 2px #00000040, 0 2px 4px #00000025";
        readonly elevationAndroid: 2;
    };
    readonly m: {
        readonly boxShadow: "inset 0 1px 2px #ffffff40, 0 2px 4px #00000040, 0 4px 8px #00000025";
        readonly elevationAndroid: 4;
    };
    readonly l: {
        readonly boxShadow: "inset 0 1px 2px #ffffff40, 0 4px 6px #00000040, 0 6px 10px #00000025";
        readonly elevationAndroid: 6;
    };
    readonly lowered: {
        readonly boxShadow: "inset 0 1px 2px #00000040, inset 0 -2px 2px #ffffff15";
    };
};
export declare const size: (val: number) => {
    width: number;
    height: number;
};
export declare const withBorder: (val: SizeTokens, { props }: VariantSpreadExtras<any>) => {
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly disabledStyle?: undefined;
    readonly borderWidth: SizeTokens;
} | {
    readonly shadowColor: `$${string}.shadowColor`;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly pressStyle?: undefined;
    readonly disabledStyle?: undefined;
    readonly borderWidth: SizeTokens;
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
    readonly borderWidth: SizeTokens;
} | {
    readonly hoverStyle: {
        readonly [name]: `$${string}.backgroundColor:hover` | `$${string}.borderColor:hover`;
    };
    readonly focusStyle: {
        readonly [name]: `$${string}.backgroundColor:focus` | `$${string}.borderColor:focus`;
    };
    readonly pressStyle: {
        readonly [name]: `$${string}.backgroundColor:press` | `$${string}.borderColor:press`;
    };
    readonly disabledStyle: {
        readonly [name]: `$${string}.backgroundColor:disabled` | `$${string}.borderColor:disabled`;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
    readonly borderWidth: SizeTokens;
} | {
    readonly borderColor: string;
    readonly borderWidth: SizeTokens;
};
export declare const withFocusVisibleOutline: (val: boolean, { props }: VariantSpreadExtras<any>) => {
    readonly disabledStyle: {
        readonly outlineWidth: 0;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly pressStyle?: undefined;
} | {
    readonly disabledStyle: {
        readonly outlineWidth: 0;
    };
    readonly shadowColor: `$${string}.shadowColor`;
    readonly focusVisibleStyle?: undefined;
    readonly hoverStyle?: undefined;
    readonly focusStyle?: undefined;
    readonly pressStyle?: undefined;
} | {
    readonly disabledStyle: {
        readonly outlineWidth: 0;
    };
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
} | {
    readonly disabledStyle: {
        readonly outlineWidth: 0;
    };
    readonly hoverStyle: {
        readonly [name]: `$${string}.backgroundColor:hover` | `$${string}.borderColor:hover`;
    };
    readonly focusStyle: {
        readonly [name]: `$${string}.backgroundColor:focus` | `$${string}.borderColor:focus`;
    };
    readonly pressStyle: {
        readonly [name]: `$${string}.backgroundColor:press` | `$${string}.borderColor:press`;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
} | {
    readonly disabledStyle: {
        readonly outlineWidth: 0;
    };
    readonly outlineColor: string;
} | null;
export declare const withBackground: (val: "highlight" | "interactive" | "surface", { props }: VariantSpreadExtras<any>) => {
    readonly [name]: `$${string}.backgroundColor:disabled` | `$${string}.borderColor:disabled` | `$${string}.outlineColor:disabled` | `$${string}.shadowColor:disabled`;
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
    readonly [name]: string;
    readonly hoverStyle: {
        readonly [name]: `$${string}.backgroundColor:hover` | `$${string}.borderColor:hover`;
    };
    readonly focusStyle: {
        readonly [name]: `$${string}.backgroundColor:focus` | `$${string}.borderColor:focus`;
    };
    readonly pressStyle: {
        readonly [name]: `$${string}.backgroundColor:press` | `$${string}.borderColor:press`;
    };
    readonly disabledStyle: {
        readonly [name]: `$${string}.backgroundColor:disabled` | `$${string}.borderColor:disabled`;
    };
    readonly shadowColor?: undefined;
    readonly focusVisibleStyle?: undefined;
} | {
    readonly backgroundColor: "$bg-surface" | "$bg-highlight";
};
//# sourceMappingURL=variants.d.ts.map