import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { Separator } from "./Separator";
import { HStack } from "./stacks";

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

<HStack className="h-24">
  <View>Left</View>
  <Separator vertical />
  <View>Right</View>
</HStack>
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
        <Story.SubSection title="brand" semanticRole="brand">
          <Separator />
        </Story.SubSection>

        <Story.SubSection title="success" semanticRole="success">
          <Separator />
        </Story.SubSection>
      </Story.Section>
      <Story.Section title="Vertical">
        <HStack className="h-24">
          <View className="grow items-center justify-center">
            <Text>Left</Text>
          </View>
          <Separator vertical />
          <View className="grow items-center justify-center">
            <Text>Right</Text>
          </View>
        </HStack>
      </Story.Section>
    </Story>
  ),
};
