import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Story, neutralAndAccents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { InputText, type InputTextProps } from "./InputText";

type ThisStory = StoryObj<typeof InputText>;

type ForcedState = NonNullable<InputTextProps["forceStyle"]>;
type InputState = ForcedState | "disabled" | "invalid";

function StateCol({
  state,
  ...props
}: Pick<InputTextProps, "placeholder" | "value"> & {
  state: InputState | undefined;
}): ReactNode {
  if (state === "disabled") {
    return (
      <StoryGrid.Col title="disabled">
        <InputText disabled {...props} />
      </StoryGrid.Col>
    );
  }
  if (state === "invalid") {
    return (
      <StoryGrid.Col title="invalid">
        <InputText invalid {...props} />
      </StoryGrid.Col>
    );
  }
  return (
    <StoryGrid.Col title={state ?? "Default"}>
      <InputText forceStyle={state} {...props} />
    </StoryGrid.Col>
  );
}

function StateRow(
  props: Pick<InputTextProps, "placeholder" | "value">,
): ReactNode {
  return (
    <StoryGrid.Row flexWrap>
      <StateCol state={undefined} {...props} />
      <StateCol state="hover" {...props} />
      <StateCol state="focus" {...props} />
      <StateCol state="press" {...props} />
      <StateCol state="disabled" {...props} />
      <StateCol state="invalid" {...props} />
    </StoryGrid.Row>
  );
}

export default {
  title: "alouette/Inputs/InputText",
  component: InputText,
  parameters: {
    componentSubtitle:
      "Single-line text input with theme support, modes, and platform-aware keyboards.",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: "text" },
    maxLength: { control: "number" },
  },
} satisfies Meta<typeof InputText>;

export const PreviewInputTextStory: ThisStory = {
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: { placeholder: "Enter text..." },
  render: (args) => <InputText {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        {neutralAndAccents.map((accent) => (
          <Story.SubSection
            key={accent}
            withSurface
            title={accent}
            accent={accent}
          >
            <StateRow />
            <StateRow placeholder="Placeholder" />
            <StateRow value="Value" />
          </Story.SubSection>
        ))}
      </Story.Section>

      <Story.Section title="Modes">
        <Story.SubSection title="Password">
          <InputText mode="password" />
        </Story.SubSection>
        <Story.SubSection title="Email">
          <InputText mode="email" />
        </Story.SubSection>
        <Story.SubSection title="Tel">
          <InputText mode="tel" />
        </Story.SubSection>
        <Story.SubSection title="Number">
          <InputText mode="number" />
        </Story.SubSection>
        <Story.SubSection title="URL">
          <InputText mode="url" />
        </Story.SubSection>
        <Story.SubSection title="Search">
          <InputText mode="search" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Other Props">
        <Story.SubSection title="Auto correct">
          <InputText autoCorrect />
        </Story.SubSection>
        <Story.SubSection title="Auto capitalize">
          <InputText autoCapitalize="none" placeholder="None" />
          <InputText autoCapitalize="words" placeholder="Words" />
          <InputText autoCapitalize="sentences" placeholder="Sentences" />
          <InputText autoCapitalize="characters" placeholder="Characters" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Edge Cases">
        <Story.SubSection title="Very long text">
          <InputText defaultValue="Very very very very very very very very very very very very very very very very very very very very very long value" />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

export const Tests: StoryObj<typeof InputText> = {
  name: "InputText Tests",

  render: () => (
    <Story noDarkMode>
      <Story.Section title="Modes">
        <InputText testID="password-input" mode="password" />
      </Story.Section>
      <Story.Section title="Accessibility">
        <InputText
          placeholder="Accessible input"
          aria-label="Accessible input"
        />
        <InputText invalid aria-label="Invalid input" value="not-an-email" />
      </Story.Section>
      <Story.Section title="Max Length">
        <InputText
          testID="maxlength-input"
          placeholder="Max length"
          maxLength={5}
        />
      </Story.Section>
    </Story>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Modes
    const passwordInput = canvas.getByTestId("password-input");
    await expect(passwordInput.tagName).toBe("INPUT");
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Accessibility
    const input = canvas.getByPlaceholderText("Accessible input");
    await expect(input).toHaveAttribute("aria-label", "Accessible input");
    await expect(input).toHaveAttribute("aria-invalid", "false");

    // An invalid input says so, and its border leaves the neutral token for
    // the danger one.
    const invalidInput = canvas.getByLabelText("Invalid input");
    await expect(invalidInput).toHaveAttribute("aria-invalid", "true");
    await expect(getComputedStyle(invalidInput).borderTopColor).not.toBe(
      getComputedStyle(input).borderTopColor,
    );

    // Max length
    const maxlengthInput = canvas.getByTestId("maxlength-input");
    await expect(maxlengthInput).toBeInTheDocument();
    await expect(maxlengthInput).toHaveAttribute("maxlength", "5");
  },
};
