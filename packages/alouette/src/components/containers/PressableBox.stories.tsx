import type { Meta, StoryObj } from "@storybook/react";
import { Story } from "../story-components/Story";
import { Typography } from "../typography/Typography";
import { PressableBox } from "./PressableBox";

type ThisStory = StoryObj<typeof PressableBox>;

export default {
  title: "alouette/Containers/Pressable",
  component: PressableBox,
} satisfies Meta<typeof PressableBox>;

export const PressableStory: ThisStory = {
  name: "Pressable",
  render: (args) => (
    <Story
      preview={
        <PressableBox role="button" theme="primary" {...args}>
          <Typography>Pressable</Typography>
        </PressableBox>
      }
    >
      <Story.Section title="With Background">
        <PressableBox withBackground role="button" theme="primary" padding="$4">
          <Typography contrast>With Background</Typography>
        </PressableBox>
      </Story.Section>
    </Story>
  ),
};
