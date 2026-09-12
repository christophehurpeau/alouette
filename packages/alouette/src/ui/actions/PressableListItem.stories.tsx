import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import { Box } from "../containers/Box";
import { Badge } from "../data/Badge";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { HStack, VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { Button } from "./Button";
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

function PressLog({ value }: { value: string }): ReactNode {
  return <Text className="font-mono text-xs text-muted">{value}</Text>;
}

function PullRequestRow(): ReactNode {
  const [pressed, setPressed] = useState("nothing");
  return (
    <VStack className="gap-xs">
      <PressableListItem
        // Without it the row is announced as "Add dark mode #42 opened 3 days
        // ago Approve Merge" — the whole card read out as one name.
        aria-label="Open Add dark mode"
        className="max-w-[420px]"
        actions={
          <>
            <Button
              size="sm"
              accent="neutral"
              text="Approve"
              onPress={() => {
                setPressed("pressed:approve");
              }}
            />
            <Button
              size="sm"
              text="Merge"
              onPress={() => {
                setPressed("pressed:merge");
              }}
            />
          </>
        }
        onPress={() => {
          setPressed("pressed:row");
        }}
      >
        <VStack className="gap-xxs">
          <Text className="font-body-bold">Add dark mode</Text>
          <HStack className="items-center gap-xs">
            <Badge>#42</Badge>
            <Text className="text-sm text-muted">opened 3 days ago</Text>
          </HStack>
        </VStack>
      </PressableListItem>
      <PressLog value={pressed} />
    </VStack>
  );
}

function ListItemRow(): ReactNode {
  const [pressed, setPressed] = useState("nothing");
  return (
    <View role="list">
      <PressableListItem
        // `button` is a real <button> on web, and an action nests a second one
        // inside it. `listitem` renders an <li>, which holds buttons legally —
        // at the cost of the row announcing itself as actionable.
        role="listitem"
        aria-label="Open Ship the docs"
        actions={
          <Button
            size="sm"
            text="Publish"
            onPress={() => {
              setPressed("li:publish");
            }}
          />
        }
        onPress={() => {
          setPressed("li:row");
        }}
      >
        <Text className="font-body-bold">Ship the docs</Text>
      </PressableListItem>
      <PressLog value={pressed} />
    </View>
  );
}

function RouterRow(): ReactNode {
  const [navigation, setNavigation] = useState("nothing");
  return (
    <VStack className="gap-xs">
      <PressableListItem
        href="/pull/42"
        aria-label="Open Ship it"
        className="max-w-[420px]"
        // Routing belongs to the app: the anchor must not follow its own href.
        onPress={(event) => {
          event.preventDefault();
          setNavigation(`prevented:${String(event.defaultPrevented)}`);
        }}
      >
        <VStack className="gap-xxs">
          <Text className="font-body-bold">Ship it</Text>
          <Text className="text-sm text-muted">opened 3 days ago</Text>
        </VStack>
      </PressableListItem>
      <PressLog value={navigation} />
    </VStack>
  );
}

export const Variants: ThisStory = {
  render: () => (
    <Story
      documentation={
        <Text>
          A row carrying more than a title needs an `aria-label` — without one
          it is announced by everything it holds. `actions` pins buttons to its
          bottom end, each taking the press for itself. `href` makes it a real
          anchor, and is only for a row holding no link of its own.
        </Text>
      }
    >
      <Story.Section title="Variants">
        <VStack>
          <PressableListItem variant="contained" onPress={() => {}}>
            <Text className="text-on-accent">contained</Text>
          </PressableListItem>
          <PressableListItem variant="list" onPress={() => {}}>
            <Text className="text-on-list">list</Text>
          </PressableListItem>
          <PressableListItem variant="outlined" onPress={() => {}}>
            <Text>outlined</Text>
          </PressableListItem>
          <PressableListItem variant="ghost" onPress={() => {}}>
            <Text>ghost</Text>
          </PressableListItem>
        </VStack>
      </Story.Section>
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
      <Story.Section title="Row with actions">
        <PullRequestRow />
      </Story.Section>
      <Story.Section title="Row keeping valid markup">
        <ListItemRow />
      </Story.Section>
      <Story.Section title="Row as a link">
        <RouterRow />
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

    // Each variant tints the caret for the ground it sits on: white-ish over
    // the accent's fill, the row's own ink over a `list` card, muted over the
    // bare surface the other two keep at rest. And every one of them is a card,
    // so every one of them is rounded — PressableBox itself only rounds two.
    const variantRowOf = (
      name: string,
    ): { caretColor: string; style: CSSStyleDeclaration } => {
      const variantRow = canvas.getAllByRole("button", { name })[0]!;
      return {
        caretColor: getComputedStyle(variantRow.querySelector("svg")!).color,
        style: getComputedStyle(variantRow),
      };
    };
    const contained = variantRowOf("contained");
    await expect(contained.caretColor).toBe(
      tokenOf(contained.style, "--color-on-accent-muted"),
    );
    const list = variantRowOf("list");
    await expect(list.caretColor).toBe(tokenOf(list.style, "--color-on-list"));
    const outlined = variantRowOf("outlined");
    const ghost = variantRowOf("ghost");
    for (const muted of [outlined, ghost]) {
      await expect(muted.caretColor).toBe(
        tokenOf(muted.style, "--color-muted"),
      );
    }
    for (const { style: variantStyle } of [contained, list, outlined, ghost]) {
      await expect(variantStyle.borderTopLeftRadius).toBe("16px");
    }

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

    // aria-label names the row instead of its contents.
    const pullRequest = canvas.getAllByRole("button", {
      name: "Open Add dark mode",
    })[0]!;
    // className reaches the row's own element.
    await expect(getComputedStyle(pullRequest).maxWidth).toBe("420px");

    // Every action takes the press for itself, and the row still presses on its
    // own content.
    const actions = within(pullRequest);
    await userEvent.click(actions.getByRole("button", { name: "Approve" }));
    await expect(canvas.getAllByText("pressed:approve")[0]).toBeTruthy();
    await userEvent.click(actions.getByRole("button", { name: "Merge" }));
    await expect(canvas.getAllByText("pressed:merge")[0]).toBeTruthy();
    await userEvent.click(actions.getByText("Add dark mode"));
    await expect(canvas.getAllByText("pressed:row")[0]).toBeTruthy();

    // The role escape hatch the `actions` caveat points at: an <li>, so the
    // action's <button> is not nested inside another one.
    const listRow = canvas.getAllByRole("listitem", {
      name: "Open Ship the docs",
    })[0]!;
    await expect(listRow.tagName).toBe("LI");
    await userEvent.click(
      within(listRow).getByRole("button", { name: "Publish" }),
    );
    await expect(canvas.getAllByText("li:publish")[0]).toBeTruthy();
    await userEvent.click(within(listRow).getByText("Ship the docs"));
    await expect(canvas.getAllByText("li:row")[0]).toBeTruthy();

    // The anchor is PressableBox's job and asserted there too — repeated here
    // so the row cannot regress to pinning `role="button"` over the href, and
    // so nothing between the two swallows the destination.
    const link = canvas.getAllByRole("link", { name: "Open Ship it" })[0]!;
    await expect(link.tagName).toBe("A");
    await expect(link.getAttribute("href")).toBe("/pull/42");
    // The handler owns the navigation.
    await userEvent.click(link);
    await expect(canvas.getAllByText("prevented:true")[0]).toBeTruthy();
  },
};
