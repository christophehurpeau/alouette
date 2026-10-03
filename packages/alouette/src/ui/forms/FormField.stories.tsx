import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { InputPassword } from "../inputs/InputPassword";
import { InputText } from "../inputs/InputText";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
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
      render={({ control }) => (
        <View className="gap-l">
          <FormField
            control={control}
            name="username"
            label="Username"
            required="Username is required."
            render={({ field, labelId, describedBy, invalid, required }) => (
              <InputText
                ref={field.ref}
                value={field.value}
                aria-labelledby={labelId}
                aria-describedby={describedBy}
                aria-required={required}
                invalid={invalid}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <FormField
            control={control}
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
            render={({ field, labelId, describedBy, invalid, required }) => (
              <InputPassword
                ref={field.ref}
                autoComplete="new-password"
                value={field.value}
                aria-labelledby={labelId}
                aria-describedby={describedBy}
                aria-required={required}
                invalid={invalid}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </View>
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
      "Wires a react-hook-form Controller to FormItem's label/error/layout. Must be used inside <Form>, whose render params supply the control that types name and field.value. The renderError prop accepts a resolver returning ReactNode, so error content isn't limited to plain strings.",
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
    await expect(usernameInput).toHaveAttribute("aria-required", "true");
    await expect(usernameInput).toHaveAttribute("aria-invalid", "false");
    await expect(usernameInput).not.toHaveAttribute("aria-describedby");
    await expect(passwordInput).toHaveAttribute("aria-required", "false");

    await userEvent.click(usernameInput);
    await userEvent.tab();
    const requiredMessage = canvas.getByText("Username is required.");
    await expect(requiredMessage).toBeVisible();
    // The label is not a tab stop: Tab goes straight to the next input.
    await expect(passwordInput).toHaveFocus();

    // The error reaches the input: aria-invalid, and the message as its
    // description.
    await expect(usernameInput).toHaveAttribute("aria-invalid", "true");
    await expect(usernameInput).toHaveAttribute(
      "aria-describedby",
      requiredMessage.id,
    );

    // Pressing the label focuses the input, like a native <label for>.
    await userEvent.click(canvas.getByText("Username"));
    await expect(usernameInput).toHaveFocus();

    // Fixing the value clears the state on the input as well.
    await userEvent.type(usernameInput, "ada");
    await expect(usernameInput).toHaveAttribute("aria-invalid", "false");
    await expect(usernameInput).not.toHaveAttribute("aria-describedby");

    await userEvent.type(passwordInput, "short");
    await userEvent.tab();
    const passwordMessage = canvas.getByText(
      "Password must be at least 8 characters. Use a passphrase for something memorable.",
    );
    await expect(passwordMessage).toBeVisible();
    await expect(passwordInput).toHaveAttribute("aria-invalid", "true");
  },
};
