import type { ReactNode, Ref } from "react";
import type { View as RNView } from "react-native";
import type { SVGIconElement } from "../primitives/Icon";
import { type PressableBoxProps } from "./PressableBox";
export interface IconButtonProps extends Omit<PressableBoxProps, "children"> {
    /**
     * Forwarded to the underlying `PressableBox`, so the button can anchor a
     * `Popover` or a `Menu`. React 19 carries it in with the other props.
     */
    ref?: Ref<RNView>;
    icon: SVGIconElement;
    /** Replaces `icon` while the button is hovered, focused or pressed. */
    activeIcon?: SVGIconElement;
    /** Preset size token, or any number for a custom diameter (px). */
    size?: number | "md" | "sm";
    /** When "fill", the icon takes 80% of the button; default uses 50%. */
    iconSize?: "fill";
    "aria-label": string;
}
export declare function IconButton({ icon, activeIcon, disabled, size, iconSize, variant, className, forceStyle, ...pressableProps }: IconButtonProps): ReactNode;
//# sourceMappingURL=IconButton.d.ts.map