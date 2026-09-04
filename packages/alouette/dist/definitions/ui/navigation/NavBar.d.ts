import type { ReactNode } from "react";
import { type SegmentedOrientation, type SelectionGroupProps } from "../selection/SelectionContext";
export interface NavBarProps extends SelectionGroupProps {
    "aria-label"?: string;
    /**
     * `vertical` stacks the destinations as a sidebar rail, each item spanning
     * the bar's width. The bar is content-width; give it a `className` width to
     * fix the rail.
     */
    orientation?: SegmentedOrientation;
    /**
     * The bar fills the width it is given instead of hugging its destinations,
     * which share it equally — what a stacked `AppHeader` wants for the line it
     * hands to the navigation.
     */
    stretch?: boolean;
    className?: string;
}
/**
 * Segmented navigation between destinations. `value` is the current
 * destination — it matches an item's `href`, and is usually owned by the app's
 * router, so pass it controlled.
 */
export declare function NavBar({ value, defaultValue, onValueChange, accent, disabled, orientation, stretch, children, ...props }: NavBarProps): ReactNode;
//# sourceMappingURL=NavBar.d.ts.map