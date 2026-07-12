import type { ReactNode } from "react";
export interface FormSubmitButtonProps {
    label: string;
    onPress: () => Promise<void>;
    /**
     * Maps a submit failure to displayed text. Required rather than
     * defaulted, since a library-provided default could only ever be a
     * hardcoded English string — not translatable. Check
     * `error instanceof FormValidationError` to render a "fix the errors
     * above" case distinctly from a genuine onSubmit failure.
     */
    errorToMessage: (error: unknown) => string;
}
/**
 * Submit button for a <Form>. Built on ActionButton, so submission gets the
 * same loading/success/failed lifecycle and inline error message as any
 * other async action in the app, rather than a plain boolean isSubmitting.
 */
export declare function FormSubmitButton({ label, onPress, errorToMessage, }: FormSubmitButtonProps): ReactNode;
//# sourceMappingURL=FormSubmitButton.d.ts.map