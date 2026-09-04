import { expect, fn, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FolderRegularIcon } from "alouette-icons/phosphor-icons/FolderRegularIcon";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Paragraph } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { LinkText } from "./LinkText";

type ThisStory = StoryObj<typeof LinkText>;

export default {
  title: "alouette/Actions/LinkText",
  component: LinkText,
  parameters: {
    componentSubtitle:
      "Text link to an in-app destination — the lightweight alternative to a Button when the link is part of a text flow",
    docs: {
      description: {
        component: `Renders a real \`<a href>\` on web, which navigates on its own; native ignores
the href and routes from \`onPress\`, so expo Router's \`<Link asChild>\` — it
injects both — composes with it directly.

Use \`ExternalLinkText\` for a destination outside the app, and a \`NavBar\` for
the primary navigation between screens.

### Usage
~~~tsx
<LinkText href="/library" text="Back to the library" />

<Link asChild href="/library/reports">
  <LinkText size="sm" text="Reports" icon={<FolderRegularIcon />} />
</Link>
~~~`,
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    accent: { control: "select", options: [undefined, ...accents] },
    disabled: { control: "boolean" },
    text: { control: "text" },
  },
} satisfies Meta<typeof LinkText>;

export const LinkTextPreviewStory: ThisStory = {
  name: "LinkText Preview",
  args: { href: "/library", text: "Back to the library" },
};

function AccentLinkText({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <LinkText accent={accent} href="/library" text={accent ?? "default"} />
      <LinkText
        accent={accent}
        href="/library"
        icon={<FolderRegularIcon />}
        text={`${accent ?? "default"} with icon`}
      />
      <LinkText
        disabled
        accent={accent}
        href="/library"
        text={`${accent ?? "default"} disabled`}
      />
    </Story.SubSection>
  );
}

export const LinkTextVariantsStory: ThisStory = {
  name: "LinkText Variants",
  render: () => (
    <Story>
      <Story.Section title="Sizes">
        <LinkText href="/library" size="sm" text="Small link" />
        <LinkText href="/library" size="md" text="Medium link" />
      </Story.Section>

      <Story.Section title="Leading icon">
        <LinkText
          href="/library"
          icon={<FolderRegularIcon />}
          size="sm"
          text="Small link with an icon"
        />
        <LinkText
          href="/library"
          icon={<FolderRegularIcon />}
          text="Medium link with an icon"
        />
      </Story.Section>

      <Story.Section title="Disabled">
        <LinkText disabled href="/library" text="Disabled link" />
        <LinkText
          disabled
          href="/library"
          icon={<FolderRegularIcon />}
          text="Disabled link with an icon"
        />
      </Story.Section>

      <Story.Section title="Without href">
        <LinkText text="Routed from onPress" onPress={fn()} />
      </Story.Section>

      <Story.Section title="Under a paragraph">
        <VStack className="gap-xs items-start">
          <Paragraph>
            The report you are looking for moved to the shared library.
          </Paragraph>
          <LinkText
            href="/library"
            icon={<FolderRegularIcon />}
            size="sm"
            text="Open the library"
          />
        </VStack>
      </Story.Section>

      <Story.Section title="Accents">
        <AccentLinkText />
        {accents.map((accent) => (
          <AccentLinkText key={accent} accent={accent} />
        ))}
      </Story.Section>
    </Story>
  ),
};

export const LinkTextTestsStory: ThisStory = {
  name: "LinkText Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Links">
        <LinkText href="/library" text="Library" />
        <LinkText disabled href="/reports" text="Reports" />
        <LinkText
          href="/settings"
          text="Settings"
          onPress={(event) => {
            event.preventDefault();
          }}
        />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const library = canvas.getByRole("link", { name: "Library" });
    await expect(library.tagName).toBe("A");
    await expect(library).toHaveAttribute("href", "/library");

    // A disabled Pressable never sees the press that would cancel the
    // navigation, so the href goes with it.
    const reports = canvas.getByRole("link", { name: "Reports" });
    await expect(reports).toHaveAttribute("aria-disabled", "true");
    await expect(reports).not.toHaveAttribute("href");

    const settings = canvas.getByRole("link", { name: "Settings" });
    settings.focus();
    await userEvent.tab({ shift: true });
    await userEvent.tab();
    await expect(document.activeElement).toBe(settings);
    await expect(getComputedStyle(settings).outlineWidth).toBe("2px");
  },
};
