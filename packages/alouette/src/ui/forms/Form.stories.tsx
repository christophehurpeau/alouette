import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../actions/Button";
import { InputText } from "../inputs/InputText";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { Form } from "./Form";
import { FormField } from "./FormField";

interface SignInValues {
  email: string;
}

function validateEmail(value: string): string | undefined {
  return value.trim().length === 0 ? "Email is required." : undefined;
}

type ThisStory = StoryObj<typeof Form>;

export default {
  title: "alouette/Forms/Form",
  component: Form,
  parameters: {
    componentSubtitle:
      "Owns the react-hook-form instance and shares it via context, so FormField never needs a control prop. Renders whatever layout you pass to render — SimpleVForm standardizes the common VStack + submit button case.",
  },
} satisfies Meta<typeof Form>;

export const FormStory: ThisStory = {
  name: "Form examples",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Custom layout, built from FormField and a plain Button">
        <Form<SignInValues>
          defaultValues={{ email: "" }}
          render={({ submit }) => (
            <VStack className="gap-l">
              <FormField<SignInValues>
                name="email"
                label="Email"
                validate={validateEmail}
                render={({ field, labelId }) => (
                  <InputText
                    ref={field.ref}
                    mode="email"
                    value={field.value}
                    aria-labelledby={labelId}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              <Button
                text="Sign in"
                onPress={() => {
                  submit().catch(() => {});
                }}
              />
            </VStack>
          )}
          onSubmit={() => {}}
        />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText("Email");

    await userEvent.click(canvas.getByText("Sign in"));
    await waitFor(async () => {
      await expect(canvas.getByText("Email is required.")).toBeVisible();
    });

    await userEvent.type(emailInput, "ada@example.com");
    await userEvent.click(canvas.getByText("Sign in"));
    await waitFor(async () => {
      await expect(
        canvas.queryByText("Email is required."),
      ).not.toBeInTheDocument();
    });
  },
};
