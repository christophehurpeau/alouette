import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story } from "../story-components/Story";
import { Paragraph, Text } from "./Text";

type ThisStory = StoryObj<typeof Text>;

export default {
  title: "alouette/Primitives/Text",
  component: Text,
  parameters: {
    componentSubtitle:
      "A foundational text component that provides consistent text styling across the application",
    docs: {
      description: {
        component: `### Usage
All styling via \`className\`:
- **Sizes + family**: \`body-xs\`…\`body-3xl\`, \`heading-xs\`…\`heading-3xl\`, \`mono-xs\`…\`mono-3xl\`
- **Weight**: \`font-normal\`, \`font-bold\`, \`font-extrabold\`
- **Color**: \`text-sharp\`, \`text-muted\`, \`text-{nested-theme}-accent\`, \`text-{nested-theme}-on-accent\`

~~~tsx
<Text className="body-md font-bold text-sharp">Bold body text</Text>
<Text className="heading-xl text-brand-accent">Accent heading</Text>
<Text className="mono-sm text-muted">Muted monospace</Text>
~~~`,
      },
    },
  },
} satisfies Meta<typeof Text>;

export const PreviewStory: ThisStory = {
  name: "Text Preview",
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
};

function HeadingSizes() {
  return (
    <Story.Section title="Heading Sizes">
      <Text className="heading-3xl">3xl — Heading</Text>
      <Text className="heading-xxl">xxl — Heading</Text>
      <Text className="heading-xl">xl — Heading</Text>
      <Text className="heading-lg">lg — Heading</Text>
      <Text className="heading-md">md — Heading</Text>
      <Text className="heading-sm">sm — Heading</Text>
      <Text className="heading-xs">xs — Heading</Text>
    </Story.Section>
  );
}

function BodySizes() {
  return (
    <Story.Section title="Body Sizes">
      <Text className="body-3xl">3xl — Body</Text>
      <Text className="body-xxl">xxl — Body</Text>
      <Text className="body-xl">xl — Body</Text>
      <Text className="body-lg">lg — Body</Text>
      <Text className="body-md">md — Body</Text>
      <Text className="body-sm">sm — Body</Text>
      <Text className="body-xs">xs — Body</Text>
    </Story.Section>
  );
}

function Weights() {
  return (
    <Story.Section title="Weights">
      <Text className="body-lg font-normal">font-normal</Text>
      <Text className="body-lg font-bold">font-bold</Text>
      <Text className="body-lg font-extrabold">font-extrabold</Text>
    </Story.Section>
  );
}

function Monospace() {
  return (
    <Story.Section title="Monospace">
      <Text className="mono-lg font-normal">font-normal</Text>
      <Text className="mono-lg font-bold">font-bold</Text>
    </Story.Section>
  );
}

function Colors() {
  return (
    <Story.Section title="Colors">
      <Text className="body-lg text-sharp">text-sharp — Default text</Text>
      <Text className="body-lg text-muted">text-muted — Secondary text</Text>
      <Story.SubSection title="Accent Colors - brand">
        <Text className="body-lg text-brand-accent">
          text-brand-accent — Accented text
        </Text>
        <Text className="body-lg text-brand-on-accent">
          text-brand-on-accent — Text on accent background
        </Text>
      </Story.SubSection>
    </Story.Section>
  );
}

function NestedExample() {
  return (
    <Story.Section title="Nested">
      <Paragraph className="body-xl">
        The future is in{" "}
        <Text className="font-bold">
          our <Text className="text-brand-accent">hands</Text>
        </Text>{" "}
        <Text className="text-brand-accent">
          to <Text className="text-danger-accent font-bold">shape</Text>
        </Text>
      </Paragraph>
    </Story.Section>
  );
}

export const VariantsStory: ThisStory = {
  name: "Text Variants",
  render: () => (
    <Story>
      <HeadingSizes />
      <BodySizes />
      <Weights />
      <Monospace />
      <Colors />
      <NestedExample />
    </Story>
  ),
};

export const Tests: ThisStory = {
  name: "Text Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Paragraph">
        <Paragraph>Paragraph content</Paragraph>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText("Paragraph content");
    await expect(paragraph).toBeInTheDocument();
    await expect(paragraph.tagName).toBe("P");
  },
};
