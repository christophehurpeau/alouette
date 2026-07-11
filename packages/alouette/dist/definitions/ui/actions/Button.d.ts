import { type ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type PressableBoxProps } from "../data/PressableBox";
import { type SVGIconElement } from "../primitives/Icon";
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
}
export declare function Button({ icon, text, disabled, state, accent, variant, size, className, ...pressableProps }: ButtonProps): ReactNode;
export interface ExternalLinkButtonProps extends ButtonProps {
    href: string;
}
export declare function ExternalLinkButton({ href, onPress, ...buttonProps }: ExternalLinkButtonProps): ReactNode;
export interface InternalLinkButtonProps extends ButtonProps {
    href: string;
}
export declare function InternalLinkButton({ href: _href, ...buttonProps }: InternalLinkButtonProps): ReactNode;
export {};
//# sourceMappingURL=Button.d.ts.map