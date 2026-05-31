import type { Meta, StoryObj } from "@storybook/react-vite";
import { SemanticScope } from "../..";
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
    <Box absoluteFill center>
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
        <Box layer="highlight" shadow="s" className="p-xl rounded-sm">
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
    <SemanticScope mode="light" semanticRole="brand">
      <GradientBackground>
        <Content />
      </GradientBackground>
    </SemanticScope>
  ),
};

export const PreviewGradientBackgroundStoryDarkBrand: StoryObj = {
  render: () => (
    <SemanticScope mode="dark" semanticRole="brand">
      <GradientBackground>
        <Content />
      </GradientBackground>
    </SemanticScope>
  ),
};

export const PreviewGradientWithScroll: StoryObj = {
  render: () => (
    <GradientScrollView
      semanticRole="brand"
      contentContainerStyle={{
        paddingVertical: 48,
        paddingHorizontal: 32,
      }}
    >
      <VStack className="gap-xl min-w-[80%]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Box key={i} layer="highlight" shadow="s" className="p-xl rounded-sm">
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
