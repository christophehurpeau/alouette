import { type ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { type ModalProps } from "../containers/Modal";
import { type EditableItemProps } from "../data/EditableItem";
import { type FormProps } from "./Form";
export interface FormEditableItemProps<TFieldValues extends FieldValues> extends Pick<EditableItemProps, "accent" | "details" | "disabled" | "editAriaLabel" | "editIcon" | "label" | "summary" | "variant">, Omit<FormProps<TFieldValues>, "onSubmitError" | "render"> {
    /** Heading of the editor modal. Defaults to `label`. */
    title?: string;
    size?: ModalProps["size"];
    closeButtonAriaLabel?: string;
    cancelLabel: string;
    submitLabel: string;
    /** Forwarded to FormSubmitButton — see its errorToMessage doc. */
    submitErrorToMessage: (error: unknown) => string;
    /** The fields, rendered as the modal body. */
    children: ReactNode;
}
/**
 * An EditableItem whose editor is a modal owning its own Form. The Form is
 * mounted only while editing, so it reseeds from `defaultValues` on every
 * open and cancelling is a plain unmount — the surrounding screen's state is
 * never touched by an abandoned edit, and nothing has to be snapshotted and
 * restored.
 */
export declare function FormEditableItem<TFieldValues extends FieldValues>({ label, summary, details, editAriaLabel, editIcon, variant, accent, disabled, title, size, closeButtonAriaLabel, cancelLabel, submitLabel, submitErrorToMessage, defaultValues, mode, onSubmit, children, }: FormEditableItemProps<TFieldValues>): ReactNode;
//# sourceMappingURL=FormEditableItem.d.ts.map