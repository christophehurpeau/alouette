import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Surface } from "../containers/Surface";
import { Story } from "../story-components/Story";
import { CodeBlock } from "./CodeBlock";

type ThisStory = StoryObj<typeof CodeBlock>;

export default {
  title: "alouette/Data/CodeBlock",
  component: CodeBlock,
  parameters: {
    componentSubtitle:
      "A block of code on the lowered layer, scrolling horizontally instead of wrapping",
  },
  argTypes: {
    title: {
      description: "Label above the code — a file name or a language",
      control: "text",
    },
    size: {
      description: "The size of the code text",
      control: "inline-radio",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "md" } },
    },
    children: { description: "The code", control: "text" },
  },
} satisfies Meta<typeof CodeBlock>;

export const CodeBlockPreviewStory: ThisStory = {
  name: "CodeBlock Preview",
  args: {
    title: "theme.ts",
    children: `export const theme = {
  accent: "brand",
};`,
  },
  render: (args) => <CodeBlock {...args} />,
};

interface ThemeSnippetProps {
  size?: "md" | "sm";
  title?: ReactNode;
}

function ThemeSnippet({ size, title }: ThemeSnippetProps): ReactNode {
  return (
    <CodeBlock
      size={size}
      title={title}
    >{`import { writeTheme } from "alouette/theme-generator";

writeTheme({ outDir: "./src", overrides: { brand: { hue: 280 } } });`}</CodeBlock>
  );
}

export const CodeBlockVariantsStory: ThisStory = {
  name: "CodeBlock Variants",
  render: () => (
    <Story>
      <Story.Section title="Sizes">
        <ThemeSnippet size="sm" title="sm" />
        <ThemeSnippet size="md" title="md" />
      </Story.Section>

      <Story.Section title="Without a title">
        <ThemeSnippet />
      </Story.Section>

      <Story.Section title="Single line">
        <CodeBlock>pnpm --filter alouette build:css</CodeBlock>
      </Story.Section>

      <Story.Section title="Long line — scrolls horizontally">
        <CodeBlock title="palette.ts">
          {
            "const { css, oklchCss, themeVariables, oklchThemeVariables } = generateTheme({ brand: { hue: 280, chroma: 0.14 }, danger: { hue: 25 } });"
          }
        </CodeBlock>
      </Story.Section>

      <Story.Section title="On a raised surface">
        <Surface>
          <ThemeSnippet title="build-css.ts" />
        </Surface>
      </Story.Section>
    </Story>
  ),
};

export const CodeBlockTestsStory: ThisStory = {
  name: "CodeBlock Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Semantics">
        <CodeBlock title="install.sh">pnpm add alouette</CodeBlock>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const code = canvas.getByText("pnpm add alouette");
    // react-native-web maps role="code" onto a real <code> element.
    await expect(code.tagName).toBe("CODE");
    await expect(canvas.getByText("install.sh")).toBeTruthy();
  },
};
