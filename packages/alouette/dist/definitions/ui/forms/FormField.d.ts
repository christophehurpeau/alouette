import type { ReactNode } from "react";
import { type ControllerRenderProps, type FieldError, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form";
export interface FormFieldProps<TFieldValues extends FieldValues> {
    name: FieldPath<TFieldValues>;
    label: string;
    /**
     * Marks the field required and shows FormItem's marker. Pass true for no
     * message, or any other ReactNode to use as the required-field error —
     * unless renderError overrides it — once the field is left empty.
     * react-hook-form's own FieldError.message is always a plain string, so
     * this is the only way to get a richer, i18n'd required message without
     * reaching for renderError.
     */
    required?: ReactNode;
    validate?: RegisterOptions<TFieldValues>["validate"];
    renderError?: (error: FieldError | undefined) => ReactNode;
    render: (params: {
        field: ControllerRenderProps<TFieldValues>;
        labelId: string;
    }) => ReactNode;
}
/**
 * Wires a react-hook-form Controller to FormItem's label/error/layout.
 * Must be used inside <Form>, which provides the control via context.
 * Renders any input via `render` — not tied to a specific input component.
 * The rendered input must attach `field.ref` for pressing the label to
 * focus it, via react-hook-form's own setFocus.
 */
export declare function FormField<TFieldValues extends FieldValues>({ name, label, required, validate, renderError, render, }: FormFieldProps<TFieldValues>): ReactNode;
//# sourceMappingURL=FormField.d.ts.map