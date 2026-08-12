import type { Provider, ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
export interface SelectionContextValue {
    value: string | undefined;
    onSelect: (value: string) => void;
    disabled?: boolean;
}
export interface SelectionGroupProps {
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
interface SelectionContext {
    SelectionContextProvider: Provider<SelectionContextValue | undefined>;
    useSelection: () => SelectionContextValue;
}
/** One context per group family, so a misplaced child gets a precise error. */
export declare function createSelectionContext(missingProviderMessage: string): SelectionContext;
export type SelectionValueProps = Pick<SelectionGroupProps, "defaultValue" | "disabled" | "onValueChange" | "value">;
export declare function useSelectionValue({ value: controlledValue, defaultValue, onValueChange, disabled, }: SelectionValueProps): SelectionContextValue;
export {};
//# sourceMappingURL=SelectionContext.d.ts.map