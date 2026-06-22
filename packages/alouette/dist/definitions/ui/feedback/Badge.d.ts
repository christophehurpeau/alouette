import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type SVGIconElement } from "../primitives/Icon";
declare const badgeVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            frame: string;
            text: string;
            icon: string;
        };
        md: {
            frame: string;
            text: string;
            icon: string;
        };
    };
    variant: {
        solid: {
            frame: string;
            text: string;
            icon: string;
        };
        "solid.enabled": {
            frame: string;
            text: string;
            icon: string;
        };
        outlined: {
            frame: string;
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
            frame: string;
            text: string;
            icon: string;
        };
        md: {
            frame: string;
            text: string;
            icon: string;
        };
    };
    variant: {
        solid: {
            frame: string;
            text: string;
            icon: string;
        };
        "solid.enabled": {
            frame: string;
            text: string;
            icon: string;
        };
        outlined: {
            frame: string;
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
            frame: string;
            text: string;
            icon: string;
        };
        md: {
            frame: string;
            text: string;
            icon: string;
        };
    };
    variant: {
        solid: {
            frame: string;
            text: string;
            icon: string;
        };
        "solid.enabled": {
            frame: string;
            text: string;
            icon: string;
        };
        outlined: {
            frame: string;
            text: string;
            icon: string;
        };
    };
}, {
    frame: string;
    text: string;
    icon: string;
}, undefined, unknown, unknown, undefined>>;
type BadgeVariantProps = VariantProps<typeof badgeVariants>;
type BadgeSize = NonNullable<BadgeVariantProps["size"]>;
export interface BadgeProps {
    accent?: Accent;
    size?: BadgeSize;
    variant?: NonNullable<BadgeVariantProps["variant"]>;
    icon?: SVGIconElement;
    children?: ReactNode;
}
export declare function Badge({ accent, size, variant, icon, children, }: BadgeProps): ReactNode;
export {};
//# sourceMappingURL=Badge.d.ts.map