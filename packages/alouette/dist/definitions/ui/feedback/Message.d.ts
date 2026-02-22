import type { ReactNode } from "react";
import type { Except } from "type-fest";
import type { SurfaceProps } from "../containers/Surface";
import type { IconProps } from "../primitives/Icon";
export declare const MessageFrame: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, unknown, import("@tamagui/web").TamaguiComponentPropsBaseBase & SurfaceProps, import("@tamagui/web").StackStyleBase, {
    size?: "lg" | "md" | "sm" | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export declare const MessageText: import("@tamagui/web").TamaguiComponent<import("@tamagui/web").TamaDefer, unknown, import("@tamagui/web").TamaguiComponentPropsBaseBase & import("../..").TextProps, import("@tamagui/web").StackStyleBase, {}, import("@tamagui/web").StaticConfigPublic>;
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