import type { ComponentProps, ReactNode } from "react";
export declare const MessageFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    size?: number | undefined;
    internalForcedPseudoState?: import("../primitives/createVariants.ts").InternalPseudoState | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    withBorder?: boolean | import("@tamagui/web").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export declare const MessageText: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
    size?: "xl" | "lg" | "md" | "sm" | "xs" | undefined;
    family?: "heading" | "body" | undefined;
    centered?: boolean | undefined;
    contrast?: boolean | undefined;
    weight?: "regular" | "bold" | "black" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export interface MessageProps {
    theme: NonNullable<ComponentProps<typeof MessageFrame>["theme"]>;
    children?: ReactNode;
    textCentered?: boolean;
    onDismiss?: () => void;
}
export declare function Message({ theme, textCentered, children, onDismiss, }: MessageProps): ReactNode;
//# sourceMappingURL=Message.d.ts.map