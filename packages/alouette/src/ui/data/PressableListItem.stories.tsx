import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { PressableListItem } from "./PressableListItem";

type ThisStory = StoryObj<typeof PressableListItem>;

export default {
  title: "alouette/Data/PressableListItem",
  component: PressableListItem,
  parameters: {
    componentSubtitle:
      "An interactive list item component for building menus, navigation, and selection interfaces",
    docs: {
      description: {
        component: `
### Features
- Interactive press states with visual feedback
- Consistent spacing and alignment
- Keyboard navigation support
- Proper list semantics
- Built-in chevron indicator
- Flexible content layout

### Props
- \`onPress\`: Press handler for interaction
- \`children\`: Content to display in the list item

### Guidelines
- Group related items together in VStack
- Keep content concise and scannable
- Maintain consistent item heights
- Provide clear feedback for interaction
- Consider keyboard navigation order
- Use Text for text content
- Wrap multiple items in a container

### Usage
~~~tsx
<VStack>
  <PressableListItem onPress={handlePress}>
    <Text>List Item</Text>
  </PressableListItem>
  <PressableListItem onPress={handlePress2}>
    <Text>Another Item</Text>
  </PressableListItem>
</VStack>
~~~`,
      },
    },
  },
} satisfies Meta<typeof PressableListItem>;

export const PreviewListStory: ThisStory = {
  args: {
    onPress: () => {},
    children: <Text>List Item</Text>,
  },
  render: (args) => <PressableListItem {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Basic List">
        <VStack>
          <PressableListItem
            onPress={() => {
              console.log("Item 1 pressed");
            }}
          >
            <Text>First Item</Text>
          </PressableListItem>
          <PressableListItem
            onPress={() => {
              console.log("Item 2 pressed");
            }}
          >
            <Text>Second Item</Text>
          </PressableListItem>
          <PressableListItem
            onPress={() => {
              console.log("Item 3 pressed");
            }}
          >
            <Text>Third Item</Text>
          </PressableListItem>
          <PressableListItem
            theme="danger"
            onPress={() => {
              console.log("Item 3 pressed");
            }}
          >
            <Text tint="onAccent">Danger</Text>
          </PressableListItem>
        </VStack>
      </Story.Section>
      <Story.Section title="Multi-line Content">
        <VStack>
          <PressableListItem
            onPress={() => {
              console.log("Notifications");
            }}
          >
            <VStack gap="$1">
              <Text weight="$bold">Notifications</Text>
              <Text size="$sm" tint="muted">
                Manage your notification preferences
              </Text>
            </VStack>
          </PressableListItem>
          <PressableListItem
            onPress={() => {
              console.log("Privacy");
            }}
          >
            <VStack gap="$1">
              <Text weight="$bold">Privacy & Security</Text>
              <Text size="$sm" tint="muted">
                Control your privacy settings
              </Text>
            </VStack>
          </PressableListItem>
          <PressableListItem
            onPress={() => {
              console.log("Account");
            }}
          >
            <VStack gap="$1">
              <Text weight="$bold">Account Settings</Text>
              <Text size="$sm" tint="muted">
                Update your account information
              </Text>
            </VStack>
          </PressableListItem>
        </VStack>
      </Story.Section>
      <Story.Section title="Menu Example">
        <Box borderRadius="$md" overflow="hidden">
          <VStack>
            <PressableListItem
              variant="ghost-contained"
              onPress={() => {
                console.log("Profile");
              }}
            >
              <Text>View Profile</Text>
            </PressableListItem>
            <PressableListItem
              variant="ghost-contained"
              onPress={() => {
                console.log("Edit");
              }}
            >
              <Text>Edit Profile</Text>
            </PressableListItem>
            <PressableListItem
              variant="ghost-contained"
              onPress={() => {
                console.log("Share");
              }}
            >
              <Text>Share Profile</Text>
            </PressableListItem>

            <PressableListItem
              theme="danger"
              variant="ghost-contained"
              onPress={() => {
                console.log("Logout");
              }}
            >
              <Text tint="accent">Logout</Text>
            </PressableListItem>
          </VStack>
        </Box>
      </Story.Section>
    </Story>
  ),
};
