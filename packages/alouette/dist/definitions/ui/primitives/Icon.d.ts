import { type ReactElement, type ReactNode, type SVGProps } from "react";
import type { ColorClassName } from "../../core/useColorToken";
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
    className?: ColorClassName;
}
export declare function Icon({ icon, size, className, }: IconProps): ReactNode;
//# sourceMappingURL=Icon.d.ts.map