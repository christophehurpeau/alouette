import { type ReactNode } from "react";
import type { Control, FieldValues } from "react-hook-form";
import type { Accent } from "../../core/AlouetteConfig";
import { type ModalProps } from "../containers/Modal";
import { type FormProps } from "./Form";
/**
 * The editor half of the public props of a component pairing a read-only
 * display with a modal form (FormEditableItem, FormEditableSurface).
 */
export interface FormEditorProps<TFieldValues extends FieldValues> extends Omit<FormProps<TFieldValues>, "onSubmitError" | "render"> {
    /** Heading of the editor modal. Defaults to the display's own heading. */
    title?: string;
    size?: ModalProps["size"];
    closeButtonAriaLabel?: string;
    cancelLabel: string;
    submitLabel: string;
    /** Forwarded to FormSubmitButton — see its errorToMessage doc. */
    submitErrorToMessage: (error: unknown) => string;
    /** The fields, rendered as the modal body, bound to the modal Form's own control. */
    render: (params: {
        control: Control<TFieldValues>;
    }) => ReactNode;
}
interface UseFormEditorModalParams<TFieldValues extends FieldValues> extends FormEditorProps<TFieldValues> {
    title: string;
    accent?: Accent;
}
export interface FormEditorModal {
    open: () => void;
    /** The mounted editor, or null while closed. Render it under the display. */
    editor: ReactNode;
}
/**
 * A modal owning its own Form, mounted only while editing, so it reseeds from
 * `defaultValues` on every open and cancelling is a plain unmount — the
 * surrounding screen's state is never touched by an abandoned edit, and nothing
 * has to be snapshotted and restored. The fields come through `render`, not
 * children, because they must bind to that inner Form's `control` rather than
 * the screen's.
 */
export declare function useFormEditorModal<TFieldValues extends FieldValues>({ title, size, accent, closeButtonAriaLabel, cancelLabel, submitLabel, submitErrorToMessage, defaultValues, mode, onSubmit, render, }: UseFormEditorModalParams<TFieldValues>): FormEditorModal;
export {};
//# sourceMappingURL=useFormEditorModal.d.ts.map