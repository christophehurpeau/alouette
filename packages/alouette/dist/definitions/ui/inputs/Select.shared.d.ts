import { type ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface SelectProps {
    options: SelectOption[];
    /** Controlled selected value. */
    value?: string;
    /** Initial value for uncontrolled usage. */
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    accent?: Accent;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    testID?: string;
}
export declare function useControllableValue(controlled: string | undefined, defaultValue: string | undefined, onValueChange?: (value: string) => void): readonly [string | undefined, (next: string) => void];
export declare const selectTriggerBaseClassName: string;
export interface SelectTriggerContentProps {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}
export declare function SelectTriggerContent({ label, placeholder, disabled, }: SelectTriggerContentProps): ReactNode;
//# sourceMappingURL=Select.shared.d.ts.map