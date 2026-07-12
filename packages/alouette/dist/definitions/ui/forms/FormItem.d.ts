import { type ReactNode } from "react";
export interface FormItemProps {
    label: string;
    error?: ReactNode;
    /**
     * True when `error` is caused by the field being left empty, as opposed
     * to some other validation failure. An empty required field just needs
     * its star recolored — a second warning icon would be a redundant cue.
     */
    isRequiredError?: boolean;
    /** true shows the default marker; any other ReactNode replaces it. */
    required?: ReactNode;
    /** Called when the label is pressed, so it can focus the input. */
    onLabelPress?: () => void;
    render: (labelId: string) => ReactNode;
}
/**
 * Label, error message and layout for a single form field. Form-library
 * agnostic — pass the input as a render prop so it can wire
 * aria-labelledby to the generated labelId, and onLabelPress so the label
 * can focus it, matching a native <label for> click.
 */
export declare function FormItem({ label, error, isRequiredError, required, onLabelPress, render, }: FormItemProps): ReactNode;
//# sourceMappingURL=FormItem.d.ts.map