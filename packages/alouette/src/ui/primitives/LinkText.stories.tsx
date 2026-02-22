import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ExternalLink } from "../../expo/ExternalLink";
import { Surface } from "../containers/Surface";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { LinkText } from "./LinkText";

type ThisStory = StoryObj<typeof LinkText>;

export default {
  title: "alouette/primitives/LinkText",
  component: LinkText,
  parameters: {
    componentSubtitle: "A consistent link",
  },
} satisfies Meta<typeof LinkText>;

export const PreviewLinkStory: ThisStory = {
  args: {
    children: "Example Link",
  },
  render: (args) => <LinkText {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="External Links">
        <ExternalLink
          as={LinkText}
          href="https://example.com"
          openLinkBehavior={{ native: "webBrowser", web: "targetBlank" }}
        >
          External Link
        </ExternalLink>
      </Story.Section>

      <Story.Section title="Brand">
        <Surface theme="brand">
          <ExternalLink
            as={LinkText}
            href="#"
            openLinkBehavior={{ native: "linking", web: "targetSelf" }}
          >
            Settings
          </ExternalLink>
        </Surface>
      </Story.Section>

      <Story.Section title="States">
        <VStack gap="$4">
          <ExternalLink
            disabled
            as={LinkText}
            href="#"
            openLinkBehavior={{ native: "linking", web: "targetSelf" }}
          >
            Disabled Link
          </ExternalLink>
        </VStack>
      </Story.Section>
    </Story>
  ),

  play: async ({ canvasElement }) => {
    // make sure https://example.com link has target="_blank" and rel="noopener noreferrer"
    const externalLink = canvasElement.querySelector(
      'a[href="https://example.com"]',
    );

    await expect(externalLink).toBeInTheDocument();
    await expect(externalLink!.getAttribute("target")).toBe("_blank");
    await expect(externalLink!.getAttribute("rel")).toBe("noopener noreferrer");
  },
};
