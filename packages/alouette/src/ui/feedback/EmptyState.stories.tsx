import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfettiRegularIcon } from "alouette-icons/phosphor-icons/Confetti";
import { MagnifyingGlassRegularIcon } from "alouette-icons/phosphor-icons/MagnifyingGlass";
import { Story } from "../story-components/Story";
import { EmptyState } from "./EmptyState";

type ThisStory = StoryObj<typeof EmptyState>;

export default {
  title: "alouette/Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    componentSubtitle:
      "Stands in for a list or a section with nothing to show.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<EmptyState icon={<ConfettiRegularIcon />} title="Nothing to review">
  No pull request is waiting for you.
</EmptyState>
~~~

- A muted 48px icon, a title and an optional muted paragraph, centered
- It stands on the screen ground, where the list would have been: no \`surface\` of its own
- \`className\` adjusts the spacing (\`py-xl\` by default)`,
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export const PreviewEmptyStateStory: ThisStory = {
  name: "EmptyState Preview",
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    title: "Nothing to review",
    children: "No pull request is waiting for you.",
  },
  render: (args) => <EmptyState {...args} icon={<ConfettiRegularIcon />} />,
};

export const VariantsEmptyStateStory: ThisStory = {
  name: "EmptyState Variants",
  render: () => (
    <Story>
      <Story.Section title="Title and explanation">
        <EmptyState icon={<ConfettiRegularIcon />} title="Nothing to review">
          Nothing is waiting for you, and none of your pull requests are in
          progress.
        </EmptyState>
      </Story.Section>
      <Story.Section title="Title only">
        <EmptyState
          icon={<MagnifyingGlassRegularIcon />}
          title="No repository matches"
        />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const [explanation] = canvas.getAllByText(
      "Nothing is waiting for you, and none of your pull requests are in progress.",
    );
    if (!explanation) throw new Error("expected the explanation");
    await expect(explanation.tagName).toBe("P");

    const [titleOnly] = canvas.getAllByText("No repository matches");
    const titleOnlyFrame = titleOnly?.parentElement;
    if (!titleOnlyFrame) throw new Error("expected the title-only frame");
    // Icon and title, no empty paragraph.
    await expect(titleOnlyFrame.querySelector("p")).toBe(null);
  },
};
