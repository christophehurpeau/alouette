import { type ReactNode, useState } from "react";
import type { Control, FieldValues } from "react-hook-form";
import type { Accent } from "../../core/AlouetteConfig";
import { Button } from "../actions/Button";
import { Modal, type ModalProps } from "../containers/Modal";
import { Form, type FormProps } from "./Form";
import { FormSubmitButton } from "./FormSubmitButton";

/**
 * The editor half of the public props of a component pairing a read-only
 * display with a modal form (FormEditableItem, FormEditableSurface).
 */
export interface FormEditorProps<TFieldValues extends FieldValues> extends Omit<
  FormProps<TFieldValues>,
  "onSubmitError" | "render"
> {
  /** Heading of the editor modal. Defaults to the display's own heading. */
  title?: string;
  size?: ModalProps["size"];
  closeButtonAriaLabel?: string;
  cancelLabel: string;
  submitLabel: string;
  /** Forwarded to FormSubmitButton — see its errorToMessage doc. */
  submitErrorToMessage: (error: unknown) => string;
  /** The fields, rendered as the modal body, bound to the modal Form's own control. */
  render: (params: { control: Control<TFieldValues> }) => ReactNode;
}

interface UseFormEditorModalParams<
  TFieldValues extends FieldValues,
> extends FormEditorProps<TFieldValues> {
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
export function useFormEditorModal<TFieldValues extends FieldValues>({
  title,
  size,
  accent,
  closeButtonAriaLabel,
  cancelLabel,
  submitLabel,
  submitErrorToMessage,
  defaultValues,
  mode,
  onSubmit,
  render,
}: UseFormEditorModalParams<TFieldValues>): FormEditorModal {
  const [editing, setEditing] = useState(false);

  function open(): void {
    setEditing(true);
  }

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

  return {
    open,
    editor: editing ? (
      <Form
        defaultValues={defaultValues}
        mode={mode}
        render={({ control, submit }) => (
          <Modal
            visible
            title={title}
            accent={accent}
            size={size}
            closeButtonAriaLabel={closeButtonAriaLabel}
            footer={
              <>
                <Button variant="outlined" text={cancelLabel} onPress={close} />
                <FormSubmitButton
                  label={submitLabel}
                  errorToMessage={submitErrorToMessage}
                  onPress={submit}
                />
              </>
            }
            onClose={close}
          >
            {render({ control })}
          </Modal>
        )}
        onSubmit={handleSubmit}
      />
    ) : null,
  };
}
