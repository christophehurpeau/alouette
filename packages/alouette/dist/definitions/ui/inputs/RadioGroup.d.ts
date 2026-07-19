import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
export interface RadioGroupProps {
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
export declare function RadioGroup({ value: controlledValue, defaultValue, onValueChange, accent, disabled, children, ...props }: RadioGroupProps): ReactNode;
//# sourceMappingURL=RadioGroup.d.ts.map