import type { ReactNode } from "react";
import { type SelectionGroupProps } from "../selection/SelectionContext";
export interface TabsProps extends SelectionGroupProps {
    "aria-label"?: string;
}
/** Segmented switch between views rendered on the same screen. */
export declare function Tabs({ value, defaultValue, onValueChange, accent, disabled, children, ...props }: TabsProps): ReactNode;
//# sourceMappingURL=Tabs.d.ts.map