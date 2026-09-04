import { type ReactNode, type Ref } from "react";
import type { View as RNView } from "react-native";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type ExternalOpenLinkBehavior } from "../../expo/ExternalLink.shared";
import { type SVGIconElement } from "../primitives/Icon";
import { type PressableBoxProps } from "./PressableBox";
export declare const buttonHeight: {
    readonly sm: 38;
    readonly md: 44;
};
declare const buttonVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            frame: string;
            text: string;
        };
        md: {
            frame: string;
            text: string;
        };
    };
    variant: {
        contained: {
            text: string;
        };
        outlined: {
            text: string;
        };
        ghost: {
            text: string;
        };
        soft: {
            text: string;
        };
    };
    disabled: {
        true: {};
        false: {};
    };
    dimmed: {
        true: {
            text: string;
            icon: string;
        };
        false: {};
    };
}, {
    frame: string;
    text: string;
    icon: string;
    terminalIcon: string;
    overlayIconContainer: string;
}, undefined, {
    size: {
        sm: {
            frame: string;
            text: string;
        };
        md: {
            frame: string;
            text: string;
        };
    };
    variant: {
        contained: {
            text: string;
        };
        outlined: {
            text: string;
        };
        ghost: {
            text: string;
        };
        soft: {
            text: string;
        };
    };
    disabled: {
        true: {};
        false: {};
    };
    dimmed: {
        true: {
            text: string;
            icon: string;
        };
        false: {};
    };
}, {
    frame: string;
    text: string;
    icon: string;
    terminalIcon: string;
    overlayIconContainer: string;
}, import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            frame: string;
            text: string;
        };
        md: {
            frame: string;
            text: string;
        };
    };
    variant: {
        contained: {
            text: string;
        };
        outlined: {
            text: string;
        };
        ghost: {
            text: string;
        };
        soft: {
            text: string;
        };
    };
    disabled: {
        true: {};
        false: {};
    };
    dimmed: {
        true: {
            text: string;
            icon: string;
        };
        false: {};
    };
}, {
    frame: string;
    text: string;
    icon: string;
    terminalIcon: string;
    overlayIconContainer: string;
}, undefined, unknown, unknown, undefined>>;
type ButtonSizeProps = Pick<VariantProps<typeof buttonVariants>, "size">;
export type ButtonState = "failed" | "loading" | "success";
export interface ButtonProps extends Omit<PressableBoxProps, "children">, ButtonSizeProps {
    icon?: SVGIconElement;
    accent?: Accent;
    text: ReactNode;
    state?: ButtonState;
    /**
     * Forwarded to the underlying `PressableBox`, so the button can anchor a
     * `Popover` or a `Menu`. React 19 carries it in with the other props.
     */
    ref?: Ref<RNView>;
}
export declare function Button({ icon, text, disabled, state, accent, variant, size, className, ...pressableProps }: ButtonProps): ReactNode;
export interface ExternalLinkButtonProps extends ButtonProps {
    href: string;
    /** How the link opens. Defaults to an in-app browser sheet / a new tab. */
    openLinkBehavior?: ExternalOpenLinkBehavior;
}
export declare function ExternalLinkButton({ href, openLinkBehavior, onPress, ...buttonProps }: ExternalLinkButtonProps): ReactNode;
export interface InternalLinkButtonProps extends ButtonProps {
    href: string;
}
export declare function InternalLinkButton({ href: _href, ...buttonProps }: InternalLinkButtonProps): ReactNode;
export {};
//# sourceMappingURL=Button.d.ts.map