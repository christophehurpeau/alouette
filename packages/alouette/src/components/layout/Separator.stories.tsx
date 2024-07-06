import type { Meta, StoryObj } from "@storybook/react";
import { View } from "../primitives/View";
import { HStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { Typography } from "../typography/Typography";
import { Separator } from "./Separator";

export default {
  title: "alouette/layout/Separator",
  component: Separator,
} satisfies Meta<unknown>;

export const SeparatorStory: StoryObj = {
  name: "Separator",
  render: () => (
    <Story preview={<Separator />}>
      <Story.Section title="Themes">
        <Story.SubSection title="primary">
          <Separator theme="primary" />
        </Story.SubSection>

        <Story.SubSection title="success">
          <Separator theme="success" />
        </Story.SubSection>
      </Story.Section>
      <Story.Section title="Vertical">
        <HStack height={100}>
          <View flexGrow={1}>
            <Typography />
          </View>
          <Separator vertical />
          <View flexGrow={1}>
            <Typography />
          </View>
        </HStack>
      </Story.Section>
    </Story>
  ),
};
