import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { type FormProps } from "./Form";
export interface SimpleVFormProps<TFieldValues extends FieldValues> extends Omit<FormProps<TFieldValues>, "render"> {
    submitLabel: string;
    /** Forwarded to FormSubmitButton — see its errorToMessage doc. */
    submitErrorToMessage: (error: unknown) => string;
    className?: string;
    render: (params: {
        submit: () => Promise<void>;
    }) => ReactNode;
}
/**
 * Standardizes the common case: a Form laid out as a vertical stack with
 * a trailing FormSubmitButton.
 */
export declare function SimpleVForm<TFieldValues extends FieldValues>({ submitLabel, submitErrorToMessage, className, render, ...formProps }: SimpleVFormProps<TFieldValues>): ReactNode;
//# sourceMappingURL=SimpleVForm.d.ts.map