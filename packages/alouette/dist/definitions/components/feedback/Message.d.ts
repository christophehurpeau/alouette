import type { ComponentProps, ReactNode } from "react";
export declare const MessageFrame: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/core").StackStyleBase, {
    internalForcedPseudoState?: import("../primitives/createVariants").InternalPseudoState | undefined;
    withBorder?: boolean | import("@tamagui/core").SizeTokens | undefined;
    size?: number | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    withBackground?: boolean | undefined;
    circular?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/core").StaticConfigPublic>;
export declare const MessageText: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/core").TextStylePropsBase, {
    size?: "sm" | "md" | "xs" | "xl" | "lg" | undefined;
    family?: "body" | "heading" | undefined;
    centered?: boolean | undefined;
    contrast?: boolean | undefined;
    weight?: "bold" | "black" | "regular" | undefined;
}, import("@tamagui/core").StaticConfigPublic>;
export interface MessageProps {
    theme: NonNullable<ComponentProps<typeof MessageFrame>["theme"]>;
    children?: ReactNode;
    textCentered?: boolean;
    onDismiss?: () => void;
}
export declare function Message({ theme, textCentered, children, onDismiss, }: MessageProps): ReactNode;
//# sourceMappingURL=Message.d.ts.map