import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { Separator } from "./Separator";
import { HStack } from "./stacks";

export default {
  title: "alouette/layout/Separator",
  component: Separator,
  parameters: {
    componentSubtitle:
      "A flexible divider component for creating visual separation between content",
    docs: {
      description: {
        component: `
### Features
- Horizontal and vertical orientations
- Theme support for different visual styles
- Automatic spacing and alignment
- Semantic HTML with proper ARIA roles
- Flexible sizing based on container

### Variants
- \`vertical\`: Changes orientation to vertical

### Guidelines
- Use horizontal separators for content sections
- Use vertical separators for side-by-side elements
- Maintain consistent spacing around separators
- Consider using margins instead for subtle separation
- Avoid overusing separators in dense layouts

### Usage
~~~tsx
// Horizontal separator
<Separator />

// Vertical separator between elements
<HStack height={100}>
  <View>Left Content</View>
  <Separator vertical />
  <View>Right Content</View>
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
        <Story.SubSection title="brand">
          <Separator theme="brand" />
        </Story.SubSection>

        <Story.SubSection title="success">
          <Separator theme="success" />
        </Story.SubSection>
      </Story.Section>
      <Story.Section title="Vertical">
        <HStack height={100}>
          <View flexGrow={1}>
            <Text />
          </View>
          <Separator vertical />
          <View flexGrow={1}>
            <Text />
          </View>
        </HStack>
      </Story.Section>
    </Story>
  ),
};
