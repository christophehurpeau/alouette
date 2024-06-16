import type { Meta, StoryObj } from "@storybook/react";
import { Story } from "../story-components/Story";
import { Typography } from "../typography/Typography";
import { Pressable } from "./Pressable";

type ThisStory = StoryObj<typeof Pressable>;

export default {
  title: "alouette/Containers/Pressable",
  component: Pressable,
} satisfies Meta<typeof Pressable>;

export const PressableStory: ThisStory = {
  name: "Pressable",
  render: (args) => (
    <Story
      preview={
        <Pressable role="button" theme="primary" {...args}>
          <Typography>Pressable</Typography>
        </Pressable>
      }
    >
      <Story.Section title="With Background">
        <Pressable role="button" withBackground theme="primary" padding="$4">
          <Typography contrast>With Background</Typography>
        </Pressable>
      </Story.Section>
    </Story>
  ),
};
