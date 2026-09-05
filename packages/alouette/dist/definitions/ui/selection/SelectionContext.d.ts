import type { Provider, ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
/** Row of chips (the default) or a column of full-width ones. */
export type SegmentedOrientation = "horizontal" | "vertical";
/**
 * `icon` is a pill-shaped bar of square icon-only chips: the item renders its
 * `icon` alone and its `label` stays as the accessible name.
 */
export type SegmentedVariant = "icon" | "segmented";
export interface SelectionContextValue {
    value: string | undefined;
    onSelect: (value: string) => void;
    disabled?: boolean;
    /** Tighter horizontal padding, for a group holding many options. */
    compact?: boolean;
    orientation?: SegmentedOrientation;
    /** The bar fills its container and its items share that width. */
    stretch?: boolean;
    variant?: SegmentedVariant;
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
export interface SelectionValueProps extends Pick<SelectionGroupProps, "defaultValue" | "disabled" | "onValueChange" | "value"> {
    compact?: boolean;
    orientation?: SegmentedOrientation;
    stretch?: boolean;
    variant?: SegmentedVariant;
}
export declare function useSelectionValue({ value: controlledValue, defaultValue, onValueChange, disabled, compact, orientation, stretch, variant, }: SelectionValueProps): SelectionContextValue;
export {};
//# sourceMappingURL=SelectionContext.d.ts.map