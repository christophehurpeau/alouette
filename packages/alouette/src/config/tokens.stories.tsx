import type { Meta, StoryObj } from "@storybook/react";
import { View } from "../components/primitives/View";
import { HStack, VStack } from "../components/primitives/stacks";
import { Story } from "../components/story-components/Story";
import { Frame } from "../components/containers/Frame";
import { Typography } from "../components/typography/Typography";
import { groupTokens } from "./utils/groupTokens";
import { WithTamaguiConfig } from "../components/story-components/WithTamaguiConfig";

type ThisStory = StoryObj<unknown>;

export default {
  title: "alouette/Config/Tokens",
} satisfies Meta<unknown>;

export const TokensStory: ThisStory = {
  name: "Tokens",
  render: () => (
    <WithTamaguiConfig
      render={({ tokens }) => {
        const groupedEntries = groupTokens(tokens.color);
        return (
          <Story>
            <Story.Section title="Colors">
              <VStack gap="$md" flexWrap="wrap">
                {groupedEntries.map(([groupName, groupValues]) => (
                  <HStack key={groupName} gap="$xs">
                    {groupValues.map(({ key, variable }) => (
                      <VStack
                        key={`${groupName}-${key}`}
                        alignItems="stretch"
                        gap="$1"
                        minWidth={60}
                      >
                        <Typography>{key}</Typography>
                        <View backgroundColor={variable.val} height={10} />
                      </VStack>
                    ))}
                  </HStack>
                ))}
              </VStack>
            </Story.Section>

            <Story.Section title="Radius">
              <HStack gap="$xs" flexWrap="wrap">
                {(["$sm", "$md"] as const).map((proportion) => (
                  <Frame
                    centered
                    key={proportion}
                    withBackground
                    borderRadius={proportion}
                    size={50}
                    theme="primary"
                    margin="$4"
                  >
                    <Typography>{proportion}</Typography>
                  </Frame>
                ))}
              </HStack>
            </Story.Section>

            <Story.Section title="Spacings">
              <HStack gap="$xs" flexWrap="wrap" alignItems="flex-start">
                {Object.entries(tokens.space).map(([key, value]) => (
                  <Frame
                    key={key}
                    centered
                    withBackground
                    theme="primary"
                    paddingVertical="$4"
                    width={value.val}
                  >
                    <VStack gap="$xs">
                      <Typography size="xs">${key}</Typography>
                      <Typography size="xs">{value.val}</Typography>
                    </VStack>
                  </Frame>
                ))}
              </HStack>
            </Story.Section>
          </Story>
        );
      }}
    />
  ),
};