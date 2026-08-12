import { type ReactNode, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Button } from "../actions/Button";
import { Modal, type ModalProps } from "../containers/Modal";
import { EditableItem, type EditableItemProps } from "../data/EditableItem";
import { Form, type FormProps } from "./Form";
import { FormSubmitButton } from "./FormSubmitButton";

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
    Omit<FormProps<TFieldValues>, "onSubmitError" | "render"> {
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
  size,
  closeButtonAriaLabel,
  cancelLabel,
  submitLabel,
  submitErrorToMessage,
  defaultValues,
  mode,
  onSubmit,
  children,
}: FormEditableItemProps<TFieldValues>): ReactNode {
  const [editing, setEditing] = useState(false);

  function close(): void {
    setEditing(false);
  }

  // Closing only once onSubmit resolves keeps the modal open on failure, where
  // FormSubmitButton shows the error. It cuts the button's success state short,
  // but the modal disappearing is the confirmation.
  const handleSubmit: FormProps<TFieldValues>["onSubmit"] = async (
    values,
    event,
  ) => {
    await onSubmit(values, event);
    setEditing(false);
  };

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
      onEdit={() => {
        setEditing(true);
      }}
    >
      {editing ? (
        <Form
          defaultValues={defaultValues}
          mode={mode}
          render={({ submit }) => (
            <Modal
              visible
              title={title ?? label}
              accent={accent}
              size={size}
              closeButtonAriaLabel={closeButtonAriaLabel}
              footer={
                <>
                  <Button
                    variant="outlined"
                    text={cancelLabel}
                    onPress={close}
                  />
                  <FormSubmitButton
                    label={submitLabel}
                    errorToMessage={submitErrorToMessage}
                    onPress={submit}
                  />
                </>
              }
              onClose={close}
            >
              {children}
            </Modal>
          )}
          onSubmit={handleSubmit}
        />
      ) : null}
    </EditableItem>
  );
}
