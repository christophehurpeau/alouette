import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../actions/Button";
import { InputText } from "../inputs/InputText";
import { View } from "../primitives/View";
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
      "Owns the react-hook-form instance and hands its control to render, so each field infers the form type from the control and its own value type from name. Renders whatever layout you pass to render — SimpleVForm standardizes the common column of fields + submit button case.",
  },
} satisfies Meta<typeof Form>;

export const FormStory: ThisStory = {
  name: "Form examples",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Custom layout, built from FormField and a plain Button">
        <Form<SignInValues>
          defaultValues={{ email: "" }}
          render={({ control, submit }) => (
            <View className="gap-l">
              <FormField
                control={control}
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
            </View>
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
