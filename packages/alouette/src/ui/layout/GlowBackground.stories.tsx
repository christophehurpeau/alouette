import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../actions/Button";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { GlowBackground } from "./GlowBackground";

export default {
  title: "alouette/Layout/GlowBackground",
  component: GlowBackground,
} satisfies Meta<typeof GlowBackground>;

function Content() {
  return (
    <View className="gap-xl p-xxl">
      <Text className="font-heading-extrabold text-4xl">
        Pull requests that{" "}
        <Text accent="brand" className="text-accent italic">
          move forward
        </Text>
        .
      </Text>
      <Button variant="filled" text="Get started" />
      <View className="flex-row flex-wrap gap-m">
        <Box className="surface surface-sm min-w-[220px] flex-1 gap-sm">
          <Text className="font-body-bold">Surface</Text>
          <Text className="text-sm text-muted">Raised over the glow.</Text>
        </Box>
        <Box className="surface surface-sm min-w-[220px] flex-1 gap-sm">
          <Text className="font-body-bold">Surface</Text>
          <Text className="text-sm text-muted">Raised over the glow.</Text>
        </Box>
      </View>
    </View>
  );
}

export const PreviewGlowBackgroundStory: StoryObj = {
  name: "GlowBackground Preview",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <View className="relative h-[560px] bg-screen">
      <GlowBackground accent="brand" secondaryAccent="info" />
      <Content />
    </View>
  ),
};

export const VariantsGlowBackgroundStory: StoryObj = {
  name: "GlowBackground Variants",
  render: () => (
    <Story>
      <Story.Section title="Brand">
        <View className="relative h-[560px] bg-screen">
          <GlowBackground accent="brand" />
          <Content />
        </View>
      </Story.Section>
      <Story.Section title="Brand + info">
        <View className="relative h-[560px] bg-screen">
          <GlowBackground accent="brand" secondaryAccent="info" />
          <Content />
        </View>
      </Story.Section>
    </Story>
  ),
};
