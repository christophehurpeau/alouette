import type { Meta, StoryObj } from "@storybook/react";
import { HStack, VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { Typography } from "../typography/Typography";
import { Frame } from "./Frame";

type ThisStory = StoryObj<typeof Frame>;

export default {
  title: "alouette/Containers/Frame",
  component: Frame,
} satisfies Meta<typeof Frame>;

export const FrameStory: ThisStory = {
  name: "Frame",
  render: (args) => (
    <Story
      preview={
        <Frame theme="primary" {...args}>
          <Typography>Frame</Typography>
        </Frame>
      }
    >
      <Story.Section title="With Background">
        <Frame withBackground theme="primary" padding="$4">
          <Typography contrast>With Background</Typography>
        </Frame>
      </Story.Section>

      <Story.Section title="Proportion with radius and padding">
        <HStack
          theme="primary"
          gap="$xs"
          flexWrap="wrap"
          alignContent="flex-start"
          alignItems="flex-start"
        >
          {(["$sm", "$md"] as const).map((proportion) => (
            <Frame
              asChild
              centered
              key={proportion}
              withBackground
              borderRadius={proportion}
              padding={proportion}
              margin="$4"
            >
              <Typography contrast>{proportion}</Typography>
            </Frame>
          ))}
        </HStack>
      </Story.Section>

      <Story.Section title="Interactive">
        <VStack $medium={{ flexDirection: "row" }} gap="$xs">
          {([undefined, "hover", "focus", "press"] as const).map((state) => (
            <Story.Section
              key={state || "default"}
              level={2}
              title={state || "Default"}
            >
              <VStack theme="primary" gap="$xs">
                <Frame
                  asChild
                  interactive
                  role="none"
                  padding="$4"
                  internalForcedPseudoState={state}
                >
                  <Typography contrast>interactive</Typography>
                </Frame>

                <Frame
                  asChild
                  interactive
                  withBackground
                  role="none"
                  padding="$4"
                  internalForcedPseudoState={state}
                >
                  <Typography contrast>interactive withBackground</Typography>
                </Frame>

                <Frame
                  asChild
                  interactive
                  withBackground
                  withBorder
                  role="none"
                  padding="$4"
                  internalForcedPseudoState={state}
                >
                  <Typography contrast>
                    interactive withBackground withBorder
                  </Typography>
                </Frame>
              </VStack>
            </Story.Section>
          ))}
        </VStack>
      </Story.Section>
    </Story>
  ),
};
