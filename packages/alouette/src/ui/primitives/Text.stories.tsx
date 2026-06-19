import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Surface } from "../containers/Surface";
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
All styling via \`className\`. \`<Text>\` defaults to \`font-body\` (regular body family), so plain body text needs no family class.
- **Family + weight**: \`font-body\` (default, omit for regular), \`font-body-bold\`, \`font-body-extrabold\`; \`font-heading\`, \`font-heading-bold\`, \`font-heading-extrabold\`; \`font-mono\`, \`font-mono-bold\`, \`font-mono-extrabold\`
- **Size**: standard Tailwind — \`text-xs\`, \`text-sm\`, \`text-base\`, \`text-lg\`, \`text-xl\`, \`text-2xl\`, \`text-3xl\`, \`text-4xl\`, \`text-5xl\`, \`text-6xl\`
- **Color**: \`text-sharp\`, \`text-muted\`, \`text-accent\`, \`text-on-accent\`

~~~tsx
<Text className="font-body-bold text-base text-sharp">Bold body text</Text>
<Text className="font-heading-extrabold text-4xl">Extrabold heading</Text>
<Text className="font-mono text-sm text-muted">Muted monospace</Text>
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

function Sizes() {
  return (
    <Story.Section title="Sizes">
      <Text className="text-6xl">text-6xl</Text>
      <Text className="text-5xl">text-5xl</Text>
      <Text className="text-4xl">text-4xl</Text>
      <Text className="text-3xl">text-3xl</Text>
      <Text className="text-2xl">text-2xl</Text>
      <Text className="text-xl">text-xl</Text>
      <Text className="text-lg">text-lg</Text>
      <Text className="text-base">text-base</Text>
      <Text className="text-sm">text-sm</Text>
      <Text className="text-xs">text-xs</Text>
    </Story.Section>
  );
}

function FamiliesAndWeights() {
  return (
    <Story.Section title="Families & weights">
      <Text className="text-lg">font-body (default regular)</Text>
      <Text className="font-body-bold text-lg">font-body-bold</Text>
      <Text className="font-body-extrabold text-lg">font-body-extrabold</Text>
      <Text className="font-heading text-lg">font-heading</Text>
      <Text className="font-heading-bold text-lg">font-heading-bold</Text>
      <Text className="font-heading-extrabold text-lg">
        font-heading-extrabold
      </Text>
      <Text className="font-mono text-lg">font-mono</Text>
      <Text className="font-mono-bold text-lg">font-mono-bold</Text>
      <Text className="font-mono-extrabold text-lg">font-mono-extrabold</Text>
    </Story.Section>
  );
}

function Colors() {
  return (
    <Story.Section title="Colors">
      <Text className="text-lg text-sharp">text-sharp — Default text</Text>
      <Text className="text-lg text-muted">text-muted — Secondary text</Text>
      <Story.SubSection title="Accent Colors - brand" accent="brand">
        <Text className="text-lg text-accent">text-accent — Accented text</Text>
        <Surface className="bg-highlight-accent">
          <Text className="text-lg text-on-accent">
            text-on-accent — Text on accent background
          </Text>
        </Surface>
      </Story.SubSection>
    </Story.Section>
  );
}

function NestedExample() {
  return (
    <Story.Section title="Nested">
      <Paragraph className="text-xl">
        The future is in{" "}
        <Text className="font-body-bold">
          our{" "}
          <Text accent="brand" className="text-accent">
            hands
          </Text>
        </Text>{" "}
        <Text accent="danger" className="text-accent">
          to{" "}
          <Text accent="brand" className="text-accent font-body-bold">
            shape
          </Text>
        </Text>
      </Paragraph>
    </Story.Section>
  );
}

export const VariantsStory: ThisStory = {
  name: "Text Variants",
  render: () => (
    <Story>
      <Sizes />
      <FamiliesAndWeights />
      <Colors />
      <NestedExample />
      <Story.Section title="Invalid">
        <Text className="font-bold">
          font-bold would only work on web, so it's overrided. Use
          font-body-bold instead.
        </Text>
      </Story.Section>
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
