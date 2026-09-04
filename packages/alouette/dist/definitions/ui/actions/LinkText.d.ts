import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type InteractiveBoxProps } from "../containers/Box";
import { type SVGIconElement } from "../primitives/Icon";
export declare const linkTextVariants: import("tailwind-variants").TVReturnType<{
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
export type LinkTextSizeProps = Pick<VariantProps<typeof linkTextVariants>, "size">;
/** Icon size matching a link's text size. */
export declare function linkTextIconSize(size: LinkTextSizeProps["size"]): number;
export interface LinkTextProps extends Omit<InteractiveBoxProps, "children">, LinkTextSizeProps {
    /**
     * In-app destination. react-native-web renders a real `<a href>`, which
     * navigates on its own; native ignores it, so a native app routes from
     * `onPress` — expo Router's `<Link asChild>` injects both, and a handler that
     * navigates on web must call `event.preventDefault()`, as routers do.
     */
    href?: string;
    text: ReactNode;
    /** Leading icon, tinted with the label. */
    icon?: SVGIconElement;
    accent?: Accent;
}
/**
 * Text link to an in-app destination — the lightweight alternative to a Button
 * when the link is part of a text flow rather than a call to action. Use
 * `ExternalLinkText` for a destination outside the app, and a `NavBar` for the
 * primary navigation between screens.
 */
export declare function LinkText({ href, text, icon, accent, size, disabled, className, ...pressableProps }: LinkTextProps): ReactNode;
//# sourceMappingURL=LinkText.d.ts.map