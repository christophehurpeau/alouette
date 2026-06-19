import { type ReactElement, type ReactNode, type SVGProps } from "react";
export type SVGIconElement = ReactElement<SVGProps<SVGSVGElement>>;
export interface IconProps {
    icon: SVGIconElement;
    /** Square size in px. Defaults to 20. */
    size?: number;
    /**
     * Text-colour className driving the icon tint, e.g. `text-sharp`,
     * `text-muted`, `text-accent`, `text-on-accent`, `text-disabled-muted`.
     * Defaults to `text-sharp`.
     */
    className?: string | "text-accent" | "text-disabled-muted" | "text-disabled" | "text-muted" | "text-on-accent-muted" | "text-on-accent" | "text-sharp";
}
export declare function Icon({ icon, size, className, }: IconProps): ReactNode;
//# sourceMappingURL=Icon.d.ts.map