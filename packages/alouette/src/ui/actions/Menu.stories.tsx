import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyRegularIcon } from "alouette-icons/phosphor-icons/CopyRegularIcon";
import { GearRegularIcon } from "alouette-icons/phosphor-icons/GearRegularIcon";
import { PencilSimpleRegularIcon } from "alouette-icons/phosphor-icons/PencilSimpleRegularIcon";
import { SignOutRegularIcon } from "alouette-icons/phosphor-icons/SignOutRegularIcon";
import { TrashRegularIcon } from "alouette-icons/phosphor-icons/TrashRegularIcon";
import { UserCircleRegularIcon } from "alouette-icons/phosphor-icons/UserCircleRegularIcon";
import { type ReactNode, useState } from "react";
import { Text } from "../primitives/Text";
import { Separator } from "../stacks/Separator";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

type ThisStory = StoryObj<typeof Menu>;

export default {
  title: "alouette/Actions/Menu",
  component: Menu,
  parameters: {
    componentSubtitle:
      "A pressable that opens a list of actions: anchored under its trigger on web, an overlay on native.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<Menu
  label="Account"
  header={<Text className="text-sm text-muted">chris@example.com</Text>}
  render={(trigger) => <Button {...trigger} text="Account" />}
>
  <MenuItem label="Profile" icon={<UserCircleRegularIcon />} onPress={openProfile} />
  <Separator role="separator" className="my-xxs" />
  <MenuItem label="Log out" icon={<SignOutRegularIcon />} accent="danger" onPress={logOut} />
</Menu>
~~~

- \`render\` hands the trigger its \`ref\`, \`onPress\`, \`aria-haspopup\` and \`aria-expanded\` — spread them onto any pressable
- Use it for actions that are secondary, rare or destructive; a primary action stays a \`Button\` in the bar
- An item runs its \`onPress\` and closes the menu; \`accent\` colours its label and icon, \`href\` makes it a real link on web
- \`header\` renders outside the \`menu\` element, because a menu owns menu items only
- The first item takes focus on open; arrows and Home/End move between items, the pointer moves it as it goes over a row, Escape closes and returns focus to the trigger`,
      },
    },
  },
} satisfies Meta<typeof Menu>;

function AccountMenu(): ReactNode {
  return (
    <Menu
      label="Account"
      header={<Text className="text-sm text-muted">camille@example.com</Text>}
      render={(trigger) => <Button size="sm" text="Account" {...trigger} />}
    >
      <MenuItem label="Profile" icon={<UserCircleRegularIcon />} href="/me" />
      <MenuItem label="Settings" icon={<GearRegularIcon />} href="/settings" />
      <Separator role="separator" className="my-xxs" />
      <MenuItem
        label="Log out"
        icon={<SignOutRegularIcon />}
        accent="danger"
        onPress={fn()}
      />
    </Menu>
  );
}

export const PreviewMenuStory: ThisStory = {
  name: "Menu Preview",
  render: () => <AccountMenu />,
};

export const VariantsMenuStory: ThisStory = {
  name: "Menu Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="With a header">
        <AccountMenu />
      </Story.Section>

      <Story.Section withSurface title="Actions only">
        <Menu
          label="Row actions"
          render={(trigger) => (
            <IconButton
              aria-label="Row actions"
              icon={<PencilSimpleRegularIcon />}
              size="sm"
              variant="ghost"
              {...trigger}
            />
          )}
        >
          <MenuItem
            label="Rename"
            icon={<PencilSimpleRegularIcon />}
            onPress={fn()}
          />
          <MenuItem
            label="Duplicate"
            icon={<CopyRegularIcon />}
            onPress={fn()}
          />
          <MenuItem disabled label="Archive" onPress={fn()} />
          <Separator role="separator" className="my-xxs" />
          <MenuItem
            label="Delete"
            icon={<TrashRegularIcon />}
            accent="danger"
            onPress={fn()}
          />
        </Menu>
      </Story.Section>

      <Story.Section withSurface title="Without icons">
        <Menu
          label="Sort"
          render={(trigger) => (
            <Button size="sm" variant="outlined" text="Sort" {...trigger} />
          )}
        >
          <MenuItem label="Newest first" onPress={fn()} />
          <MenuItem label="Oldest first" onPress={fn()} />
          <MenuItem label="Name" onPress={fn()} />
        </Menu>
      </Story.Section>
    </Story>
  ),
};

function MenuDemo(): ReactNode {
  const [lastAction, setLastAction] = useState("none");

  return (
    <VStack className="gap-m items-start">
      <Menu
        label="Document actions"
        header={<Text className="text-sm text-muted">report.pdf</Text>}
        render={(trigger) => <Button size="sm" text="Actions" {...trigger} />}
      >
        <MenuItem
          label="Rename"
          icon={<PencilSimpleRegularIcon />}
          onPress={() => {
            setLastAction("rename");
          }}
        />
        <MenuItem
          disabled
          label="Archive"
          onPress={() => {
            setLastAction("archive");
          }}
        />
        <MenuItem label="Open" href="/open" />
        <Separator role="separator" className="my-xxs" />
        <MenuItem
          label="Delete"
          icon={<TrashRegularIcon />}
          accent="danger"
          onPress={() => {
            setLastAction("delete");
          }}
        />
      </Menu>
      <Text>{`last action: ${lastAction}`}</Text>
    </VStack>
  );
}

export const TestsMenuStory: ThisStory = {
  name: "Menu Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Document actions">
        <MenuDemo />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The panel is portaled out of the canvas, so it is queried from `screen`.
    const trigger = canvas.getByRole("button", { name: "Actions" });

    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await userEvent.click(trigger);

    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const menu = await screen.findByRole("menu", { name: "Document actions" });

    const items = within(menu).getAllByRole("menuitem");
    const [rename, archive, open] = items;
    if (!rename || !archive || !open) {
      throw new Error("expected four menu items");
    }

    await expect(archive).toHaveAttribute("aria-disabled", "true");
    // A real link on web, and a disabled item drops its href.
    await expect(open.tagName).toBe("A");
    await expect(open).toHaveAttribute("href", "/open");
    for (const item of items) {
      await expect(item.getBoundingClientRect().height).toBeGreaterThanOrEqual(
        44,
      );
    }
    // The panel is wider than the trigger it hangs off, and right-aligned to it.
    const triggerBox = trigger.getBoundingClientRect();
    const menuBox = menu.getBoundingClientRect();
    await expect(menuBox.width).toBeGreaterThan(triggerBox.width);
    await expect(Math.abs(menuBox.right - triggerBox.right)).toBeLessThan(20);

    // The header sits outside the menu element: a menu owns menu items only.
    await expect(within(menu).queryByText("report.pdf")).toBe(null);
    await expect(screen.getByText("report.pdf")).toBeTruthy();

    // Focus opens on the first item, arrows move over the enabled ones only.
    await waitFor(() => expect(rename).toHaveFocus());
    await userEvent.keyboard("{ArrowDown}");
    await expect(open).toHaveFocus();
    await userEvent.keyboard("{End}");
    await expect(
      within(menu).getByRole("menuitem", { name: "Delete" }),
    ).toHaveFocus();
    await userEvent.keyboard("{Home}");
    await expect(rename).toHaveFocus();

    // No focus ring on a menu row: the focus follows the pointer here, and the
    // row's own fill already shows where the cursor is. `outline-none` cannot
    // express that in this stack (react-native-css drops `outline-style: none`),
    // hence the zero-width outline this asserts.
    await expect(getComputedStyle(rename).outlineWidth).toBe("0px");

    // The pointer carries the focus with it, so a hovered row is the only lit
    // one; a disabled row takes neither the focus nor the highlight.
    await userEvent.hover(open);
    await expect(open).toHaveFocus();
    await userEvent.hover(archive);
    await expect(open).toHaveFocus();

    // Escape closes and hands the focus back to the trigger.
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
    await expect(trigger).toHaveFocus();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    // An item press runs its handler and closes the menu.
    await userEvent.click(trigger);
    await userEvent.click(
      within(await screen.findByRole("menu")).getByRole("menuitem", {
        name: "Rename",
      }),
    );

    await waitFor(() =>
      expect(canvas.getByText("last action: rename")).toBeTruthy(),
    );
    await expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  },
};
