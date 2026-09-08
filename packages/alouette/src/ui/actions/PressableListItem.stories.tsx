import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { PressableListItem } from "./PressableListItem";

type ThisStory = StoryObj<typeof PressableListItem>;

export default {
  title: "alouette/Actions/PressableListItem",
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
            accent="warning"
            onPress={() => {
              console.log("Warning pressed");
            }}
          >
            <Text className="text-on-list">Warning</Text>
          </PressableListItem>
          <PressableListItem
            accent="danger"
            onPress={() => {
              console.log("Danger pressed");
            }}
          >
            <Text className="text-on-list">Danger</Text>
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
              onPress={() => {
                console.log("Profile");
              }}
            >
              <Text>View Profile</Text>
            </PressableListItem>
            <PressableListItem
              onPress={() => {
                console.log("Edit");
              }}
            >
              <Text>Edit Profile</Text>
            </PressableListItem>
            <PressableListItem
              onPress={() => {
                console.log("Share");
              }}
            >
              <Text>Share Profile</Text>
            </PressableListItem>
            <PressableListItem
              accent="danger"
              onPress={() => {
                console.log("Logout");
              }}
            >
              <Text className="text-on-list">Logout</Text>
            </PressableListItem>
          </VStack>
        </Box>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getAllByRole("button", { name: "First Item" })[0]!;
    const style = getComputedStyle(row);
    // Tokens resolve per scope, so an accented row reads its own values.
    const tokenOf = (scope: CSSStyleDeclaration, name: string): string => {
      const hex = scope.getPropertyValue(name).trim();
      const channels = [1, 3, 5].map((i) =>
        Number.parseInt(hex.slice(i, i + 2), 16),
      );
      return `rgb(${channels.join(", ")})`;
    };
    const token = (name: string): string => tokenOf(style, name);

    // A list row is the `list` material, not the contained button one: its
    // ground is a tone of the theme and its label keeps the sharp ink, so an
    // un-accented row never renders dark text on the neutral accent's fill.
    await expect(style.backgroundColor).toBe(
      token("--color-interactive-list-pressable"),
    );
    await expect(style.backgroundColor).not.toBe(
      token("--color-interactive-contained-pressable"),
    );
    await expect(
      getComputedStyle(within(row).getByText("First Item")).color,
    ).toBe(token("--color-sharp"));

    // An accented row tints its card instead of taking the accent's fill — the
    // ground stays light enough for dark ink — and states the accent in its ink
    // (`text-on-list`, the accent itself in light mode), which no light tint of
    // a red can do on its own.
    const danger = canvas.getAllByRole("button", { name: "Danger" })[0]!;
    const dangerStyle = getComputedStyle(danger);
    const dangerChannels = [...dangerStyle.backgroundColor.matchAll(/[\d.]+/g)]
      .slice(0, 3)
      .map(Number);
    await expect(new Set(dangerChannels).size).not.toBe(1);
    await expect(Math.min(...dangerChannels)).toBeGreaterThan(200);
    await expect(
      getComputedStyle(within(danger).getByText("Danger")).color,
    ).toBe(tokenOf(dangerStyle, "--color-on-list"));
    await expect(tokenOf(dangerStyle, "--color-on-list")).not.toBe(
      tokenOf(dangerStyle, "--color-sharp"),
    );
  },
};
