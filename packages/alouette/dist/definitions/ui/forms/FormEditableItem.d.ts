import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { type EditableItemProps } from "../data/EditableItem";
import { type FormEditorProps } from "./useFormEditorModal";
export interface FormEditableItemProps<TFieldValues extends FieldValues> extends Pick<EditableItemProps, "accent" | "details" | "disabled" | "editAriaLabel" | "editIcon" | "label" | "summary" | "variant">, FormEditorProps<TFieldValues> {
}
/**
 * An EditableItem whose editor is a modal owning its own Form — see
 * useFormEditorModal for how the edit is kept out of the screen's state.
 * Reach for FormEditableSurface instead when the value is a block of several
 * lines rather than a summary that fits beside the label.
 */
export declare function FormEditableItem<TFieldValues extends FieldValues>({ label, summary, details, editAriaLabel, editIcon, variant, accent, disabled, title, ...editorProps }: FormEditableItemProps<TFieldValues>): ReactNode;
//# sourceMappingURL=FormEditableItem.d.ts.map