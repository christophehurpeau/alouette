import type { ReactNode } from "react";
import { type SegmentedVariant, type SelectionGroupProps } from "../selection/SelectionContext";
export interface TabsProps extends SelectionGroupProps {
    "aria-label"?: string;
    /**
     * `icon` renders the tabs as square icon-only chips in a pill-shaped bar;
     * each tab's `label` stays its accessible name, so a tab must carry an
     * `icon`.
     */
    variant?: SegmentedVariant;
}
/** Segmented switch between views rendered on the same screen. */
export declare function Tabs({ value, defaultValue, onValueChange, accent, disabled, variant, children, ...props }: TabsProps): ReactNode;
//# sourceMappingURL=Tabs.d.ts.map