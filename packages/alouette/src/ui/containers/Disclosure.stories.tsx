import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import { Button } from "../actions/Button";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { Box } from "./Box";
import { Disclosure } from "./Disclosure";

type ThisStory = StoryObj<typeof Disclosure>;

function ToolList(): ReactNode {
  return (
    <View className="gap-xxs">
      <Text className="font-mono text-xs">Read Disclosure.tsx</Text>
      <Text className="font-mono text-xs">Grep aria-expanded</Text>
      <Text className="font-mono text-xs">Edit index.ts</Text>
    </View>
  );
}

interface ToolCardProps {
  tool: string;
  detail: string;
  className: string;
}

function ToolCard({ tool, detail, className }: ToolCardProps): ReactNode {
  return (
    <Box className={className}>
      <Text className="font-body-bold text-sm">{tool}</Text>
      <Text className="font-mono text-xs text-muted">{detail}</Text>
    </Box>
  );
}

function ControlledDisclosure(): ReactNode {
  const [expanded, setExpanded] = useState(false);
  return (
    <View className="items-start gap-xs">
      <Button
        accent="neutral"
        text={expanded ? "Collapse from outside" : "Expand from outside"}
        onPress={() => {
          setExpanded((current) => !current);
        }}
      />
      <Disclosure
        label="Controlled"
        expanded={expanded}
        onExpandedChange={setExpanded}
      >
        <ToolList />
      </Disclosure>
    </View>
  );
}

export default {
  title: "alouette/Containers/Disclosure",
  component: Disclosure,
  parameters: {
    componentSubtitle:
      "A caret row that shows or hides the content below it, such as the details behind a summary.",
  },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    defaultExpanded: { control: "boolean" },
  },
} satisfies Meta<typeof Disclosure>;

export const DisclosurePreviewStory: ThisStory = {
  name: "Disclosure Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: {
    label: "5 tools used",
    children: <ToolList />,
    onExpandedChange: fn(),
  },
};

export const DisclosureVariantsStory: ThisStory = {
  name: "Disclosure Variants",
  render: () => (
    <Story>
      <Story.Section title="Collapsed">
        <Disclosure label="5 tools used">
          <ToolList />
        </Disclosure>
      </Story.Section>
      <Story.Section title="Expanded">
        <Disclosure defaultExpanded label="3 tools used">
          <ToolList />
        </Disclosure>
      </Story.Section>
      <Story.Section title="Disabled">
        <Disclosure disabled label="No tools used">
          <ToolList />
        </Disclosure>
      </Story.Section>
      <Story.Section title="Controlled">
        <ControlledDisclosure />
      </Story.Section>
      <Story.Section title="Surfaces inside">
        <Disclosure defaultExpanded label="2 tools used">
          <View className="gap-xs">
            <ToolCard
              className="surface surface-sm"
              tool="Read"
              detail="src/ui/containers/Disclosure.tsx"
            />
            <ToolCard
              className="surface surface-sm"
              tool="Grep"
              detail="aria-expanded in src/ui"
            />
          </View>
        </Disclosure>
      </Story.Section>
      <Story.Section title="Inside a surface">
        <Box className="surface">
          <Disclosure defaultExpanded label="2 tools used">
            <View className="gap-xs">
              <ToolCard
                className="surface-flat surface-sm"
                tool="Read"
                detail="src/ui/containers/Disclosure.tsx"
              />
              <ToolCard
                className="surface-flat surface-sm"
                tool="Grep"
                detail="aria-expanded in src/ui"
              />
            </View>
          </Disclosure>
        </Box>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Story renders every section in the light and the dark theme: the light
    // copy comes first.
    const button = (name: string): HTMLElement =>
      canvas.getAllByRole("button", { name })[0]!;

    const trigger = button("5 tools used");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger.getBoundingClientRect().height).toBeGreaterThanOrEqual(
      44,
    );
    const contentId = trigger.getAttribute("aria-controls");
    if (contentId === null) throw new Error("trigger has no aria-controls");
    const content = canvasElement.ownerDocument.getElementById(contentId);
    if (content === null) throw new Error("aria-controls target is missing");
    await expect(content).toBeEmptyDOMElement();

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    // collapse-in starts at opacity 0.
    await waitFor(
      async () => {
        await expect(
          within(content).getByText("Read Disclosure.tsx"),
        ).toBeVisible();
      },
      { timeout: 2000 },
    );

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await waitFor(
      async () => {
        await expect(content).toBeEmptyDOMElement();
      },
      { timeout: 2000 },
    );

    const expanded = button("3 tools used");
    await expect(expanded).toHaveAttribute("aria-expanded", "true");
    // Open from the first render: in place, not animating in on page load.
    const expandedContent = canvasElement.ownerDocument.getElementById(
      expanded.getAttribute("aria-controls") ?? "",
    );
    if (expandedContent === null) throw new Error("expanded content missing");
    for (const element of expandedContent.querySelectorAll("*")) {
      await expect(getComputedStyle(element).animationName).toBe("none");
    }

    const disabled = button("No tools used");
    await expect(disabled).toBeDisabled();
    await expect(disabled).toHaveAttribute("aria-expanded", "false");

    const controlled = button("Controlled");
    await userEvent.click(button("Expand from outside"));
    await expect(controlled).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(controlled);
    await expect(controlled).toHaveAttribute("aria-expanded", "false");
    await expect(button("Expand from outside")).toBeVisible();
  },
};
