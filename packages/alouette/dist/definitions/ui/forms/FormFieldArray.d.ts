import { type ReactNode } from "react";
import { type Control, type FieldPath, type FieldPathValue, type FieldValues } from "react-hook-form";
/**
 * Every path in the form whose value is an array. react-hook-form's own
 * ArrayPath deliberately excludes arrays of primitives, which useFieldArray
 * nonetheless drives fine — a `string[]` field would otherwise resolve to
 * `never` and force a cast at the call site.
 */
export type FormArrayPath<TFieldValues extends FieldValues> = {
    [TPath in FieldPath<TFieldValues>]: NonNullable<FieldPathValue<TFieldValues, TPath>> extends readonly unknown[] ? TPath : never;
}[FieldPath<TFieldValues>];
/** The item type of the array `TName` points at. */
export type FormArrayItem<TFieldValues extends FieldValues, TName extends FormArrayPath<TFieldValues>> = NonNullable<FieldPathValue<TFieldValues, TName>> extends readonly (infer TItem)[] ? TItem : never;
export interface FormFieldArrayProps<TFieldValues extends FieldValues, TName extends FormArrayPath<TFieldValues>> {
    /** From <Form>'s render params. Infers the form type for `name`. */
    control: Control<TFieldValues>;
    name: TName;
    label: string;
    /** Muted helper text shown under the label (e.g. a minimum-count hint). */
    details?: ReactNode;
    /** Value appended when a new item is added. */
    emptyValue: FormArrayItem<TFieldValues, TName>;
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
        control: Control<TFieldValues>;
        /** Path prefix for this item, e.g. "guests.0". Build sub-paths as `${name}.value`. */
        name: `${TName}.${number}`;
        index: number;
        /** Per-item base accessible name (`${label} ${index + 1}`), e.g. "Guests 1". */
        label: string;
    }) => ReactNode;
}
/**
 * A repeatable list of fields backed by react-hook-form's useFieldArray, taking
 * `control` from <Form>'s render params. FormFieldArray owns only the array
 * label and the add/remove buttons — it is agnostic about what an item contains,
 * including any per-item framing (a caller can wrap multi-field items in a
 * Surface). Each item's inputs (their values, labels and error messages) are the
 * caller's job: `render` receives `control` and the item's path prefix, typed as
 * `${name}.${number}` so `${name}.value` / `${name}.firstName` compose into a
 * real field path for an object item, or `name` binds a raw value directly.
 */
export declare function FormFieldArray<TFieldValues extends FieldValues, TName extends FormArrayPath<TFieldValues>>({ control, name, label, details, emptyValue, minSize, addLabel, disableAdd, removeLabel, render, }: FormFieldArrayProps<TFieldValues, TName>): ReactNode;
//# sourceMappingURL=FormFieldArray.d.ts.map