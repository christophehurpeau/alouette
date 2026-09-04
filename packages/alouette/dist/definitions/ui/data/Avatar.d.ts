import type { ReactNode } from "react";
import { type VariantProps } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { type SVGIconElement } from "../primitives/Icon";
declare const avatarVariants: import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            frame: string;
            label: string;
        };
        md: {
            frame: string;
            label: string;
        };
        lg: {
            frame: string;
            label: string;
        };
    };
}, {
    frame: string;
    label: string;
}, undefined, {
    size: {
        sm: {
            frame: string;
            label: string;
        };
        md: {
            frame: string;
            label: string;
        };
        lg: {
            frame: string;
            label: string;
        };
    };
}, {
    frame: string;
    label: string;
}, import("tailwind-variants").TVReturnType<{
    size: {
        sm: {
            frame: string;
            label: string;
        };
        md: {
            frame: string;
            label: string;
        };
        lg: {
            frame: string;
            label: string;
        };
    };
}, {
    frame: string;
    label: string;
}, undefined, unknown, unknown, undefined>>;
type AvatarVariantProps = VariantProps<typeof avatarVariants>;
export interface AvatarProps extends AvatarVariantProps {
    /** Rendered as up to two initials, unless {@link icon} replaces them. */
    name?: string;
    icon?: SVGIconElement;
    /** Accent of the disc. Defaults to `brand`. */
    accent?: Accent;
    className?: string;
}
/**
 * Accent disc standing for a person or an account: their initials, or an icon.
 * Display-only — a pressable one is a `PressableBox` wrapped around it.
 */
export declare function Avatar({ name, icon, accent, size, className, }: AvatarProps): ReactNode;
export {};
//# sourceMappingURL=Avatar.d.ts.map