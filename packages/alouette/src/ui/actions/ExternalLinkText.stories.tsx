import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BookOpenRegularIcon } from "alouette-icons/phosphor-icons/BookOpenRegularIcon";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Paragraph } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { ExternalLinkText } from "./ExternalLinkText";

type ThisStory = StoryObj<typeof ExternalLinkText>;

export default {
  title: "alouette/Actions/ExternalLinkText",
  component: ExternalLinkText,
  parameters: {
    componentSubtitle:
      "Text link to an external destination, with a leading affordance icon — the lightweight alternative to ExternalLinkButton",
    docs: {
      description: {
        component: `Opens through \`ExternalLink\`: a real \`<a target="_blank" rel="noopener noreferrer">\`
on web, the themed in-app browser sheet on native. Pass \`openLinkBehavior\` for
same-tab web navigation or the native \`Linking\` app switch.

### Usage
~~~tsx
<ExternalLinkText href="https://storybook.js.org/" text="Open Storybook" />

<ExternalLinkText size="sm" accent="info" href="https://example.com" text="Learn more" />

<ExternalLinkText
  href="https://example.com"
  text="Same tab"
  openLinkBehavior={{ native: "linking", web: "targetSelf" }}
/>
~~~`,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    accent: {
      control: "select",
      options: [undefined, ...accents],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof ExternalLinkText>;

export const PreviewExternalLinkTextStory: ThisStory = {
  name: "ExternalLinkText Preview",
  args: {
    href: "https://storybook.js.org/",
    text: "Open Storybook",
  },
};

function AccentVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <StoryGrid.Col title={accent ?? "Default"}>
      <VStack className="gap-xs items-start">
        <ExternalLinkText
          accent={accent}
          href="https://storybook.js.org/"
          text="Open Storybook"
        />
        <ExternalLinkText
          disabled
          accent={accent}
          href="https://storybook.js.org/"
          text="Disabled"
        />
      </VStack>
    </StoryGrid.Col>
  );
}

export const VariantsExternalLinkTextStory: ThisStory = {
  name: "ExternalLinkText Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="Sizes">
        <StoryGrid.Row flexWrap>
          {(["sm", "md"] as const).map((size) => (
            <StoryGrid.Col key={size} title={size}>
              <ExternalLinkText
                size={size}
                href="https://storybook.js.org/"
                text="Open Storybook"
              />
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface title="Accents">
        <StoryGrid.Row flexWrap>
          <AccentVariant />
          {accents.map((accent) => (
            <AccentVariant key={accent} accent={accent} />
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface title="Custom icon">
        <ExternalLinkText
          icon={<BookOpenRegularIcon />}
          href="https://storybook.js.org/docs"
          text="Read the documentation"
        />
      </Story.Section>

      <Story.Section withSurface title="In a text flow">
        <VStack className="gap-xs items-start max-w-[420px]">
          <Paragraph>
            Every component is documented with its props, its variants and a
            play test.
          </Paragraph>
          <ExternalLinkText
            size="sm"
            href="https://storybook.js.org/docs"
            text="Read the documentation about writing stories and play functions"
          />
        </VStack>
      </Story.Section>
    </Story>
  ),
};

export const TestsExternalLinkTextStory: ThisStory = {
  name: "ExternalLinkText Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Enabled">
        <ExternalLinkText
          href="https://storybook.js.org/"
          text="Open Storybook"
        />
      </Story.Section>
      <Story.Section title="Disabled">
        <ExternalLinkText
          disabled
          href="https://storybook.js.org/"
          text="Open Storybook disabled"
        />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link", { name: "Open Storybook" });
    await expect(link.tagName).toBe("A");
    await expect(link).toHaveAttribute("href", "https://storybook.js.org/");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");

    const disabledLink = canvas.getByRole("link", {
      name: "Open Storybook disabled",
    });
    await expect(disabledLink).toHaveAttribute("aria-disabled", "true");
    await expect(disabledLink).not.toHaveAttribute("href");
  },
};
