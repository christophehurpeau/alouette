import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Variable } from "@tamagui/core";
import { Box } from "../ui/containers/Box";
import { Text } from "../ui/primitives/Text";
import { View } from "../ui/primitives/View";
import { HStack, VStack } from "../ui/stacks/stacks";
import { Story } from "../ui/story-components/Story";
import { WithTamaguiConfig } from "../ui/story-components/WithTamaguiConfig";
import { groupTokens } from "./utils/groupTokens";

const meta = {
  title: "alouette/Config/Tokens",
  parameters: {
    componentSubtitle:
      "Design tokens for consistent styling across the design system",
    docs: {
      description: {
        component: `
Design tokens in Alouette are powered by Tamagui's token system. They provide type-safe, performant values for colors, spacing, and other visual properties.

### Color System
- Theme-based semantic tokens with automatic light/dark mode support
- Color tokens compile to atomic CSS using Tamagui's compiler
- Consistent contrast ratios through our color calculation system
- Tokens for text, borders, and backgrounds using createTokens

### Space Tokens
- Space scale using createTokens ($1-$16)
- Semantic tokens ($xs, $sm, $md, $lg, $xl) for consistent spacing
- Consistent spacing through space props (gap, padding, margin)
- Values compile to optimized CSS variables for better performance

### Radius Tokens
- Consistent border radius using createTokens
- $sm (4px) for subtle rounding
- $md (8px) for standard components
- Radius values are type-safe and optimized at build time`,
      },
    },
  },
} satisfies Meta<unknown>;

export default meta;

export const TokensStory: StoryObj<unknown> = {
  name: "Tokens",
  render: () => (
    <WithTamaguiConfig
      render={({ tokens }) => {
        const groupedEntries = groupTokens(tokens.color);
        return (
          <Story>
            <Story.Section title="Colors">
              <VStack gap="$1.0" flexWrap="wrap">
                {groupedEntries.map(([groupName, groupValues]) => (
                  <HStack key={groupName} gap="$1.0">
                    {groupValues.map(({ key, variable }) => (
                      <VStack
                        key={`${groupName}-${key}`}
                        alignItems="stretch"
                        gap="$1"
                        minWidth={60}
                      >
                        <Text>{key}</Text>
                        <View backgroundColor={variable.val} height={10} />
                      </VStack>
                    ))}
                  </HStack>
                ))}
              </VStack>
            </Story.Section>

            <Story.Section title="Radius">
              <HStack gap="$1.0" flexWrap="wrap">
                {(["$sm", "$md"] as const).map((proportion) => (
                  <Box
                    key={proportion}
                    center
                    withBackground="highlight"
                    borderRadius={proportion}
                    size={50}
                    theme="brand"
                  >
                    <Text>{proportion}</Text>
                  </Box>
                ))}
              </HStack>
            </Story.Section>

            <Story.Section title="Spacings">
              <HStack gap="$2.0" flexWrap="wrap" alignItems="flex-start">
                {Object.entries<Variable>(tokens.space).map(([key, value]) => (
                  <Box
                    key={key}
                    center
                    theme="brand"
                    withBackground="highlight"
                    paddingVertical="$2.0"
                    width={value.val < 0 ? -value.val : value.val}
                  >
                    <VStack gap="$1.0">
                      <Text size="$xs">${key}</Text>
                      <Text size="$xs">{value.val}</Text>
                    </VStack>
                  </Box>
                ))}
              </HStack>
            </Story.Section>
          </Story>
        );
      }}
    />
  ),
};
