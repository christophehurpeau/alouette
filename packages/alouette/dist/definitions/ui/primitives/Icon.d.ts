import { type ReactElement, type ReactNode, type SVGProps } from "react";
export type SVGIconElement = ReactElement<SVGProps<SVGSVGElement>>;
declare const TINT_TO_VAR: {
    readonly sharp: "sharp";
    readonly muted: "muted";
    readonly accent: "accent";
    readonly "accent-muted": "accent-muted";
    readonly onAccent: "on-accent";
    readonly "onAccent-muted": "on-accent-muted";
};
export type IconTint = keyof typeof TINT_TO_VAR;
export interface IconProps {
    icon: SVGIconElement;
    /** Square size in px. Defaults to 20. */
    size?: number;
    tint?: IconTint;
    /** Renders in the disabled-text colour instead of the active tint. */
    disabled?: boolean;
    /** When disabled, use the sharp disabled colour rather than the muted one. */
    disabledSharp?: boolean;
}
export declare function Icon({ icon, size, tint, disabled, disabledSharp, }: IconProps): ReactNode;
export {};
//# sourceMappingURL=Icon.d.ts.map