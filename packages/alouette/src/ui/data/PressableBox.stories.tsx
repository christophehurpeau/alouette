import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { HStack, VStack } from "../stacks/stacks";
import { Story, semanticRoles } from "../story-components/Story";
import { PressableBox } from "./PressableBox";

type ThisStory = StoryObj<typeof PressableBox>;

const VARIANTS = ["contained", "outlined"] as const;

export default {
  title: "alouette/Data/PressableBox",
  component: PressableBox,
  parameters: {
    componentSubtitle:
      "Foundation pressable container that drives all alouette button-like components.",
  },
} satisfies Meta<typeof PressableBox>;

export const PreviewStory: ThisStory = {
  render: () => (
    <PressableBox className="px-m py-xs rounded-sm">
      <Text className="text-on-accent">Press me</Text>
    </PressableBox>
  ),
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <HStack className="gap-m flex-wrap">
          {VARIANTS.map((variant) => (
            <PressableBox
              key={variant}
              variant={variant}
              className="px-m py-xs rounded-sm"
            >
              <Text
                className={
                  variant === "contained" ? "text-on-accent" : "text-sharp"
                }
              >
                {variant}
              </Text>
            </PressableBox>
          ))}
        </HStack>
      </Story.Section>

      <Story.Section title="Accent themes">
        {semanticRoles.map((semanticRole) => (
          <Story.SubSection
            key={semanticRole}
            withSurface
            title={semanticRole}
            semanticRole={semanticRole}
          >
            <VStack className="gap-xs">
              {VARIANTS.map((variant) => (
                <PressableBox
                  key={variant}
                  variant={variant}
                  className="px-m py-xs rounded-sm self-start"
                >
                  <Text
                    className={
                      variant === "contained" ? "text-on-accent" : "text-sharp"
                    }
                  >
                    {variant}
                  </Text>
                </PressableBox>
              ))}
            </VStack>
          </Story.SubSection>
        ))}
      </Story.Section>
    </Story>
  ),
};
