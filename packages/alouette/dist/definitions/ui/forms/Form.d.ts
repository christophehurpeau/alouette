import type { ReactNode } from "react";
import { type Control, type DefaultValues, type FieldValues, type SubmitHandler, type UseFormProps } from "react-hook-form";
export declare class FormValidationError extends Error {
    constructor();
}
export interface FormProps<TFieldValues extends FieldValues> {
    defaultValues: DefaultValues<TFieldValues>;
    mode?: UseFormProps<TFieldValues>["mode"];
    onSubmit: SubmitHandler<TFieldValues>;
    onSubmitError?: (error: unknown) => void;
    render: (params: {
        control: Control<TFieldValues>;
        submit: () => Promise<void>;
    }) => ReactNode;
}
/**
 * Owns the react-hook-form instance and hands its `control` to `render`, so
 * every field below infers TFieldValues from the control it is given and its
 * own value type from `name` — no type argument per field. submit() rejects
 * with FormValidationError when fields are invalid (nothing was submitted), so
 * FormSubmitButton can tell that apart from a genuine onSubmit failure.
 * Without `onSubmitError`, an exception thrown from `onSubmit` is left to
 * propagate as a genuine unhandled rejection rather than being silently
 * logged — FormSubmitButton (built on ActionButton) consumes it instead to
 * drive its own loading/success/failed state.
 */
export declare function Form<TFieldValues extends FieldValues>({ defaultValues, mode, onSubmit, onSubmitError, render, }: FormProps<TFieldValues>): ReactNode;
//# sourceMappingURL=Form.d.ts.map