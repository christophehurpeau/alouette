import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "@tamagui/core";
import { Story } from "../story-components/Story";
import { Paragraph, Text } from "./Text";

type ThisStory = StoryObj<typeof Text>;

export default {
  title: "alouette/primitives/Text",
  component: Text,
  parameters: {
    componentSubtitle:
      "A foundational text component that provides consistent text styling across the application",
    docs: {
      description: {
        component: `### Features
- **Sizes**: Available in 5 sizes (xs, sm, md, lg, xl) with matching line heights
- **Weights**: Supports 3 font weights (regular, bold, extraBold)
- **Font Families**: Can switch between body and heading font families

### Variants
- \`size\`: Controls font size and line height (xs | sm | md | lg | xl)
- \`weight\`: Sets font weight (regular | bold | extraBold)
- \`family\`: Changes font family (body | heading)

### Usage
~~~tsx
// Basic usage
<Text size="md" weight="regular">Regular text</Text>

// With inherit
<Paragraph size="xl">
  Parent text
  <Text inherit weight="bold">
    Inherits xl size from parent
  </Text>
</Paragraph>
~~~`,
      },
    },
  },
} satisfies Meta<typeof Text>;

export const TextStory: ThisStory = {
  name: "Text",
  render: () => (
    <Story>
      <Story.Section title="Heading Sizes">
        {(["$xl", "$lg", "$md", "$sm", "$xs"] as const).flatMap((size) =>
          (["$regular", "$bold", "$extraBold"] as const).map((weight) => (
            <View key={`${size}-${weight}`}>
              <Text family="$heading" size={size} weight={weight}>
                Heading {size}/{weight}
              </Text>
            </View>
          )),
        )}
      </Story.Section>

      <Story.Section title="Body Sizes">
        {(["$xl", "$lg", "$md", "$sm", "$xs"] as const).flatMap((size) =>
          (["$regular", "$bold", "$extraBold"] as const).map((weight) => (
            <View key={`${size}-${weight}`}>
              <Text size={size} weight={weight}>
                Body {size}/{weight}
              </Text>
              <Text family="$body-monospace" size={size} weight={weight}>
                Monospace {size}/{weight}
              </Text>
            </View>
          )),
        )}
      </Story.Section>

      <Story.Section title="Tints" theme="info">
        <Text size="$xl" tint="muted">
          This is muted text.
        </Text>
        <Text size="$xl" tint="accent">
          This is accent text.
        </Text>
      </Story.Section>

      <Story.Section title="Paragraph">
        <Paragraph>Simple paragraph.</Paragraph>

        <Paragraph size="$xl">
          The future is in{" "}
          <Text inherit weight="$bold">
            our{" "}
            <Text inherit tint="accent" theme="brand">
              hands
            </Text>
          </Text>{" "}
          <Text inherit tint="accent" theme="danger">
            to{" "}
            <Text inherit tint="accent" weight="$bold">
              shape
            </Text>
          </Text>
        </Paragraph>
      </Story.Section>
    </Story>
  ),
};

export const Tests: ThisStory = {
  name: "Text Tests",
  render() {
    return (
      <Story noDarkTheme>
        <Story.Section title="Paragraph">
          <Paragraph>Paragraph content</Paragraph>
        </Story.Section>
      </Story>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText("Paragraph content");
    await expect(paragraph).toBeInTheDocument();
    await expect(paragraph.tagName).toBe("P");
  },
};
