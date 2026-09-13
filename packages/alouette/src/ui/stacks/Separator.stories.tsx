import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { Separator } from "./Separator";

export default {
  title: "alouette/Layout/Separator",
  component: Separator,
  parameters: {
    componentSubtitle:
      "A flexible divider component for creating visual separation between content",
    docs: {
      description: {
        component: `### Features
- Horizontal (default) and vertical orientations
- Picks up the current theme's \`border-sharp\` color

### Variants
- \`vertical\`: switches orientation

### Usage
~~~tsx
<Separator />

<View className="flex-row h-24">
  <View>Left</View>
  <Separator vertical />
  <View>Right</View>
</View>
~~~`,
      },
    },
  },
} satisfies Meta<typeof Separator>;

export const PreviewSeparatorStory: StoryObj = {
  render: () => <Separator />,
};

export const Variants: StoryObj = {
  render: () => (
    <Story>
      <Story.Section title="Themes">
        <Story.SubSection title="brand" accent="brand">
          <Separator />
        </Story.SubSection>

        <Story.SubSection title="success" accent="success">
          <Separator />
        </Story.SubSection>
      </Story.Section>
      <Story.Section title="Vertical">
        <View className="flex-row h-24">
          <View className="grow flex-center">
            <Text>Left</Text>
          </View>
          <Separator vertical />
          <View className="grow flex-center">
            <Text>Right</Text>
          </View>
        </View>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Every divider is announced as a separator with its orientation, without
    // the caller passing a role.
    const orientations = canvas
      .getAllByRole("separator")
      .map((separator) => separator.getAttribute("aria-orientation"));
    await expect(orientations).toContain("horizontal");
    await expect(orientations).toContain("vertical");
    await expect(
      orientations.every(
        (orientation) =>
          orientation === "horizontal" || orientation === "vertical",
      ),
    ).toBe(true);
  },
};
