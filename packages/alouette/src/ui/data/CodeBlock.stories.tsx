import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Box } from "../containers/Box";
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
    wrap: {
      description:
        "Wrap long lines instead of scrolling them — for content read end to end, like a shell command",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    children: { description: "The code", control: "text" },
  },
} satisfies Meta<typeof CodeBlock>;

export const CodeBlockPreviewStory: ThisStory = {
  name: "CodeBlock Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
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

      <Story.Section title="Long line — wraps">
        <Box className="surface">
          <CodeBlock wrap title="install.sh">
            curl -fsSL
            https://raw.githubusercontent.com/christophehurpeau/alouette/main/scripts/install.sh
            | bash -s -- --prefix=/usr/local/share/alouette
          </CodeBlock>
        </Box>
      </Story.Section>

      <Story.Section title="On a raised surface">
        <Box className="surface">
          <ThemeSnippet title="build-css.ts" />
        </Box>
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
      <Story.Section title="Wrap">
        <Box className="w-[240px]">
          <CodeBlock>
            scrolling --long-line-that-overflows-the-block-and-scrolls-sideways
          </CodeBlock>
          <CodeBlock wrap>
            wrapping
            --long-line-that-overflows-the-block-and-wraps-onto-several-lines
          </CodeBlock>
        </Box>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const code = canvas.getByText("pnpm add alouette");
    // react-native-web maps role="code" onto a real <code> element.
    await expect(code.tagName).toBe("CODE");
    await expect(canvas.getByText("install.sh")).toBeTruthy();

    const scrolling = canvas.getByText(/^scrolling/);
    await expect(getComputedStyle(scrolling).whiteSpace).toBe("pre");

    const wrapping = canvas.getByText(/^wrapping/);
    await expect(wrapping.tagName).toBe("CODE");
    await expect(getComputedStyle(wrapping).whiteSpace).toBe("pre-wrap");
    await expect(getComputedStyle(wrapping).overflowWrap).toBe("anywhere");
    const frame = wrapping.parentElement;
    if (!frame) throw new Error("CodeBlock frame not found");
    await expect(wrapping.getBoundingClientRect().right).toBeLessThanOrEqual(
      frame.getBoundingClientRect().right,
    );
  },
};
