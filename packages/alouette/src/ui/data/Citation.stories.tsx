import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Surface } from "../containers/Surface";
import { Paragraph } from "../primitives/Text";
import { Story, accents } from "../story-components/Story";
import { Citation } from "./Citation";

type ThisStory = StoryObj<typeof Citation>;

export default {
  title: "alouette/Data/Citation",
  component: Citation,
  parameters: {
    componentSubtitle:
      "Attribution for a quote or an excerpt — an em dash and the source, optionally linked",
  },
  argTypes: {
    accent: {
      description: "The accent of the linked source",
      control: "select",
      options: accents,
    },
    size: {
      description: "The size of the attribution",
      control: "inline-radio",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "md" } },
    },
    href: { description: "Links the source when set", control: "text" },
    children: { description: "The source being credited", control: "text" },
  },
} satisfies Meta<typeof Citation>;

export const CitationPreviewStory: ThisStory = {
  name: "Citation Preview",
  args: { children: "Ursula K. Le Guin" },
  render: (args) => <Citation {...args} />,
};

export const CitationVariantsStory: ThisStory = {
  name: "Citation Variants",
  render: () => (
    <Story>
      <Story.Section title="Sizes">
        <Citation size="sm">Ursula K. Le Guin, sm</Citation>
        <Citation size="md">Ursula K. Le Guin, md</Citation>
      </Story.Section>

      <Story.Section title="Linked source">
        <Citation href="https://example.com/the-dispossessed">
          The Dispossessed
        </Citation>
        <Citation
          href="https://example.com/the-dispossessed"
          openLinkBehavior={{ native: "linking", web: "targetSelf" }}
        >
          Opens in the same tab
        </Citation>
      </Story.Section>

      <Story.Section title="Accents">
        {accents.map((accent) => (
          <Citation
            key={accent}
            accent={accent}
            href="https://example.com/source"
          >
            {accent}
          </Citation>
        ))}
      </Story.Section>

      <Story.Section title="Under an excerpt">
        <Surface>
          <Paragraph>
            Light is the left hand of darkness, and darkness the right hand of
            light.
          </Paragraph>
          <Citation href="https://example.com/the-left-hand-of-darkness">
            The Left Hand of Darkness
          </Citation>
        </Surface>
      </Story.Section>
    </Story>
  ),
};

export const CitationTestsStory: ThisStory = {
  name: "Citation Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Plain">
        <Citation>Ursula K. Le Guin</Citation>
      </Story.Section>
      <Story.Section title="Linked">
        <Citation href="https://example.com/source">A Source</Citation>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Ursula K. Le Guin")).toBeTruthy();
    // The em dash is part of the component, not of the source text.
    await expect(canvas.getAllByText("—")).toHaveLength(2);

    const link = canvas.getByRole("link", { name: "A Source" });
    await expect(link).toHaveAttribute("href", "https://example.com/source");
  },
};
