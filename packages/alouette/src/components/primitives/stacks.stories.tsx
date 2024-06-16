import type { Meta, StoryObj } from "@storybook/react";
import { Story } from "../story-components/Story";
import { View } from "./View";
import { HStack, VStack, Stack } from "./stacks";
import { Typography } from "../typography/Typography";
import { Frame } from "../containers/Frame";

export default {
  title: "alouette/Primitives/Stacks",
  component: View,
} satisfies Meta<unknown>;

export const StacksStory: StoryObj = {
  name: "Stacks",
  render: () => (
    <Story>
      <Story.Section title="HStack">
        <HStack>
          <View flexGrow={1}>
            <Typography>1</Typography>
          </View>
          <View flexGrow={1}>
            <Typography>2</Typography>
          </View>
        </HStack>
      </Story.Section>
      <Story.Section title="VStack">
        <VStack>
          <View flexGrow={1}>
            <Typography>1</Typography>
          </View>
          <View flexGrow={1}>
            <Typography>2</Typography>
          </View>
        </VStack>
      </Story.Section>
      <Story.Section title="HStack with gap">
        <HStack theme="primary" gap="$20">
          <Frame centered withBackground flexGrow={1}>
            <Typography contrast>1</Typography>
          </Frame>
          <Frame centered withBackground flexGrow={1}>
            <Typography contrast>2</Typography>
          </Frame>
        </HStack>
      </Story.Section>
      <Story.Section title="VStack with gap">
        <VStack theme="primary" gap="$20" alignItems="flex-start">
          <Frame centered withBackground flexGrow={1}>
            <Typography>1</Typography>
          </Frame>
          <Frame centered backgroundColor="$color.primary.9" flexGrow={1}>
            <Typography>2</Typography>
          </Frame>
        </VStack>
      </Story.Section>
      <Story.Section title="VStack in base, HStack in large">
        <Stack
          theme="primary"
          type="v"
          $large={{ type: "h" }}
          gap="$20"
          alignItems="flex-start"
        >
          <Frame centered withBackground flexGrow={1}>
            <Typography>1</Typography>
          </Frame>
          <Frame centered backgroundColor="$color.primary.9" flexGrow={1}>
            <Typography>2</Typography>
          </Frame>
        </Stack>
      </Story.Section>
    </Story>
  ),
};
