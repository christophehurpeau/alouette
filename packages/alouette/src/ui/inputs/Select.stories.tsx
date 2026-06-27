import { expect, fn, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Select } from "./Select";
import type { SelectProps } from "./Select.shared";

type ThisStory = StoryObj<typeof Select>;

// Presentational wrapper holding the demo options inline, so stories stay
// markup-driven and forward only the props under test.
function FruitSelect(props: Omit<SelectProps, "options">): ReactNode {
  return (
    <Select
      options={[
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
        { label: "Durian (sold out)", value: "durian", disabled: true },
        { label: "Elderberry", value: "elderberry" },
      ]}
      {...props}
    />
  );
}

export default {
  title: "alouette/Inputs/Select",
  component: Select,
  parameters: {
    componentSubtitle:
      "Accessible select. Native <select> on web, modal listbox on iOS/Android.",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export const PreviewSelectStory: ThisStory = {
  args: { placeholder: "Pick a fruit..." },
  render: (args) => <FruitSelect onValueChange={fn()} {...args} />,
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
              <StoryGrid.Col title="placeholder">
                <FruitSelect
                  accent={accent}
                  placeholder="Pick a fruit..."
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="value">
                <FruitSelect
                  accent={accent}
                  defaultValue="banana"
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="disabled (placeholder)">
                <FruitSelect
                  disabled
                  accent={accent}
                  placeholder="Pick a fruit..."
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="disabled (value)">
                <FruitSelect
                  disabled
                  accent={accent}
                  defaultValue="banana"
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
            </StoryGrid.Row>
          </Story.SubSection>
        ))}
      </Story.Section>

      <Story.Section title="Edge Cases">
        <Story.SubSection title="Long label">
          <FruitSelect
            defaultValue="durian"
            placeholder="Pick a fruit with a very very very long placeholder label"
            onValueChange={fn()}
          />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

export const Tests: StoryObj<typeof Select> = {
  name: "Select Tests",

  render: () => (
    <Story noDarkMode>
      <Story.Section title="Accessibility">
        <FruitSelect
          testID="fruit-select"
          aria-label="Fruit"
          defaultValue="banana"
          onValueChange={fn()}
        />
      </Story.Section>
    </Story>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByTestId("fruit-select");
    await expect(select.tagName).toBe("SELECT");
    await expect(select).toHaveAttribute("aria-label", "Fruit");
    await expect(select).toHaveValue("banana");

    const durian = within(select).getByRole("option", {
      name: "Durian (sold out)",
    });
    await expect(durian).toBeDisabled();
  },
};
