import type { Meta, StoryObj } from "@storybook/react-vite";
import { AccentScope } from "../..";
import { Button } from "../actions/Button";
import { Box } from "../containers/Box";
import { Surface } from "../containers/Surface";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { GradientBackground } from "./GradientBackground";
import { GradientScrollView } from "./GradientScrollView";

export default {
  title: "alouette/Layout/GradientBackground",
  component: GradientBackground,
} satisfies Meta<typeof GradientBackground>;

function Content() {
  return (
    <Box className="absolute inset-0 flex-center">
      <VStack className="gap-xl min-w-[80%]">
        <Text>Text</Text>
        <Surface variant="translucent">
          <VStack className="gap-m">
            <Text>Surface translucent</Text>
            <Button text="Button" />
          </VStack>
        </Surface>
        <Surface>
          <VStack className="gap-m">
            <Text>Surface</Text>
            <Button text="Button" />
          </VStack>
        </Surface>
        <Box className="bg-highlight shadow-s p-xl rounded-sm">
          <VStack className="gap-m">
            <Text>Highlight</Text>
            <Button variant="outlined" text="Button" />
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}

export const PreviewGradientBackgroundStoryLightBrand: StoryObj = {
  render: () => (
    <AccentScope mode="light" accent="brand">
      <GradientBackground>
        <Content />
      </GradientBackground>
    </AccentScope>
  ),
};

export const PreviewGradientBackgroundStoryDarkBrand: StoryObj = {
  render: () => (
    <AccentScope mode="dark" accent="brand">
      <GradientBackground>
        <Content />
      </GradientBackground>
    </AccentScope>
  ),
};

export const PreviewGradientWithScroll: StoryObj = {
  render: () => (
    <GradientScrollView
      accent="brand"
      contentContainerStyle={{
        paddingVertical: 48,
        paddingHorizontal: 32,
      }}
    >
      <VStack className="gap-xl min-w-[80%]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Box key={i} className="bg-highlight shadow-s p-xl rounded-sm">
            <VStack className="gap-m">
              <Text>Highlight {i}</Text>
              <Button text="Button" />
            </VStack>
          </Box>
        ))}
      </VStack>
    </GradientScrollView>
  ),
};
