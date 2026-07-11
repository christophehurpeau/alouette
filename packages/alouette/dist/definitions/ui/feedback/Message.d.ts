import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Except } from "type-fest";
import type { Accent } from "../../core/AlouetteConfig";
import { type SVGIconElement } from "../primitives/Icon";
declare const messageFrameVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "flex-row items-center bg-highlight-accent overflow-hidden", {
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}, undefined, "flex-row items-center bg-highlight-accent overflow-hidden", unknown, unknown, undefined>>;
type MessageVariantProps = VariantProps<typeof messageFrameVariants>;
type MessageSize = NonNullable<MessageVariantProps["size"]>;
interface MessageBaseProps {
    accent: Accent;
    size?: MessageSize;
    icon: SVGIconElement;
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
export declare function Message({ icon, size, accent, children, onDismiss, dismissIconAriaLabel, }: MessageProps): ReactNode;
type AccentMessageProps = Except<MessageProps, "accent" | "icon">;
export declare function InfoMessage(props: AccentMessageProps): ReactNode;
export declare function ConfirmationMessage(props: AccentMessageProps): ReactNode;
export declare function WarningMessage(props: AccentMessageProps): ReactNode;
export declare function ErrorMessage(props: AccentMessageProps): ReactNode;
export {};
//# sourceMappingURL=Message.d.ts.map