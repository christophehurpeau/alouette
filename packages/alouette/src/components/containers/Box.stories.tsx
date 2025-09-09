import type { Meta, StoryObj } from "@storybook/react-vite";
import { HStack, VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { Typography } from "../typography/Typography";
import { Box } from "./Box";

type ThisStory = StoryObj<typeof Box>;

export default {
  title: "alouette/Containers/Box",
  component: Box,
  parameters: {
    componentSubtitle:
      "A fundamental building block that provides a themed container with various styling options",
    docs: {
      description: {
        component: `
### Features
- Theme support with background and border options
- Flexible padding and margin control
- Interactive states for hover, focus, and press
- Border radius customization
- Proportion-based sizing

### Variants
- \`withBackground\`: Enables themed background color
- \`withBorder\`: Adds themed border
- \`interactive\`: Enables hover, focus, and press states
- \`padding\`: Spacing around content ($sm | $md | $lg)
- \`borderRadius\`: Corner rounding ($sm | $md | $lg)
- \`centered\`: Centers content horizontally and vertically
- \`asChild\`: Allows rendering as a different element

### Usage
~~~tsx
// Basic themed box
<Box theme="primary" withBackground padding="$md">
  <Typography contrast>Content</Typography>
</Box>

// Interactive box with border
<Box
  theme="info"
  withBorder
  interactive
  padding="$md"
  borderRadius="$sm"
>
  <Typography>Clickable Content</Typography>
</Box>

// Centered content with custom sizing
<Box
  theme="success"
  withBackground
  centered
  padding="$lg"
  style={{ width: 200, height: 200 }}
>
  <Typography contrast>Centered</Typography>
</Box>
~~~`,
      },
    },
  },
  argTypes: {
    theme: {
      description: "Theme color for the box",
      control: "select",
      options: ["primary", "info", "success", "warning", "danger"],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    withBackground: {
      description: "Whether to show the themed background color",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    withBorder: {
      description: "Whether to show the themed border",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    interactive: {
      description:
        "Whether the box should have interactive states (hover, focus, press)",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    padding: {
      description: "Padding size token",
      control: "select",
      options: ["$sm", "$md", "$lg"],
    },
    borderRadius: {
      description: "Border radius size token",
      control: "select",
      options: ["$sm", "$md", "$lg"],
    },
  },
} satisfies Meta<typeof Box>;

export const PreviewBoxStory: ThisStory = {
  args: {
    theme: "primary",
    withBackground: true,
    padding: "$4",
    children: <Typography>Box Content</Typography>,
  },
  render: (args) => <Box {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="With Background">
        <Box withBackground theme="primary" padding="$4">
          <Typography>With Background</Typography>
        </Box>
      </Story.Section>

      <Story.Section title="With Border">
        <VStack gap="$4">
          <Box withBorder theme="primary" padding="$4">
            <Typography>With Border</Typography>
          </Box>

          <Box withBorder={2} theme="primary" padding="$4">
            <Typography>With Border 2</Typography>
          </Box>
        </VStack>
      </Story.Section>

      <Story.Section title="With Border and Background">
        <Box withBorder withBackground theme="primary" padding="$4">
          <Typography>With Border</Typography>
        </Box>
      </Story.Section>

      <Story.Section title="Proportion with radius and padding">
        <HStack
          theme="primary"
          gap="$xs"
          flexWrap="wrap"
          alignContent="flex-start"
          alignItems="flex-start"
        >
          {(["$sm", "$md"] as const).map((proportion) => (
            <Box
              key={proportion}
              asChild
              centered
              withBackground
              borderRadius={proportion}
              padding={proportion}
              margin="$4"
            >
              <Typography>{proportion}</Typography>
            </Box>
          ))}
        </HStack>
      </Story.Section>
    </Story>
  ),
};
