import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../actions/Button";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { GradientBackground } from "./GradientBackground";
import { GradientScrollView } from "./GradientScrollView";

export default {
  title: "alouette/Layout/GradientBackground",
  component: GradientBackground,
} satisfies Meta<typeof GradientBackground>;

function Content() {
  return (
    <Box className="absolute inset-0 flex-center">
      <View className="gap-xl min-w-[80%]">
        <Text>Text</Text>
        <Box className="surface bg-translucent">
          <View className="gap-m">
            <Text className="text-sharp">Surface translucent</Text>
            <Button accent="neutral" text="Button" />
          </View>
        </Box>
        <Box className="surface">
          <View className="gap-m">
            <Text className="text-sharp">Surface</Text>
            <Button accent="neutral" text="Button" />
          </View>
        </Box>
        <Box className="bg-highlight shadow-s p-xl rounded-sm">
          <View className="gap-m">
            <Text className="text-sharp">Highlight</Text>
            <Button text="Button" />
          </View>
        </Box>
      </View>
    </Box>
  );
}

function ScrollContent() {
  return (
    <View className="gap-xl min-w-[80%]">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Box key={i} className="bg-highlight shadow-s p-xl rounded-sm">
          <View className="gap-m">
            <Text>Highlight {i}</Text>
            <Button text="Button" />
          </View>
        </Box>
      ))}
    </View>
  );
}

export const PreviewGradientBackgroundStory: StoryObj = {
  name: "GradientBackground Preview",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <GradientBackground accent="brand">
      <Content />
    </GradientBackground>
  ),
};

export const VariantsGradientBackgroundStory: StoryObj = {
  name: "GradientBackground Variants",
  render: () => (
    <Story>
      <Story.Section title="Default">
        <View className="relative h-[560px]">
          <GradientBackground>
            <Content />
          </GradientBackground>
        </View>
      </Story.Section>
      <Story.Section title="Brand">
        <View className="relative h-[560px]">
          <GradientBackground accent="brand">
            <Content />
          </GradientBackground>
        </View>
      </Story.Section>
      <Story.Section title="GradientScrollView">
        <View className="h-[560px]">
          <GradientScrollView
            accent="brand"
            contentContainerClassName="py-xxl px-xl"
          >
            <ScrollContent />
          </GradientScrollView>
        </View>
      </Story.Section>
    </Story>
  ),
};
