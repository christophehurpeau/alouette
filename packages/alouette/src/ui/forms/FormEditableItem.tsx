import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { EditableItem, type EditableItemProps } from "../data/EditableItem";
import { type FormEditorProps, useFormEditorModal } from "./useFormEditorModal";

export interface FormEditableItemProps<TFieldValues extends FieldValues>
  extends
    Pick<
      EditableItemProps,
      | "accent"
      | "details"
      | "disabled"
      | "editAriaLabel"
      | "editIcon"
      | "label"
      | "summary"
      | "variant"
    >,
    FormEditorProps<TFieldValues> {}

/**
 * An EditableItem whose editor is a modal owning its own Form — see
 * useFormEditorModal for how the edit is kept out of the screen's state.
 * Reach for FormEditableSurface instead when the value is a block of several
 * lines rather than a summary that fits beside the label.
 */
export function FormEditableItem<TFieldValues extends FieldValues>({
  label,
  summary,
  details,
  editAriaLabel,
  editIcon,
  variant,
  accent,
  disabled,
  title,
  ...editorProps
}: FormEditableItemProps<TFieldValues>): ReactNode {
  const { open, editor } = useFormEditorModal<TFieldValues>({
    ...editorProps,
    title: title ?? label,
    accent,
  });

  return (
    <EditableItem
      label={label}
      summary={summary}
      details={details}
      editAriaLabel={editAriaLabel}
      editIcon={editIcon}
      variant={variant}
      accent={accent}
      disabled={disabled}
      onEdit={open}
    >
      {editor}
    </EditableItem>
  );
}
