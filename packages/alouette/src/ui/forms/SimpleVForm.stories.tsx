import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ConfirmationMessage } from "../feedback/Message";
import { InputText } from "../inputs/InputText";
import { Story } from "../story-components/Story";
import { FormValidationError } from "./Form";
import { FormField } from "./FormField";
import { SimpleVForm } from "./SimpleVForm";

function submitErrorToMessage(error: unknown): string {
  if (error instanceof FormValidationError) {
    return "Please fix the errors above.";
  }
  return error instanceof Error ? error.message : "Something went wrong.";
}

interface FormValues {
  name: string;
  email: string;
  age: string;
}

function validateName(value: string): string | undefined {
  if (value.trim().length === 0) return "Name is required.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  return undefined;
}

const emailPattern = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;

function validateEmail(value: string): string | undefined {
  if (value.trim().length === 0) return "Email is required.";
  if (!emailPattern.test(value)) return "Enter a valid email address.";
  return undefined;
}

function validateAge(value: string): string | undefined {
  if (value.trim().length === 0) return "Age is required.";
  if (!/^\d+$/.test(value)) return "Age must be a whole number.";
  const age = Number(value);
  if (age < 0 || age > 120) return "Age must be between 0 and 120.";
  return undefined;
}

interface SimpleVFormFieldsProps {
  submit: () => Promise<void>;
}

function SimpleVFormFields({ submit }: SimpleVFormFieldsProps): ReactNode {
  const { setFocus } = useFormContext<FormValues>();

  return (
    <>
      <FormField<FormValues>
        name="name"
        label="Name"
        validate={validateName}
        render={({ field, labelId }) => (
          <InputText
            ref={field.ref}
            value={field.value}
            aria-labelledby={labelId}
            returnKeyType="next"
            enterKeyHint="next"
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            onSubmitEditing={() => {
              setFocus("email");
            }}
          />
        )}
      />

      <FormField<FormValues>
        name="email"
        label="Email"
        validate={validateEmail}
        render={({ field, labelId }) => (
          <InputText
            ref={field.ref}
            mode="email"
            value={field.value}
            aria-labelledby={labelId}
            returnKeyType="next"
            enterKeyHint="next"
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            onSubmitEditing={() => {
              setFocus("age");
            }}
          />
        )}
      />

      <FormField<FormValues>
        name="age"
        label="Age"
        validate={validateAge}
        render={({ field, labelId }) => (
          <InputText
            ref={field.ref}
            mode="number"
            value={field.value}
            aria-labelledby={labelId}
            returnKeyType="done"
            enterKeyHint="done"
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            onSubmitEditing={() => {
              submit().catch(() => {});
            }}
          />
        )}
      />
    </>
  );
}

function SimpleVFormDemo(): ReactNode {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  return (
    <>
      <SimpleVForm<FormValues>
        defaultValues={{ name: "", email: "", age: "" }}
        submitLabel="Submit"
        submitErrorToMessage={submitErrorToMessage}
        render={({ submit }) => <SimpleVFormFields submit={submit} />}
        onSubmit={(value) => {
          setSubmitted(value);
        }}
      />

      {submitted ? (
        <ConfirmationMessage>
          Submitted {submitted.name} ({submitted.email}), age {submitted.age}
        </ConfirmationMessage>
      ) : null}
    </>
  );
}

type ThisStory = StoryObj<typeof SimpleVFormDemo>;

export default {
  title: "alouette/Forms/SimpleVForm",
  component: SimpleVFormDemo,
  parameters: {
    componentSubtitle:
      "Standardizes the common case: a Form laid out as a vertical stack of FormFields with a trailing FormSubmitButton.",
  },
} satisfies Meta<typeof SimpleVFormDemo>;

export const SimpleVFormStory: ThisStory = {
  name: "SimpleVForm examples",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Name, email and age, validated with react-hook-form">
        <SimpleVFormDemo />
      </Story.Section>
    </Story>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByLabelText("Name");
    const emailInput = canvas.getByLabelText("Email");
    const ageInput = canvas.getByLabelText("Age");

    // Invalid values are rejected and reported inline.
    await userEvent.type(nameInput, "A");
    await userEvent.tab();
    await expect(
      canvas.getByText("Name must be at least 2 characters."),
    ).toBeVisible();

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Ada Lovelace");
    await userEvent.type(emailInput, "not-an-email");
    await userEvent.type(ageInput, "12");
    await expect(
      canvas.getByText("Enter a valid email address."),
    ).toBeVisible();

    // Fix the email, then submit via Enter on the last field.
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "ada@example.com{enter}");
    await waitFor(async () => {
      await expect(ageInput).toHaveFocus();
    });
    await userEvent.type(ageInput, "{enter}");

    await expect(
      canvas.getByText("Submitted Ada Lovelace (ada@example.com), age 12"),
    ).toBeVisible();

    // Pressing a label still focuses its input via react-hook-form's setFocus.
    await userEvent.click(canvas.getByText("Name"));
    await expect(nameInput).toHaveFocus();
  },
};
