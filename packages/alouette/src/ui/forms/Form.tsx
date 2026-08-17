import type { ReactNode } from "react";
import {
  type Control,
  type DefaultValues,
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormProps,
  useForm,
} from "react-hook-form";

export class FormValidationError extends Error {
  constructor() {
    super("Form validation failed.");
    this.name = "FormValidationError";
  }
}

export interface FormProps<TFieldValues extends FieldValues> {
  defaultValues: DefaultValues<TFieldValues>;
  mode?: UseFormProps<TFieldValues>["mode"];
  onSubmit: SubmitHandler<TFieldValues>;
  onSubmitError?: (error: unknown) => void;
  render: (params: {
    control: Control<TFieldValues>;
    submit: () => Promise<void>;
  }) => ReactNode;
}

/**
 * Owns the react-hook-form instance and hands its `control` to `render`, so
 * every field below infers TFieldValues from the control it is given and its
 * own value type from `name` — no type argument per field. submit() rejects
 * with FormValidationError when fields are invalid (nothing was submitted), so
 * FormSubmitButton can tell that apart from a genuine onSubmit failure.
 * Without `onSubmitError`, an exception thrown from `onSubmit` is left to
 * propagate as a genuine unhandled rejection rather than being silently
 * logged — FormSubmitButton (built on ActionButton) consumes it instead to
 * drive its own loading/success/failed state.
 */
export function Form<TFieldValues extends FieldValues>({
  defaultValues,
  mode = "onTouched",
  onSubmit,
  onSubmitError,
  render,
}: FormProps<TFieldValues>): ReactNode {
  const form = useForm<TFieldValues>({ mode, defaultValues });

  function submit(): Promise<void> {
    // react-hook-form only broadcasts the updated field errors to
    // Controller subscribers in a final internal step *after* the onInvalid
    // callback resolves — throwing from inside onInvalid pre-empts that
    // broadcast, so field-level errors would never reach FormField/FormItem.
    // Record invalidity instead, and throw only once handleSubmit is done.
    let valid = true;
    const result = form
      .handleSubmit(onSubmit, () => {
        valid = false;
      })()
      .then(() => {
        if (!valid) throw new FormValidationError();
      });
    if (onSubmitError) result.catch(onSubmitError);
    return result;
  }

  // FormProvider stays so FormField can reach setFocus, and so app-level
  // components deep in the tree can still opt into useFormContext.
  return (
    <FormProvider {...form}>
      {render({ control: form.control, submit })}
    </FormProvider>
  );
}
