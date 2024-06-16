import type { Meta, StoryObj } from "@storybook/react";
import type { Entries } from "type-fest";
import { View } from "../components/primitives/View";
import { VStack } from "../components/primitives/stacks";
import { StoryGrid } from "../components/story-components/StoryGrid";
import { Story } from "../components/story-components/Story";
import { Frame } from "../components/containers/Frame";
import { Typography } from "../components/typography/Typography";
import { groupTokens } from "./utils/groupTokens";
import { WithTamaguiConfig } from "../components/story-components/WithTamaguiConfig";

type ThisStory = StoryObj<unknown>;

export default {
  title: "alouette/Config/Themes",
} satisfies Meta<unknown>;

export const TokensStory: ThisStory = {
  name: "Themes",
  render: () => (
    <WithTamaguiConfig
      render={({ themes }) => {
        return (
          <Story>
            {(Object.entries(themes) as Entries<typeof themes>).map(
              ([themeName, theme]) => (
                <Story.Section key={themeName} title={themeName}>
                  <Frame
                    withBackground
                    padding="$md"
                    theme={themeName as string}
                  >
                    <Typography contrast>Demo</Typography>
                  </Frame>

                  {groupTokens(theme).map(([groupName, tokens]) => (
                    <StoryGrid.Row key={groupName} flexWrap>
                      {tokens.map(({ key, variable }) => (
                        <StoryGrid.Col key={`${groupName}-${key}`}>
                          <VStack
                            key={`${groupName}-${key}`}
                            alignItems="stretch"
                            gap="$1"
                            minWidth={60}
                            flexGrow={1}
                          >
                            <Typography>{key}</Typography>
                            {}
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
