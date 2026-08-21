import type { ReactNode } from "react";
import { type SelectionGroupProps } from "../selection/SelectionContext";
export interface RadioButtonGroupProps extends SelectionGroupProps {
    /** Tightens the horizontal padding so many options fit on one row. */
    compact?: boolean;
}
export declare function RadioButtonGroup({ value, defaultValue, onValueChange, accent, disabled, compact, children, ...props }: RadioButtonGroupProps): ReactNode;
//# sourceMappingURL=RadioButtonGroup.d.ts.map