import type { ReactElement, ReactNode, SVGProps } from "react";
export type SVGIconElement = ReactElement<SVGProps<SVGSVGElement>>;
export interface IconProps {
    icon: SVGIconElement;
    disabled?: boolean;
    disabledSharp?: boolean;
    tint?: "accent-muted" | "accent" | "muted" | "onAccent-muted" | "onAccent" | "sharp";
    size?: number;
}
export declare function Icon({ icon, size, disabled, disabledSharp, tint, }: IconProps): ReactNode;
//# sourceMappingURL=Icon.d.ts.map