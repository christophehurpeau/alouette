import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Surface } from "../containers/Surface";
import { Paragraph, Text } from "../primitives/Text";
import { Story } from "../story-components/Story";
import { Code } from "./Code";

type ThisStory = StoryObj<typeof Code>;

export default {
  title: "alouette/Data/Code",
  component: Code,
  parameters: {
    componentSubtitle:
      "Inline code — a mono fragment on the highlight layer, sized by the text it sits in",
  },
  argTypes: {
    children: { description: "The code fragment", control: "text" },
  },
} satisfies Meta<typeof Code>;

export const CodePreviewStory: ThisStory = {
  name: "Code Preview",
  args: { children: "pnpm build" },
  render: (args) => <Code {...args} />,
};

export const CodeVariantsStory: ThisStory = {
  name: "Code Variants",
  render: () => (
    <Story>
      <Story.Section title="Standalone">
        <Code>npx vitest run</Code>
      </Story.Section>

      <Story.Section title="In a text flow">
        <Paragraph>
          Run <Code>pnpm --filter alouette build:css</Code> after editing{" "}
          <Code>paletteSpecs.ts</Code>, never edit the generated CSS.
        </Paragraph>
      </Story.Section>

      <Story.Section title="Inherited sizes">
        <Paragraph className="text-xs">
          text-xs — <Code>generateTheme()</Code>
        </Paragraph>
        <Paragraph className="text-base">
          text-base — <Code>generateTheme()</Code>
        </Paragraph>
        <Paragraph className="text-xl">
          text-xl — <Code>generateTheme()</Code>
        </Paragraph>
      </Story.Section>

      <Story.Section title="Nested styling">
        <Paragraph>
          A fragment can still take a class:{" "}
          <Code className="font-mono-bold">--color-accent</Code> or{" "}
          <Code className="text-muted">--color-muted</Code>.
        </Paragraph>
      </Story.Section>

      <Story.Section title="On a raised surface">
        <Surface>
          <Text>
            The highlight layer keeps the fragment readable on a Surface:{" "}
            <Code>useCurrentTheme()</Code>
          </Text>
        </Surface>
      </Story.Section>
    </Story>
  ),
};

export const CodeTestsStory: ThisStory = {
  name: "Code Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Semantics">
        <Paragraph>
          Install with <Code>pnpm add alouette</Code>.
        </Paragraph>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const code = canvas.getByText("pnpm add alouette");
    // react-native-web maps role="code" onto a real <code> element, nested in
    // the <p> Paragraph renders.
    await expect(code.tagName).toBe("CODE");
    await expect(code.closest("p")).not.toBeNull();
  },
};
