import { type ReactNode } from "react";
import { type ArrayPath, type FieldArray, type FieldPath, type FieldValues } from "react-hook-form";
export interface FormFieldArrayProps<TFieldValues extends FieldValues> {
    name: ArrayPath<TFieldValues>;
    label: string;
    /** Muted helper text shown under the label (e.g. a minimum-count hint). */
    details?: ReactNode;
    /** Value appended when a new item is added. */
    emptyValue: FieldArray<TFieldValues, ArrayPath<TFieldValues>>;
    /**
     * Minimum number of items. The array is padded to this length on mount and
     * the leading `minSize` items cannot be removed.
     */
    minSize?: number;
    /** aria-label for the add button. */
    addLabel?: string;
    /** Disables the add button, e.g. while the last item is still empty. */
    disableAdd?: boolean;
    /** aria-label for each remove button, given the item's own label. */
    removeLabel?: (itemLabel: string) => string;
    render: (params: {
        /** Path prefix for this item, e.g. "guests.0". Build sub-paths as `${name}.value`. */
        name: FieldPath<TFieldValues>;
        index: number;
        /** Per-item base accessible name (`${label} ${index + 1}`), e.g. "Guests 1". */
        label: string;
    }) => ReactNode;
}
/**
 * A repeatable list of object fields backed by react-hook-form's useFieldArray.
 * Must be used inside <Form>. FormFieldArray owns only the array label and the
 * add/remove buttons — it is agnostic about what an item contains, including
 * any per-item framing (a caller can wrap multi-field items in a Surface). Each item's inputs (their values, labels and error
 * messages) are the caller's job: `render` receives the item's path prefix
 * (e.g. "guests.0") and composes its own FormField(s), bound to `name` for a
 * raw value or `${name}.value` / `${name}.firstName` for an object item.
 */
export declare function FormFieldArray<TFieldValues extends FieldValues>({ name, label, details, emptyValue, minSize, addLabel, disableAdd, removeLabel, render, }: FormFieldArrayProps<TFieldValues>): ReactNode;
//# sourceMappingURL=FormFieldArray.d.ts.map