import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Entries } from "type-fest";
import { Text } from "../ui/primitives/Text";
import { View } from "../ui/primitives/View";
import { VStack } from "../ui/stacks/stacks";
import { Story } from "../ui/story-components/Story";
import { StoryGrid } from "../ui/story-components/StoryGrid";
import { WithTamaguiConfig } from "../ui/story-components/WithTamaguiConfig";
import { groupTokens } from "./utils/groupTokens";

const meta = {
  title: "alouette/Config/Themes",
  parameters: {
    componentSubtitle: "Theme system based on Tamagui with semantic tokens",
    docs: {
      description: {
        component: `
Alouette uses Tamagui's powerful theme system as its foundation. Themes are created using createTheme() and follow Tamagui's token-based approach, while adding our own semantic layer for consistent design patterns.

### Theme Structure
- Built on createTheme() with type-safe tokens
- Themes compile to optimized CSS custom properties for better performance
- Supports sub-themes and theme switching
- Extends Tamagui's base light/dark themes with our own semantic tokens

### Theme Values
- Uses Tamagui token references ($color.1, $size.2, etc)
- Semantic themes (primary, info, etc) map to token values for consistent design
- Color values automatically adapt to color scheme
- Theme colors are carefully chosen to meet WCAG accessibility standards

### Implementation
- Use the \`theme\` prop available on most Alouette components for theme switching
- Themes cascade through component hierarchy following React's composition model`,
      },
    },
  },
} satisfies Meta<unknown>;

export default meta;

export const TokensStory: StoryObj<unknown> = {
  name: "Themes",
  parameters: {
    chromatic: { disableSnapshot: true }, // this story exceeds maximum height
  },
  render: () => (
    <WithTamaguiConfig
      render={({ themes }) => {
        return (
          <Story noDarkTheme>
            {(Object.entries(themes) as Entries<typeof themes>).map(
              ([themeName, theme]) => (
                <Story.Section key={themeName} title={themeName}>
                  {groupTokens(theme).map(([groupName, tokens]) => (
                    <StoryGrid.Row key={groupName} flexWrap>
                      {tokens.map(({ key, variable }) => (
                        <StoryGrid.Col key={`${groupName}-${key}`}>
                          <VStack
                            key={`${groupName}-${key}`}
                            alignItems="stretch"
                            minWidth={60}
                            flexGrow={1}
                          >
                            <Text size="$xs">{key}</Text>
                            <View backgroundColor={variable.val} height={10} />
                          </VStack>
                        </StoryGrid.Col>
                      ))}
                    </StoryGrid.Row>
                  ))}
                </Story.Section>
              ),
            )}
          </Story>
        );
      }}
    />
  ),
};
