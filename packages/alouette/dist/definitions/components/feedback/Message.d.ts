import type { ComponentProps, ReactNode } from "react";
export declare const MessageFrame: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/core").StackStyleBase, {
    size?: number | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    withBorder?: boolean | import("@tamagui/core").SizeTokens | undefined;
    withBackground?: boolean | undefined;
    withElevation?: boolean | undefined;
    circular?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/core").StaticConfigPublic>;
export declare const MessageText: import("@tamagui/core").TamaguiComponent<import("@tamagui/core").TamaDefer, import("@tamagui/core").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/core").TextStylePropsBase, {
    size?: import("@tamagui/core").FontSizeTokens | undefined;
    inherit?: boolean | undefined;
    family?: "$body" | "$heading" | undefined;
    centered?: boolean | undefined;
    contrast?: boolean | undefined;
    weight?: "$regular" | "$bold" | "$black" | undefined;
    colored?: boolean | undefined;
}, import("@tamagui/core").StaticConfigPublic>;
export interface MessageProps {
    theme: NonNullable<ComponentProps<typeof MessageFrame>["theme"]>;
    children?: ReactNode;
    textCentered?: boolean;
    onDismiss?: () => void;
}
export declare function Message({ theme, textCentered, children, onDismiss, }: MessageProps): ReactNode;
//# sourceMappingURL=Message.d.ts.map