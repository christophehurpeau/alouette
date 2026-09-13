import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { twMerge } from "../../core/twMerge";
import {
  EditableSection,
  type EditableSectionProps,
} from "../containers/EditableSection";
import { type FormEditorProps, useFormEditorModal } from "./useFormEditorModal";

export interface FormEditableSectionProps<TFieldValues extends FieldValues>
  extends
    Pick<
      EditableSectionProps,
      | "accent"
      | "children"
      | "className"
      | "details"
      | "disabled"
      | "editAriaLabel"
      | "editIcon"
      | "editIconVariant"
      | "title"
      | "titleBadge"
    >,
    Omit<FormEditorProps<TFieldValues>, "size" | "title"> {
  /** Size of the editor modal. */
  modalSize?: FormEditorProps<TFieldValues>["size"];
  /** Heading of the editor modal. Defaults to `title`. */
  modalTitle?: string;
}

/**
 * An EditableSection whose editor is a modal owning its own Form — see
 * useFormEditorModal for how the edit is kept out of the screen's state. The
 * body stays `children`, so the read-only content is written as plain JSX.
 */
export function FormEditableSection<TFieldValues extends FieldValues>({
  title,
  titleBadge,
  details,
  editAriaLabel,
  editIcon,
  editIconVariant,
  accent,
  className,
  disabled,
  modalSize,
  modalTitle,
  children,
  ...editorProps
}: FormEditableSectionProps<TFieldValues>): ReactNode {
  const { open, editor } = useFormEditorModal<TFieldValues>({
    ...editorProps,
    title: modalTitle ?? title,
    size: modalSize,
    accent,
  });

  return (
    <EditableSection
      title={title}
      titleBadge={titleBadge}
      details={details}
      editAriaLabel={editAriaLabel}
      editIcon={editIcon}
      editIconVariant={editIconVariant}
      accent={accent}
      className={className}
      disabled={disabled}
      onEdit={open}
    >
      {children}
      {editor}
    </EditableSection>
  );
}

/**
 * @deprecated Renamed `FormEditableSection`, which applies no material itself:
 * write `<FormEditableSection className="surface">`.
 */
export function FormEditableSurface<TFieldValues extends FieldValues>({
  className,
  ...props
}: FormEditableSectionProps<TFieldValues>): ReactNode {
  return (
    <FormEditableSection<TFieldValues>
      className={twMerge("surface", className)}
      {...props}
    />
  );
}

/** @deprecated Renamed `FormEditableSectionProps`. */
export type FormEditableSurfaceProps<TFieldValues extends FieldValues> =
  FormEditableSectionProps<TFieldValues>;
