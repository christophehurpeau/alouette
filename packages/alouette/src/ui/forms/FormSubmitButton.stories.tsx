import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import { ConfirmationMessage } from "../feedback/Message";
import { InputText } from "../inputs/InputText";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { Form, FormValidationError } from "./Form";
import { FormField } from "./FormField";
import { FormSubmitButton } from "./FormSubmitButton";

interface NewsletterValues {
  email: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function errorToMessage(error: unknown): string {
  if (error instanceof FormValidationError) {
    return "Please fix the errors above.";
  }
  return error instanceof Error ? error.message : "Something went wrong.";
}

function FormSubmitButtonDemo(): ReactNode {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Form<NewsletterValues>
        defaultValues={{ email: "" }}
        render={({ submit }) => (
          <VStack className="gap-l">
            <FormField<NewsletterValues>
              name="email"
              label="Email"
              required="Email is required."
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
            <FormSubmitButton
              label="Subscribe"
              errorToMessage={errorToMessage}
              onPress={submit}
            />
          </VStack>
        )}
        onSubmit={async () => {
          await delay(300);
          setSubmitted(true);
        }}
      />
      {submitted ? (
        <ConfirmationMessage>Subscribed.</ConfirmationMessage>
      ) : null}
    </>
  );
}

type ThisStory = StoryObj<typeof FormSubmitButtonDemo>;

export default {
  title: "alouette/Forms/FormSubmitButton",
  component: FormSubmitButton,
  parameters: {
    componentSubtitle:
      "Submit button for a <Form>. Reuses Button's own disabled/loading accessibility handling — only wires isSubmitting from react-hook-form's context to it.",
  },
} satisfies Meta<typeof FormSubmitButtonDemo>;

export const FormSubmitButtonStory: ThisStory = {
  name: "FormSubmitButton",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Disabled and showing a loading state while onSubmit is pending">
        <FormSubmitButtonDemo />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText("Email");
    const submitButton = canvas.getByRole("button", { name: "Subscribe" });

    await userEvent.type(emailInput, "ada@example.com");
    await userEvent.click(submitButton);

    await waitFor(async () => {
      await expect(canvas.getByText("Subscribe")).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    await waitFor(
      async () => {
        await expect(canvas.getByText("Subscribed.")).toBeVisible();
      },
      { timeout: 2000 },
    );
  },
};
