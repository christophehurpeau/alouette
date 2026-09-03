import type { ReactNode } from "react";
import { type SurfaceProps } from "../containers/Surface";
import type { SegmentedOrientation } from "./SelectionContext";
export interface SegmentedBarProps extends Omit<SurfaceProps, "role" | "shadow" | "size" | "variant"> {
    role: "navigation" | "radiogroup" | "tablist";
    orientation?: SegmentedOrientation;
}
/**
 * Lowered track shared by every segmented group (RadioButtonGroup, NavBar, Tabs).
 * It is a 44px Surface with no vertical padding, so each item pressable fills the
 * full height (a 44px tap target) while rendering a shorter visible chip inside it.
 */
export declare function SegmentedBar({ orientation, className, ...props }: SegmentedBarProps): ReactNode;
//# sourceMappingURL=SegmentedBar.d.ts.map