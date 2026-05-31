import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { Story } from "../story-components/Story";
import { HStack, Stack, VStack } from "./stacks";

function Item({ children }: { children: React.ReactNode }) {
  return (
    <Box center layer="highlight" className="grow p-xs rounded-sm">
      <Text>{children}</Text>
    </Box>
  );
}

const meta = {
  title: "alouette/Layout/Stacks",
  component: Stack,
  subcomponents: { HStack: HStack as any, VStack: VStack as any },
  parameters: {
    componentSubtitle:
      "Flexible stack layout components that provide an easy way to arrange elements vertically or horizontally with consistent spacing",
    docs: {
      description: {
        component: `### Components
- \`Stack\`: Row layout that wraps
- \`HStack\`: Horizontal stack (no wrap)
- \`VStack\`: Vertical stack

### Variants
- \`absoluteFill\` (Stack/HStack): position absolute, inset-0

Use Tailwind classes for gap/alignment/justification:
- \`gap-{n}\`, \`items-{position}\`, \`justify-{position}\`, \`flex-wrap\``,
      },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;

type ThisStory = StoryObj<typeof Stack>;

export const StackStory: ThisStory = {
  name: "Stack",
  render: () => (
    <Story>
      <Story.Section title="Basic (wraps)">
        <Stack className="gap-m">
          {Array.from({ length: 8 }, (_, i) => (
            <Item key={i}>{i + 1}</Item>
          ))}
        </Stack>
      </Story.Section>
    </Story>
  ),
};

export const HStackStory: StoryObj<typeof HStack> = {
  name: "HStack",
  render: () => (
    <Story>
      <Story.Section title="Basic">
        <HStack className="gap-m">
          <Item>1</Item>
          <Item>2</Item>
        </HStack>
      </Story.Section>

      <Story.Section title="With justify-between">
        <HStack className="gap-m justify-between">
          <Box center layer="highlight" className="p-xs rounded-sm">
            <Text>1</Text>
          </Box>
          <Box center layer="highlight" className="p-xs rounded-sm">
            <Text>2</Text>
          </Box>
        </HStack>
      </Story.Section>

      <Story.Section title="With flexGrow">
        <HStack className="gap-m justify-between">
          <Box
            center
            layer="highlight"
            className="grow basis-0 p-xs rounded-sm"
          >
            <Text>1</Text>
          </Box>
          <Box
            center
            layer="highlight"
            className="grow-2 basis-0 p-xs rounded-sm"
          >
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
        <VStack className="gap-m">
          <Item>1</Item>
          <Item>2</Item>
        </VStack>
      </Story.Section>

      <Story.Section title="With items-center">
        <VStack className="gap-m items-center">
          <Box center layer="highlight" className="p-m rounded-sm">
            <Text>1</Text>
          </Box>
          <Box center layer="highlight" className="p-xs rounded-sm">
            <Text>2</Text>
          </Box>
        </VStack>
      </Story.Section>
    </Story>
  ),
};
