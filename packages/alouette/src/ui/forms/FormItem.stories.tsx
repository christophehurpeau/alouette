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
      render={(labelId) => (
        <InputText
          ref={ref}
          aria-labelledby={labelId}
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
      render={(labelId) => <InputText ref={ref} aria-labelledby={labelId} />}
      onLabelPress={() => ref.current?.focus()}
    />
  );
}

function ErrorField(): ReactNode {
  const ref = useRef<RNTextInput>(null);
  return (
    <FormItem
      label="Email"
      error="Enter a valid email address."
      render={(labelId) => (
        <InputText ref={ref} aria-labelledby={labelId} value="not-an-email" />
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
      render={(labelId) => (
        <InputText ref={ref} aria-labelledby={labelId} mode="password" />
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
      render={(labelId) => (
        <InputText
          ref={ref}
          aria-labelledby={labelId}
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
      render={(labelId) => (
        <InputText ref={ref} aria-labelledby={labelId} placeholder="Ada" />
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

      <Story.Section title="With error">
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
      <RequiredEmptyErrorField />
    </Story>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    await expect(input).toBeInTheDocument();
    await expect(canvas.getByText("Password is required.")).toBeVisible();

    // Pressing the label focuses the input, like a native <label for>.
    await userEvent.click(canvas.getByText("Password"));
    await expect(input).toHaveFocus();
  },
};
