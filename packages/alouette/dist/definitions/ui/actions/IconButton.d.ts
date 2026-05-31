import type { ReactNode } from "react";
import { type PressableBoxProps } from "../data/PressableBox";
import { type SVGIconElement } from "../primitives/Icon";
export interface IconButtonProps extends Omit<PressableBoxProps, "children"> {
    icon: SVGIconElement;
    /** Preset size token, or any number for a custom diameter (px). */
    size?: number | "md" | "sm";
    /** When "fill", the icon takes 80% of the button; default uses 50%. */
    iconSize?: "fill";
    "aria-label": string;
}
export declare function IconButton({ icon, disabled, size, iconSize, variant, className, ...pressableProps }: IconButtonProps): ReactNode;
//# sourceMappingURL=IconButton.d.ts.map