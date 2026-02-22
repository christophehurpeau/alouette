import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { Story } from "../story-components/Story";
import { HStack, Stack, VStack } from "./stacks";

const meta = {
  title: "alouette/Layout/Stacks",
  component: Stack,
  subcomponents: { HStack: HStack as any, VStack: VStack as any },
  parameters: {
    componentSubtitle:
      "Flexible stack layout components that provide an easy way to arrange elements vertically or horizontally with consistent spacing",
    docs: {
      description: {
        component: `
### Components
- \`Stack\`: Base component with configurable direction
- \`HStack\`: Horizontal stack (row layout)
- \`VStack\`: Vertical stack (column layout)

### Features
- Configurable gap between elements
- Theme support for background colors
- Responsive layout changes
- Flexible alignment and distribution
- Proper spacing on all screen sizes

### Variants
- \`type\`: Stack direction (h | v) - Stack only
- \`gap\`: Space between items ($xs | $sm | $md | $lg | $xl)
- \`alignItems\`: Cross-axis alignment
- \`justifyContent\`: Main-axis alignment
- \`flexWrap\`: Enable wrapping to next line

### Guidelines
- Use Stack when direction might change responsively
- Use HStack for navigation bars, toolbars, inline actions
- Use VStack for forms, content sections, lists
- Always specify gap for consistent spacing
- Consider alignment needs (start, center, end)
- Use flexWrap for responsive layouts

### Usage
~~~tsx
// Basic horizontal stack
<HStack gap="$4" alignItems="center">
  <Box>Left</Box>
  <Box>Right</Box>
</HStack>

// Vertical stack with alignment
<VStack gap="$4" alignItems="stretch">
  <Box>Top</Box>
  <Box>Bottom</Box>
</VStack>
~~~`,
      },
    },
  },
  argTypes: {
    type: {
      description: "Stack direction (only for Stack component)",
      control: "select",
      options: ["h", "v"],
      table: {
        defaultValue: { summary: "v" },
      },
    },
    gap: {
      description: "Space between stack items",
      control: "select",
      options: ["$xs", "$sm", "$md", "$lg", "$xl", "$20"],
    },
    theme: {
      description: "Theme color for the stack background",
      control: "select",
      options: ["brand", "info", "success", "warning", "danger"],
    },
    alignItems: {
      description: "Alignment of items along the cross axis",
      control: "select",
      options: ["flex-start", "center", "flex-end", "stretch"],
    },
    justifyContent: {
      description: "Alignment of items along the main axis",
      control: "select",
      options: [
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    flexWrap: {
      description: "Whether items should wrap to the next line",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof Stack>;

export const StackStory: Story = {
  name: "Stack",
  args: {
    type: "v",
    gap: "$2.0",
    theme: "brand",
    children: [
      <Box key="1" center background="highlight" flexGrow={1}>
        <Text>1</Text>
      </Box>,
      <Box key="2" center background="highlight" flexGrow={1}>
        <Text>2</Text>
      </Box>,
    ],
  },
};

export const HStackStory: StoryObj<typeof HStack> = {
  name: "HStack",
  render: () => (
    <Story>
      <Story.Section title="Basic">
        <HStack gap="$4">
          <Box center background="highlight" flexGrow={1}>
            <Text>1</Text>
          </Box>
          <Box center background="highlight" flexGrow={1}>
            <Text>2</Text>
          </Box>
        </HStack>
      </Story.Section>

      <Story.Section title="With theme">
        <HStack theme="brand" gap="$4">
          <Box center background="highlight" flexGrow={1}>
            <Text>1</Text>
          </Box>
          <Box center background="highlight" flexGrow={1}>
            <Text>2</Text>
          </Box>
        </HStack>
      </Story.Section>

      <Story.Section title="With justifyContent">
        <HStack theme="info" gap="$4" justifyContent="space-between">
          <Box center background="highlight">
            <Text>1</Text>
          </Box>
          <Box center background="highlight">
            <Text>2</Text>
          </Box>
        </HStack>
      </Story.Section>

      <Story.Section title="With flexGrow">
        <HStack theme="info" gap="$4" justifyContent="space-between">
          <Box background="highlight" flexGrow={1} flexBasis={0}>
            <Text>1</Text>
          </Box>
          <Box background="highlight" flexGrow={2} flexBasis={0}>
            <Text>2</Text>
          </Box>
        </HStack>
      </Story.Section>
    </Story>
  ),
};

export const VStackStory: StoryObj<typeof VStack> = {
  name: "VStack",
  render: () => (
    <Story>
      <Story.Section title="Basic">
        <VStack gap="$4">
          <Box center background="highlight" flexGrow={1}>
            <Text>1</Text>
          </Box>
          <Box center background="highlight" flexGrow={1}>
            <Text>2</Text>
          </Box>
        </VStack>
      </Story.Section>

      <Story.Section title="With theme">
        <VStack theme="brand" gap="$4">
          <Box center background="highlight" flexGrow={1}>
            <Text>1</Text>
          </Box>
          <Box center background="highlight" flexGrow={1}>
            <Text>2</Text>
          </Box>
        </VStack>
      </Story.Section>

      <Story.Section title="With alignItems">
        <VStack theme="warning" gap="$4" alignItems="center">
          <Box center background="highlight" padding="$4">
            <Text>1</Text>
          </Box>
          <Box center background="highlight" padding="$8">
            <Text>2</Text>
          </Box>
        </VStack>
      </Story.Section>
    </Story>
  ),
};
