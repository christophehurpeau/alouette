import type { ReactNode } from "react";
import { type SelectionGroupProps } from "../selection/SelectionContext";
export interface NavBarProps extends SelectionGroupProps {
    "aria-label"?: string;
}
/**
 * Segmented navigation between destinations. `value` is the current
 * destination — it matches an item's `href`, and is usually owned by the app's
 * router, so pass it controlled.
 */
export declare function NavBar({ value, defaultValue, onValueChange, accent, disabled, children, ...props }: NavBarProps): ReactNode;
//# sourceMappingURL=NavBar.d.ts.map