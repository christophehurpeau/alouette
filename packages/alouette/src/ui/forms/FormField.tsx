import type { ReactNode } from "react";
import {
  Controller,
  type ControllerRenderProps,
  type FieldError,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { FormItem } from "./FormItem";

export interface FormFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  /**
   * Marks the field required and shows FormItem's marker. Pass true for no
   * message, or any other ReactNode to use as the required-field error —
   * unless renderError overrides it — once the field is left empty.
   * react-hook-form's own FieldError.message is always a plain string, so
   * this is the only way to get a richer, i18n'd required message without
   * reaching for renderError.
   */
  required?: ReactNode;
  validate?: RegisterOptions<TFieldValues>["validate"];
  renderError?: (error: FieldError | undefined) => ReactNode;
  render: (params: {
    field: ControllerRenderProps<TFieldValues>;
    labelId: string;
  }) => ReactNode;
}

/**
 * Wires a react-hook-form Controller to FormItem's label/error/layout.
 * Must be used inside <Form>, which provides the control via context.
 * Renders any input via `render` — not tied to a specific input component.
 * The rendered input must attach `field.ref` for pressing the label to
 * focus it, via react-hook-form's own setFocus.
 */
export function FormField<TFieldValues extends FieldValues>({
  name,
  label,
  required,
  validate,
  renderError,
  render,
}: FormFieldProps<TFieldValues>): ReactNode {
  const { control, setFocus } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: Boolean(required), validate }}
      render={({ field, fieldState }) => {
        const requiredError =
          fieldState.error?.type === "required" && required !== true
            ? required
            : undefined;
        return (
          <FormItem
            label={label}
            required={Boolean(required)}
            isRequiredError={fieldState.error?.type === "required"}
            error={
              renderError
                ? renderError(fieldState.error)
                : (requiredError ?? fieldState.error?.message)
            }
            render={(labelId) => render({ field, labelId })}
            onLabelPress={() => {
              setFocus(name);
            }}
          />
        );
      }}
    />
  );
}
