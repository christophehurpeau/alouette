import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { Typography } from "../typography/Typography";
import { PressableListItem } from "./PressableListItem";

type ThisStory = StoryObj<typeof PressableListItem>;

export default {
  title: "alouette/layout/PressableListItem",
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
- Use Typography for text content
- Wrap multiple items in a container

### Usage
~~~tsx
<VStack>
  <PressableListItem onPress={handlePress}>
    <Typography>List Item</Typography>
  </PressableListItem>
  <PressableListItem onPress={handlePress2}>
    <Typography>Another Item</Typography>
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
    children: <Typography>List Item</Typography>,
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
            <Typography>First Item</Typography>
          </PressableListItem>
          <PressableListItem
            onPress={() => {
              console.log("Item 2 pressed");
            }}
          >
            <Typography>Second Item</Typography>
          </PressableListItem>
          <PressableListItem
            onPress={() => {
              console.log("Item 3 pressed");
            }}
          >
            <Typography>Third Item</Typography>
          </PressableListItem>
          <PressableListItem
            withBackground
            theme="danger"
            borderRadius="$xs"
            onPress={() => {
              console.log("Item 3 pressed");
            }}
          >
            <Typography>Danger</Typography>
          </PressableListItem>
        </VStack>
      </Story.Section>
      <Story.Section title="Multi-line Content">
        <VStack>
          <PressableListItem
            variant="elevated"
            borderRadius="$xs"
            onPress={() => {
              console.log("Notifications");
            }}
          >
            <VStack gap="$1">
              <Typography weight="$bold">Notifications</Typography>
              <Typography size="$sm" opacity={0.7}>
                Manage your notification preferences
              </Typography>
            </VStack>
          </PressableListItem>
          <PressableListItem
            variant="elevated"
            borderRadius="$xs"
            onPress={() => {
              console.log("Privacy");
            }}
          >
            <VStack gap="$1">
              <Typography weight="$bold">Privacy & Security</Typography>
              <Typography size="$sm" opacity={0.7}>
                Control your privacy settings
              </Typography>
            </VStack>
          </PressableListItem>
          <PressableListItem
            variant="elevated"
            borderRadius="$xs"
            onPress={() => {
              console.log("Account");
            }}
          >
            <VStack gap="$1">
              <Typography weight="$bold">Account Settings</Typography>
              <Typography size="$sm" opacity={0.7}>
                Update your account information
              </Typography>
            </VStack>
          </PressableListItem>
        </VStack>
      </Story.Section>
      <Story.Section title="Menu Example">
        <Box withBackground withBorder borderRadius="$md" overflow="hidden">
          <VStack>
            <PressableListItem
              onPress={() => {
                console.log("Profile");
              }}
            >
              <Typography>View Profile</Typography>
            </PressableListItem>
            <PressableListItem
              onPress={() => {
                console.log("Edit");
              }}
            >
              <Typography>Edit Profile</Typography>
            </PressableListItem>
            <PressableListItem
              onPress={() => {
                console.log("Share");
              }}
            >
              <Typography>Share Profile</Typography>
            </PressableListItem>
            <Box theme="danger">
              <PressableListItem
                onPress={() => {
                  console.log("Logout");
                }}
              >
                <Typography>Logout</Typography>
              </PressableListItem>
            </Box>
          </VStack>
        </Box>
      </Story.Section>
    </Story>
  ),
};
