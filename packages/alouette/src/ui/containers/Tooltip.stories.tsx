import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArchiveDuotoneIcon,
  ArchiveRegularIcon,
} from "alouette-icons/phosphor-icons/Archive";
import { IconButton } from "../actions/IconButton";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { Tooltip } from "./Tooltip";

type ThisStory = StoryObj<typeof Tooltip>;

export default {
  title: "alouette/Containers/Tooltip",
  component: Tooltip,
  parameters: {
    componentSubtitle:
      "Describes an element, shown above it on hover and keyboard focus on web",
    docs: {
      description: {
        component: `\`render\` returns the described element and spreads the trigger props onto it: \`aria-describedby\` on web, \`accessibilityHint\` on native, so the content is read with the element whether or not the panel is shown. Native has no hover and shows no panel.

The panel opens on hover and on keyboard focus (never on a click, which leaves the focus behind), and \`Escape\` closes it.

For a disabled button, pass \`disabledReason\` to \`Button\`, \`IconButton\` or \`ActionButton\` instead: it disables the button, describes it with the reason and renders this tooltip, shown on hover since a disabled button takes no focus.

The handlers sit on the described element itself, so spread \`triggerProps\` last, or merge them with \`mergeTooltipTriggerProps(ownProps, triggerProps)\` to keep the element's own \`aria-describedby\` and handlers. \`content={null}\` renders the element alone, in the same tree. The panel opens above the element, or below it when there is no room above, and lines up with its right edge near the right of the viewport.

### Usage
~~~tsx
<Tooltip
  content="Archive"
  render={(triggerProps) => (
    <IconButton {...triggerProps} icon={<ArchiveRegularIcon />} aria-label="Archive" />
  )}
/>
~~~`,
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export const PreviewTooltipStory: ThisStory = {
  name: "Tooltip Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: { content: "Archive the project" },
  render: (args) => (
    <Tooltip
      {...args}
      render={(triggerProps) => (
        <IconButton
          {...triggerProps}
          icon={<ArchiveRegularIcon />}
          activeIcon={<ArchiveDuotoneIcon />}
          aria-label="Archive"
        />
      )}
    />
  ),
};

export const TooltipVariantsStory: ThisStory = {
  name: "Tooltip Variants",
  render: () => (
    <Story>
      <Story.Section title="Short content">
        <Tooltip
          content="Archive the project"
          render={(triggerProps) => (
            <IconButton
              {...triggerProps}
              icon={<ArchiveRegularIcon />}
              activeIcon={<ArchiveDuotoneIcon />}
              aria-label="Archive"
            />
          )}
        />
      </Story.Section>
      <Story.Section title="Without content">
        <Tooltip
          content={null}
          render={(triggerProps) => (
            <IconButton
              {...triggerProps}
              icon={<ArchiveRegularIcon />}
              aria-label="Archive without tooltip"
            />
          )}
        />
      </Story.Section>
      <Story.Section title="Long content">
        <Tooltip
          content="Archiving moves the project and its deployments out of the dashboard; it can be restored from the archive at any time."
          render={(triggerProps) => (
            <IconButton
              {...triggerProps}
              icon={<ArchiveRegularIcon />}
              activeIcon={<ArchiveDuotoneIcon />}
              aria-label="Archive with details"
            />
          )}
        />
      </Story.Section>
    </Story>
  ),
};

async function expectInViewport(element: HTMLElement): Promise<void> {
  const rect = element.getBoundingClientRect();
  await expect(rect.top).toBeGreaterThanOrEqual(0);
  await expect(rect.left).toBeGreaterThanOrEqual(0);
  await expect(rect.right).toBeLessThanOrEqual(window.innerWidth);
}

async function expectBeside(
  panel: HTMLElement,
  trigger: HTMLElement,
): Promise<void> {
  const panelRect = panel.getBoundingClientRect();
  const triggerRect = trigger.getBoundingClientRect();
  await expect(
    panelRect.bottom <= triggerRect.top || panelRect.top >= triggerRect.bottom,
  ).toBe(true);
}

/**
 * Hover (onto the panel too), keyboard focus and Escape, in one mode so the
 * names are unique. Ends with the panel open, so it is snapshotted.
 */
export const TooltipInteractionStory: ThisStory = {
  name: "Tooltip Interaction",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Hover and keyboard focus">
        <View className="flex-row justify-between">
          <Tooltip
            content="Archive the project"
            render={(triggerProps) => (
              <IconButton
                {...triggerProps}
                icon={<ArchiveRegularIcon />}
                aria-label="Archive"
              />
            )}
          />
          <Tooltip
            content="Archiving moves the project and its deployments out of the dashboard; it can be restored from the archive at any time."
            render={(triggerProps) => (
              <IconButton
                {...triggerProps}
                icon={<ArchiveRegularIcon />}
                aria-label="Archive with details"
              />
            )}
          />
        </View>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Archive" });
    const detailsButton = canvas.getByRole("button", {
      name: "Archive with details",
    });
    const queryTooltip = (): HTMLElement | null =>
      screen.queryByRole("tooltip", { hidden: true });

    await expect(button).toHaveAccessibleDescription("Archive the project");
    await expect(queryTooltip()).not.toBeInTheDocument();

    await userEvent.hover(button);
    const tooltip = await screen.findByRole("tooltip", { hidden: true });
    await expect(tooltip).toHaveTextContent("Archive the project");
    await expectBeside(tooltip, button);
    await expectInViewport(tooltip);

    // The pointer can move onto the panel without closing it.
    await userEvent.hover(tooltip);
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
    await expect(queryTooltip()).toBeInTheDocument();

    await userEvent.unhover(tooltip);
    await waitFor(() => expect(queryTooltip()).not.toBeInTheDocument());

    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(
      await screen.findByRole("tooltip", { hidden: true }),
    ).toHaveTextContent("Archive the project");

    await userEvent.tab();
    await expect(detailsButton).toHaveFocus();
    await waitFor(() =>
      expect(queryTooltip()).toHaveTextContent(/^Archiving moves/),
    );

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(queryTooltip()).not.toBeInTheDocument());

    // At the right edge, the panel lines up with the trigger's right edge.
    await userEvent.hover(detailsButton);
    const detailsTooltip = await screen.findByRole("tooltip", { hidden: true });
    await expectBeside(detailsTooltip, detailsButton);
    await expectInViewport(detailsTooltip);
  },
};
