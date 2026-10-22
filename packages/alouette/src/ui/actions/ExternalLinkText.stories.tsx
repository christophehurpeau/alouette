import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BookOpenRegularIcon } from "alouette-icons/phosphor-icons/BookOpen";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Paragraph } from "../primitives/Text";
import { View } from "../primitives/View";
import {
  Story,
  accentsWithoutNeutral,
  neutralAndAccents,
} from "../story-components/Story";
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
      options: neutralAndAccents,
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof ExternalLinkText>;

export const PreviewExternalLinkTextStory: ThisStory = {
  name: "ExternalLinkText Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: {
    href: "https://storybook.js.org/",
    text: "Open Storybook",
  },
};

function AccentVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <StoryGrid.Col title={accent ?? "Default"}>
      <View className="gap-xs items-start">
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
      </View>
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
          {accentsWithoutNeutral.map((accent) => (
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

      <Story.Section withSurface title="Without icon">
        <ExternalLinkText
          icon={null}
          href="https://github.com/christophehurpeau/alouette/issues/371"
          text="#371"
        />
      </Story.Section>

      <Story.Section withSurface title="In a text flow">
        <View className="gap-xs items-start max-w-[420px]">
          <Paragraph>
            Every component is documented with its props, its variants and a
            play test.
          </Paragraph>
          <ExternalLinkText
            size="sm"
            href="https://storybook.js.org/docs"
            text="Read the documentation about writing stories and play functions"
          />
          <Paragraph className="text-base">
            {"Every component is documented with its props and variants. See "}
            <ExternalLinkText
              href="https://storybook.js.org/docs"
              text="docs"
            />
            {
              " for the conventions behind stories and play functions, then open an issue if something is missing."
            }
          </Paragraph>
          <Paragraph className="text-base">
            {"Live updates are not enabled. Contact "}
            <ExternalLinkText
              size="sm"
              href="mailto:contact@example.com"
              text="support"
            />
            {
              " to enable them on your workspace, or check the status page for the planned rollout of the feature."
            }
          </Paragraph>
        </View>
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
      <Story.Section title="Without icon">
        <ExternalLinkText
          icon={null}
          href="https://storybook.js.org/"
          text="No icon"
        />
      </Story.Section>
      <Story.Section title="Inside a paragraph">
        <Paragraph className="text-base">
          {"Contact "}
          <ExternalLinkText href="mailto:contact@example.com" text="support" />
          {" to enable it."}
        </Paragraph>
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

    await expect(link.querySelector("svg")).not.toBeNull();
    const noIconLink = canvas.getByRole("link", { name: "No icon" });
    await expect(noIconLink.querySelector("svg")).toBeNull();

    // Same font size on both sides, so equal glyph boxes mean equal baselines.
    const textNodeBottom = (element: Element, text: string): number => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.textContent === text) {
          const range = document.createRange();
          range.selectNodeContents(node);
          return range.getBoundingClientRect().bottom;
        }
      }
      throw new Error(`Text node "${text}" not found`);
    };
    const inlineLink = canvas.getByRole("link", { name: "support" });
    const paragraph = inlineLink.closest("p");
    if (!paragraph) throw new Error("Paragraph not found");
    await expect(
      Math.abs(
        textNodeBottom(inlineLink, "support") -
          textNodeBottom(paragraph, "Contact "),
      ),
    ).toBeLessThanOrEqual(1);
  },
};
