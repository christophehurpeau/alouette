import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { InputText } from "./InputText";

type ThisStory = StoryObj<typeof InputText>;

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
  args: { placeholder: "Enter text..." },
  render: (args) => <InputText {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        {([undefined, ...accents] as const).map((accent) => (
          <Story.SubSection
            key={accent || "default"}
            withSurface
            title={accent ?? "Default"}
            accent={accent}
          >
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <InputText
                    disabled={state === "disabled"}
                    forceStyle={state === "disabled" ? undefined : state}
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <InputText
                    disabled={state === "disabled"}
                    forceStyle={state === "disabled" ? undefined : state}
                    placeholder="Placeholder"
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <InputText
                    disabled={state === "disabled"}
                    forceStyle={state === "disabled" ? undefined : state}
                    value="Value"
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
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

    // Max length
    const maxlengthInput = canvas.getByTestId("maxlength-input");
    await expect(maxlengthInput).toBeInTheDocument();
    await expect(maxlengthInput).toHaveAttribute("maxlength", "5");
  },
};
