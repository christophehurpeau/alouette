import type { ReactNode } from "react";
import { type SegmentedVariant, type SelectionGroupProps } from "../selection/SelectionContext";
export interface RadioButtonGroupProps extends SelectionGroupProps {
    /** Tightens the horizontal padding so many options fit on one row. */
    compact?: boolean;
    /**
     * `icon` renders the options as square icon-only chips in a pill-shaped bar;
     * each option's `label` stays its accessible name, so an option must carry an
     * `icon`.
     */
    variant?: SegmentedVariant;
}
export declare function RadioButtonGroup({ value, defaultValue, onValueChange, accent, disabled, variant, compact, children, ...props }: RadioButtonGroupProps): ReactNode;
//# sourceMappingURL=RadioButtonGroup.d.ts.map