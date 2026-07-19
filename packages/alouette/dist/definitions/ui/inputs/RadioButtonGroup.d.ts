import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
export interface RadioButtonGroupProps {
    /** Controlled selected value. */
    value?: string;
    /** Initial value for uncontrolled usage. */
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    accent?: Accent;
    disabled?: boolean;
    "aria-labelledby"?: string;
    children: ReactNode;
}
export declare function RadioButtonGroup({ value: controlledValue, defaultValue, onValueChange, accent, disabled, children, ...props }: RadioButtonGroupProps): ReactNode;
//# sourceMappingURL=RadioButtonGroup.d.ts.map