import type { ReactNode } from "react";
import type { AccentScopeProps } from "../containers/AccentScope";
import { type IconProps, type SVGIconElement } from "./Icon";
export interface InteractiveIconProps extends IconProps {
    /**
     * Rendered in place of `icon` while the enclosing pressable group is hovered,
     * focused or pressed, and permanently when `active`. Typically the duotone
     * twin of `icon`.
     */
    activeIcon?: SVGIconElement;
    /**
     * Accent tinting `activeIcon`, so the glyph changes color as well as weight.
     * `none` resets to the base mode's accent under an accented ancestor.
     */
    activeAccent?: AccentScopeProps["accent"];
    /** Persistent active state: the current page, the selected segment. */
    active?: boolean;
    /** A disabled control gives no affordance, so it never swaps. */
    disabled?: boolean;
}
/**
 * Icon that swaps to `activeIcon` on the enclosing pressable's
 * hover/focus/press state. The pressable must carry the `group` class —
 * `PressableBox` and `SegmentedItem` both do.
 */
export declare function InteractiveIcon({ icon, activeIcon, activeAccent, active, disabled, size, className, }: InteractiveIconProps): ReactNode;
//# sourceMappingURL=InteractiveIcon.d.ts.map