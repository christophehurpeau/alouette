import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Box } from "../containers/Box";
import { Paragraph } from "../primitives/Text";
import { Story, accentsWithoutNeutral } from "../story-components/Story";
import { Blockquote, BlockquoteFrame } from "./Blockquote";
import { Citation } from "./Citation";
import { CodeBlock } from "./CodeBlock";

type ThisStory = StoryObj<typeof Blockquote>;

export default {
  title: "alouette/Data/Blockquote",
  component: Blockquote,
  subcomponents: { BlockquoteFrame },
  parameters: {
    componentSubtitle:
      "A quoted excerpt set off by an accent rule, with an optional Citation underneath: Blockquote for text, BlockquoteFrame for block content",
  },
  argTypes: {
    accent: {
      description: "The accent of the leading rule",
      control: "select",
      options: accentsWithoutNeutral,
    },
    size: {
      description: "The size of the quoted text",
      control: "inline-radio",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "md" } },
    },
    children: { description: "The quoted text", control: "text" },
  },
} satisfies Meta<typeof Blockquote>;

export const BlockquotePreviewStory: ThisStory = {
  name: "Blockquote Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: {
    children:
      "The only thing that makes life possible is permanent, intolerable uncertainty: not knowing what comes next.",
  },
  render: (args) => <Blockquote {...args} />,
};

interface QuoteProps {
  accent?: Accent;
  size?: "md" | "sm";
  citation?: ReactNode;
}

function Quote({ accent, size, citation }: QuoteProps): ReactNode {
  return (
    <Blockquote accent={accent} citation={citation} size={size}>
      The only thing that makes life possible is permanent, intolerable
      uncertainty: not knowing what comes next.
    </Blockquote>
  );
}

export const BlockquoteVariantsStory: ThisStory = {
  name: "Blockquote Variants",
  render: () => (
    <Story>
      <Story.Section title="Sizes">
        <Quote size="sm" />
        <Quote size="md" />
      </Story.Section>

      <Story.Section title="Several paragraphs">
        <BlockquoteFrame citation={<Citation>Ursula K. Le Guin</Citation>}>
          <Paragraph className="text-lg">
            The only thing that makes life possible is permanent, intolerable
            uncertainty: not knowing what comes next.
          </Paragraph>
          <Paragraph className="text-lg">
            Light is the left hand of darkness.
          </Paragraph>
        </BlockquoteFrame>
      </Story.Section>

      <Story.Section title="Block content">
        <BlockquoteFrame>
          <Paragraph>Run it with:</Paragraph>
          <CodeBlock>pnpm install</CodeBlock>
        </BlockquoteFrame>
      </Story.Section>

      <Story.Section title="Citation">
        <Quote citation={<Citation>Ursula K. Le Guin</Citation>} />
        <Quote
          citation={
            <Citation href="https://example.com/the-left-hand-of-darkness">
              The Left Hand of Darkness
            </Citation>
          }
        />
      </Story.Section>

      <Story.Section title="Accents">
        {accentsWithoutNeutral.map((accent) => (
          <Quote
            key={accent}
            accent={accent}
            citation={<Citation accent={accent}>{accent}</Citation>}
            size="sm"
          />
        ))}
      </Story.Section>

      <Story.Section title="On a raised surface">
        <Box className="surface">
          <Quote
            accent="brand"
            citation={<Citation>Ursula K. Le Guin</Citation>}
          />
        </Box>
      </Story.Section>
    </Story>
  ),
};

export const BlockquoteTestsStory: ThisStory = {
  name: "Blockquote Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Semantics">
        <Blockquote
          citation={
            <Citation href="https://example.com/source">A Source</Citation>
          }
        >
          Quoted text.
        </Blockquote>
      </Story.Section>
      <Story.Section title="Block content">
        <BlockquoteFrame>
          <Paragraph>First paragraph.</Paragraph>
          <Paragraph>Second paragraph.</Paragraph>
        </BlockquoteFrame>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const quote = canvas.getByText("Quoted text.");
    // react-native-web maps role="blockquote" onto a real <blockquote>, and the
    // quote itself is a Paragraph, so a <p>.
    await expect(quote.tagName).toBe("P");
    const blockquote = quote.closest("blockquote");
    await expect(blockquote).not.toBeNull();

    const link = canvas.getByRole("link", { name: "A Source" });
    await expect(blockquote?.contains(link)).toBe(true);
    await expect(link).toHaveAttribute("href", "https://example.com/source");

    // BlockquoteFrame renders its children as they are: each paragraph is a direct
    // child of the <blockquote>, not nested in a <p> of its own.
    const first = canvas.getByText("First paragraph.");
    const second = canvas.getByText("Second paragraph.");
    await expect(first.tagName).toBe("P");
    await expect(first.parentElement?.tagName).toBe("BLOCKQUOTE");
    await expect(second.parentElement).toBe(first.parentElement);
  },
};
