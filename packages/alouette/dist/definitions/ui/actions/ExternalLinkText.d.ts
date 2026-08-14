import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type ExternalOpenLinkBehavior } from "../../expo/ExternalLink.shared";
import { type InteractiveBoxProps } from "../containers/Box";
import { type SVGIconElement } from "../primitives/Icon";
declare const externalLinkTextVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            text: string;
        };
        md: {
            text: string;
        };
    };
    disabled: {
        true: {
            text: string;
            icon: string;
        };
        false: {
            text: string;
            icon: string;
        };
    };
}, {
    frame: string;
    text: string;
    icon: string;
}, undefined, {
    size: {
        sm: {
            text: string;
        };
        md: {
            text: string;
        };
    };
    disabled: {
        true: {
            text: string;
            icon: string;
        };
        false: {
            text: string;
            icon: string;
        };
    };
}, {
    frame: string;
    text: string;
    icon: string;
}, import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            text: string;
        };
        md: {
            text: string;
        };
    };
    disabled: {
        true: {
            text: string;
            icon: string;
        };
        false: {
            text: string;
            icon: string;
        };
    };
}, {
    frame: string;
    text: string;
    icon: string;
}, undefined, unknown, unknown, undefined>>;
type ExternalLinkTextSizeProps = Pick<VariantProps<typeof externalLinkTextVariants>, "size">;
export interface ExternalLinkTextProps extends Omit<InteractiveBoxProps, "children">, ExternalLinkTextSizeProps {
    href: string;
    /** How the link opens. Defaults to an in-app browser sheet / a new tab. */
    openLinkBehavior?: ExternalOpenLinkBehavior;
    text: ReactNode;
    /** Leading affordance icon. Defaults to the external-link arrow. */
    icon?: SVGIconElement;
    accent?: Accent;
}
/**
 * Inline text link to an external destination — the lightweight alternative to
 * `ExternalLinkButton` when the link is part of a text flow rather than a call
 * to action.
 */
export declare function ExternalLinkText({ href, openLinkBehavior, text, icon, accent, size, disabled, className, onPress, ...pressableProps }: ExternalLinkTextProps): ReactNode;
export {};
//# sourceMappingURL=ExternalLinkText.d.ts.map