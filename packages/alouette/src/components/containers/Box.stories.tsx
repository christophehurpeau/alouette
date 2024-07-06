import type { Meta, StoryObj } from "@storybook/react";
import { HStack, VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { Typography } from "../typography/Typography";
import { Box } from "./Box";

type ThisStory = StoryObj<typeof Box>;

export default {
  title: "alouette/Containers/Box",
  component: Box,
} satisfies Meta<typeof Box>;

export const BoxStory: ThisStory = {
  name: "Box",
  render: (args) => (
    <Story
      preview={
        <Box theme="primary" {...args}>
          <Typography>Box</Typography>
        </Box>
      }
    >
      <Story.Section title="With Background">
        <Box withBackground theme="primary" padding="$4">
          <Typography contrast>With Background</Typography>
        </Box>
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
            <Box
              key={proportion}
              asChild
              centered
              withBackground
              borderRadius={proportion}
              padding={proportion}
              margin="$4"
            >
              <Typography contrast>{proportion}</Typography>
            </Box>
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
                <Box
                  asChild
                  interactive
                  role="none"
                  padding="$4"
                  internalForcedPseudoState={state}
                >
                  <Typography contrast>interactive</Typography>
                </Box>

                <Box
                  asChild
                  interactive
                  withBackground
                  role="none"
                  padding="$4"
                  internalForcedPseudoState={state}
                >
                  <Typography contrast>interactive withBackground</Typography>
                </Box>

                <Box
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
                </Box>
              </VStack>
            </Story.Section>
          ))}
        </VStack>
      </Story.Section>
    </Story>
  ),
};
