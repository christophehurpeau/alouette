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
            accent="danger"
            onPress={() => {
              console.log("Danger pressed");
            }}
          >
            <Text className="text-on-accent">Danger</Text>
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
            <VStack className="gap-xxs">
              <Text className="font-body-bold">Notifications</Text>
              <Text className="text-sm text-muted">
                Manage your notification preferences
              </Text>
            </VStack>
          </PressableListItem>
          <PressableListItem
            onPress={() => {
              console.log("Privacy");
            }}
          >
            <VStack className="gap-xxs">
              <Text className="font-body-bold">Privacy & Security</Text>
              <Text className="text-sm text-muted">
                Control your privacy settings
              </Text>
            </VStack>
          </PressableListItem>
          <PressableListItem
            onPress={() => {
              console.log("Account");
            }}
          >
            <VStack className="gap-xxs">
              <Text className="font-body-bold">Account Settings</Text>
              <Text className="text-sm text-muted">
                Update your account information
              </Text>
            </VStack>
          </PressableListItem>
        </VStack>
      </Story.Section>
      <Story.Section title="Menu Example">
        <Box className="rounded-md overflow-hidden">
          <VStack>
            <PressableListItem
              variant="contained"
              onPress={() => {
                console.log("Profile");
              }}
            >
              <Text>View Profile</Text>
            </PressableListItem>
            <PressableListItem
              variant="contained"
              onPress={() => {
                console.log("Edit");
              }}
            >
              <Text>Edit Profile</Text>
            </PressableListItem>
            <PressableListItem
              variant="contained"
              onPress={() => {
                console.log("Share");
              }}
            >
              <Text>Share Profile</Text>
            </PressableListItem>
            <PressableListItem
              accent="danger"
              variant="contained"
              onPress={() => {
                console.log("Logout");
              }}
            >
              <Text className="text-on-accent">Logout</Text>
            </PressableListItem>
          </VStack>
        </Box>
      </Story.Section>
    </Story>
  ),
};
