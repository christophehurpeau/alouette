import type { Meta, StoryObj } from "@storybook/react";
import { VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { Typography } from "../typography/Typography";
import { PressableListItem } from "./list";

export default {
  title: "alouette/layout/List",
} satisfies Meta<unknown>;

export const PressableListItemStory: StoryObj = {
  name: "List",
  render: () => (
    <Story
      preview={
        <VStack>
          <PressableListItem onPress={() => {}}>
            <Typography>List Item</Typography>
          </PressableListItem>
        </VStack>
      }
    />
  ),
};
