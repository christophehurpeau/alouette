import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useRef } from "react";
import type { TextInput as RNTextInput } from "react-native";
import { InputText } from "../inputs/InputText";
import { Story } from "../story-components/Story";
import { FormItem } from "./FormItem";

function NameField({ details }: { details?: string }): ReactNode {
  const ref = useRef<RNTextInput>(null);
  return (
    <FormItem
      label="Name"
      details={details}
      render={({ labelId, describedBy, invalid, required }) => (
        <InputText
          ref={ref}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-required={required}
          invalid={invalid}
          placeholder="Ada Lovelace"
        />
      )}
      onLabelPress={() => ref.current?.focus()}
    />
  );
}

function RequiredField(): ReactNode {
  const ref = useRef<RNTextInput>(null);
  return (
    <FormItem
      required
      label="Full name"
      render={({ labelId, describedBy, invalid, required }) => (
        <InputText
          ref={ref}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-required={required}
          invalid={invalid}
        />
      )}
      onLabelPress={() => ref.current?.focus()}
    />
  );
}

function ErrorField({ details }: { details?: string }): ReactNode {
  const ref = useRef<RNTextInput>(null);
  return (
    <FormItem
      label="Email"
      details={details}
      error="Enter a valid email address."
      render={({ labelId, describedBy, invalid, required }) => (
        <InputText
          ref={ref}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-required={required}
          invalid={invalid}
          value="not-an-email"
        />
      )}
      onLabelPress={() => ref.current?.focus()}
    />
  );
}

function RequiredEmptyErrorField(): ReactNode {
  const ref = useRef<RNTextInput>(null);
  return (
    <FormItem
      required
      isRequiredError
      label="Password"
      error="Password is required."
      render={({ labelId, describedBy, invalid, required }) => (
        <InputText
          ref={ref}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-required={required}
          invalid={invalid}
          mode="password"
        />
      )}
      onLabelPress={() => ref.current?.focus()}
    />
  );
}

function RequiredOtherErrorField(): ReactNode {
  const ref = useRef<RNTextInput>(null);
  return (
    <FormItem
      required
      label="Password"
      error="Password must be at least 8 characters."
      render={({ labelId, describedBy, invalid, required }) => (
        <InputText
          ref={ref}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-required={required}
          invalid={invalid}
          mode="password"
          value="short"
        />
      )}
      onLabelPress={() => ref.current?.focus()}
    />
  );
}

function IndentedFormItem(): ReactNode {
  const ref = useRef<RNTextInput>(null);
  return (
    <FormItem
      indented
      label="Nickname"
      details="Indented content sits under a left border rail."
      render={({ labelId, describedBy, invalid, required }) => (
        <InputText
          ref={ref}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-required={required}
          invalid={invalid}
          placeholder="Ada"
        />
      )}
      onLabelPress={() => ref.current?.focus()}
    />
  );
}

type ThisStory = StoryObj<typeof FormItem>;

export default {
  title: "alouette/Forms/FormItem",
  component: FormItem,
  parameters: {
    componentSubtitle:
      "Label, error message and layout for a single form field — form-library agnostic.",
  },
} satisfies Meta<typeof FormItem>;

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Without error">
        <NameField />
      </Story.Section>

      <Story.Section title="Details">
        <NameField details="Enter your full name." />
      </Story.Section>

      <Story.Section title="Required">
        <RequiredField />
      </Story.Section>

      <Story.Section title="With error — the field takes the danger border">
        <ErrorField />
      </Story.Section>

      <Story.Section title="Required, left empty — star recolored, no extra icon">
        <RequiredEmptyErrorField />
      </Story.Section>

      <Story.Section title="Required, other validation error — star plus warning icon">
        <RequiredOtherErrorField />
      </Story.Section>

      <Story.Section title="Indented — content nested under a left border rail">
        <IndentedFormItem />
      </Story.Section>
    </Story>
  ),
};

export const Tests: ThisStory = {
  name: "FormItem Tests",
  render: () => (
    <Story noDarkMode>
      <NameField details="Enter your full name." />
      <RequiredEmptyErrorField />
      <ErrorField details="We only use it to sign you in." />
    </Story>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByLabelText("Name");
    const input = canvas.getByLabelText("Password");
    const emailInput = canvas.getByLabelText("Email");
    await expect(input).toBeInTheDocument();
    const message = canvas.getByText("Password is required.");
    await expect(message).toBeVisible();

    // The input announces the state the label and message show: invalid,
    // required, and described by the message.
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("aria-required", "true");
    await expect(input).toHaveAttribute("aria-describedby", message.id);
    await expect(nameInput).toHaveAttribute("aria-invalid", "false");
    await expect(nameInput).toHaveAttribute("aria-required", "false");

    // `details` is a description too, before the error.
    await expect(nameInput).toHaveAttribute(
      "aria-describedby",
      canvas.getByText("Enter your full name.").id,
    );
    await expect(emailInput).toHaveAttribute(
      "aria-describedby",
      `${canvas.getByText("We only use it to sign you in.").id} ${canvas.getByText("Enter a valid email address.").id}`,
    );

    // The field in error sits in the danger scope, like its message: its
    // border token resolves to the danger value, not the neutral one.
    const outlinedToken = (element: Element) =>
      getComputedStyle(element).getPropertyValue(
        "--color-interactive-outlined-pressable",
      );
    await expect(outlinedToken(input)).toBe(outlinedToken(message));
    await expect(outlinedToken(input)).not.toBe(outlinedToken(nameInput));
    await expect(getComputedStyle(input).borderTopColor).not.toBe(
      getComputedStyle(nameInput).borderTopColor,
    );

    // Pressing the label focuses the input, like a native <label for>.
    await userEvent.click(canvas.getByText("Password"));
    await expect(input).toHaveFocus();
  },
};
