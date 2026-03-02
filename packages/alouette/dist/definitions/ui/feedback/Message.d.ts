import type { ReactNode } from "react";
import type { Except } from "type-fest";
import type { SurfaceProps } from "../containers/Surface";
import type { IconProps } from "../primitives/Icon";
export declare const MessageFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps | (import("@tamagui/core").RNTamaguiViewNonStyleProps & void), import("@tamagui/web").StackStyleBase, {
    size?: "lg" | "md" | "sm" | undefined;
    interactive?: boolean | import("csstype").Property.Cursor | undefined;
    tint?: "accent" | undefined;
    center?: boolean | undefined;
    lowered?: boolean | undefined;
    absoluteFill?: boolean | undefined;
    layer?: "highlight" | "surface" | "lowered" | "highlight-accent" | "translucent" | undefined;
    shadow?: "none" | "lowered" | "s" | "m" | "l" | undefined;
    square?: number | undefined;
    withBorder?: import("@tamagui/web").SizeTokens | undefined;
    withFocusVisibleOutline?: boolean | undefined;
    withBackground?: "interactive" | "highlight" | "surface" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export declare const MessageText: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, import("@tamagui/web").TamaguiTextElement, import("@tamagui/core").RNTamaguiTextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
    size?: import("@tamagui/web").FontSizeTokens | undefined;
    tint?: "accent" | "muted" | "onAccent" | "sharp" | undefined;
    inherit?: boolean | undefined;
    family?: "$body" | "$heading" | "$body-monospace" | undefined;
    disabledSharp?: boolean | undefined;
    weight?: "$regular" | "$bold" | "$extraBold" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
interface MessageBaseProps {
    theme: NonNullable<SurfaceProps["theme"]>;
    size?: NonNullable<SurfaceProps["size"]>;
    icon: IconProps["icon"];
    children?: ReactNode;
}
interface MessagePropsWithDismiss extends MessageBaseProps {
    onDismiss: () => void;
    dismissIconAriaLabel: string;
}
interface MessagePropsWithoutDismiss extends MessageBaseProps {
    onDismiss?: undefined;
    dismissIconAriaLabel?: undefined;
}
export type MessageProps = MessagePropsWithDismiss | MessagePropsWithoutDismiss;
export declare function Message({ icon, size, theme, children, onDismiss, dismissIconAriaLabel, }: MessageProps): ReactNode;
type SemanticMessageProps = Except<MessageProps, "icon" | "theme">;
export declare function InfoMessage(props: SemanticMessageProps): ReactNode;
export declare function ConfirmationMessage(props: SemanticMessageProps): ReactNode;
export declare function WarningMessage(props: SemanticMessageProps): ReactNode;
export {};
//# sourceMappingURL=Message.d.ts.map