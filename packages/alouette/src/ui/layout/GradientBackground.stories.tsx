import type { Meta, StoryObj } from "@storybook/react-vite";
import { Theme } from "@tamagui/core";
import { Button } from "../actions/Button";
import { Box } from "../containers/Box";
import { Surface } from "../containers/Surface";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { GradientBackground } from "./GradientBackground";
import { GradientScrollView } from "./GradientScrollView";

export default {
  title: "alouette/layout/GradientBackground",
  component: GradientBackground,
} satisfies Meta<typeof GradientBackground>;

function Content() {
  return (
    <Box absoluteFill center>
      <VStack gap="$2.0" minWidth="80%">
        <Text>Text</Text>
        <Surface layer="translucent">
          <VStack gap="$1.0">
            <Text>Surface translucent</Text>
            <Button text="Button" />
          </VStack>
        </Surface>
        <Surface>
          <VStack gap="$1.0">
            <Text>Surface</Text>
            <Button text="Button" />
          </VStack>
        </Surface>
        <Surface layer="highlight">
          <VStack gap="$1.0">
            <Text>Surface highlight</Text>
            <Button variant="outlined" text="Button" />
          </VStack>
        </Surface>
      </VStack>
    </Box>
  );
}

export const PreviewGradientBackgroundStoryLightBrand: StoryObj = {
  render: () => (
    <GradientBackground theme="brand">
      <Content />
    </GradientBackground>
  ),
};

export const PreviewGradientBackgroundStoryLightBrandLight: StoryObj = {
  render: () => (
    <>
      <GradientBackground theme="brand" />
      <Content />
    </>
  ),
};

export const PreviewGradientBackgroundStoryDarkBrand: StoryObj = {
  render: () => (
    <GradientBackground theme="dark_brand">
      <Content />
    </GradientBackground>
  ),
};

export const PreviewGradientBackgroundStoryDarkBrandLight: StoryObj = {
  render: () => (
    <Theme name="dark">
      <GradientBackground theme="dark_brand" />
      <Content />
    </Theme>
  ),
};
export const PreviewGradientWithScroll: StoryObj = {
  render: () => (
    <GradientScrollView
      gradientTheme="brand"
      theme="dark"
      contentContainerStyle={{
        paddingVertical: "$3.0",
        paddingHorizontal: "$2.0",
      }}
    >
      <VStack gap="$2.0" minWidth="80%">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Surface key={i} layer="highlight">
            <VStack gap="$1.0">
              <Text>Surface {i}</Text>
              <Button text="Button" />
            </VStack>
          </Surface>
        ))}
      </VStack>
    </GradientScrollView>
  ),
};
