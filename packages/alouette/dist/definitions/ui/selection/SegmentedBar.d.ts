import type { ReactNode } from "react";
import { type SurfaceProps } from "../containers/Surface";
export interface SegmentedBarProps extends Omit<SurfaceProps, "role" | "shadow" | "size" | "variant"> {
    role: "navigation" | "radiogroup" | "tablist";
}
/**
 * Lowered track shared by every segmented group (RadioButtonGroup, NavBar, Tabs).
 * It is a 44px Surface with no vertical padding, so each item pressable fills the
 * full height (a 44px tap target) while rendering a shorter visible chip inside it.
 */
export declare function SegmentedBar({ className, ...props }: SegmentedBarProps): ReactNode;
//# sourceMappingURL=SegmentedBar.d.ts.map