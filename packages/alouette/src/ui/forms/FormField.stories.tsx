import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { InputText } from "../inputs/InputText";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { Form } from "./Form";
import { FormField } from "./FormField";

interface SignUpValues {
  username: string;
  password: string;
}

function validatePassword(value: string): string | undefined {
  return value.length < 8
    ? "Password must be at least 8 characters."
    : undefined;
}

function FormFieldDemo(): ReactNode {
  return (
    <Form<SignUpValues>
      defaultValues={{ username: "", password: "" }}
      render={() => (
        <VStack className="gap-l">
          <FormField<SignUpValues>
            name="username"
            label="Username"
            required="Username is required."
            render={({ field, labelId }) => (
              <InputText
                ref={field.ref}
                value={field.value}
                aria-labelledby={labelId}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <FormField<SignUpValues>
            name="password"
            label="Password"
            validate={validatePassword}
            renderError={(fieldError) =>
              fieldError ? (
                <Text className="text-accent text-sm">
                  {fieldError.message} Use a passphrase for something memorable.
                </Text>
              ) : undefined
            }
            render={({ field, labelId }) => (
              <InputText
                ref={field.ref}
                mode="password"
                value={field.value}
                aria-labelledby={labelId}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </VStack>
      )}
      onSubmit={() => {}}
    />
  );
}

type ThisStory = StoryObj<typeof FormField>;

export default {
  title: "alouette/Forms/FormField",
  component: FormField,
  parameters: {
    componentSubtitle:
      "Wires a react-hook-form Controller to FormItem's label/error/layout. Must be used inside <Form>. The renderError prop accepts a resolver returning ReactNode, so error content isn't limited to plain strings.",
  },
} satisfies Meta<typeof FormField>;

export const FormFieldStory: ThisStory = {
  render: () => (
    <Story noDarkMode>
      <Story.Section title="required shorthand and a custom ReactNode error resolver">
        <FormFieldDemo />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const usernameInput = canvas.getByLabelText("Username");
    const passwordInput = canvas.getByLabelText("Password");

    await userEvent.click(usernameInput);
    await userEvent.tab();
    await expect(canvas.getByText("Username is required.")).toBeVisible();

    // Pressing the label focuses the input, like a native <label for>.
    await userEvent.click(canvas.getByText("Username"));
    await expect(usernameInput).toHaveFocus();

    await userEvent.type(passwordInput, "short");
    await userEvent.tab();
    await expect(
      canvas.getByText(
        "Password must be at least 8 characters. Use a passphrase for something memorable.",
      ),
    ).toBeVisible();
  },
};
