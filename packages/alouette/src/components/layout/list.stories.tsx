import type { Meta, StoryObj } from "@storybook/react";
import { VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { Typography } from "../typography/Typography";
import { PressableListItem } from "./list";

export default {
  title: "alouette/layout/List",
  component: PressableListItem,
  parameters: {
    componentSubtitle:
      "A collection of interactive list items for building menus, navigation, and selection interfaces",
    docs: {
      description: {
        component: `
### Features
- Interactive press states
- Consistent spacing and alignment
- Keyboard navigation support
- Proper list semantics
- Flexible content layout

### Variants
- \`onPress\`: Press handler for interaction
- \`disabled\`: Disables item interaction
- \`selected\`: Shows selected state
- \`padding\`: Space around content

### Guidelines
- Group related items together
- Keep content concise and scannable
- Maintain consistent item heights
- Provide clear feedback for interaction
- Consider keyboard navigation order

### Usage
~~~tsx
<VStack>
  <PressableListItem onPress={handlePress}>
    <Typography>List Item</Typography>
  </PressableListItem>
</VStack>
~~~`,
      },
    },
  },
} satisfies Meta<typeof PressableListItem>;

export const PreviewListStory: StoryObj<typeof PressableListItem> = {
  args: {
    onPress: () => {},
    children: <Typography>List Item</Typography>,
  },
  render: (args) => (
    <VStack>
      <PressableListItem {...args} />
    </VStack>
  ),
};

export const Variants: StoryObj<typeof PressableListItem> = {
  render: () => (
    <Story>
      <Story.Section title="States">
        <VStack>
          <PressableListItem onPress={() => {}}>
            <Typography>Default</Typography>
          </PressableListItem>
        </VStack>
      </Story.Section>
    </Story>
  ),
};
