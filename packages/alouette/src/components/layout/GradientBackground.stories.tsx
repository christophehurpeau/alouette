import type { Meta, StoryObj } from "@storybook/react-vite";
import { Theme } from "@tamagui/core";
import { Button } from "../actions/Button";
import { Box } from "../containers/Box";
import { VStack } from "../primitives/stacks";
import { Typography } from "../typography/Typography";
import { GradientBackground } from "./GradientBackground";

export default {
  title: "alouette/layout/GradientBackground",
  component: GradientBackground,
  parameters: {},
} satisfies Meta<typeof GradientBackground>;

function Content() {
  return (
    <Box fullscreen centered flexGrow={1}>
      <VStack gap="$4" minWidth="80%">
        <Typography>Text</Typography>
        <Box
          withElevation
          withScreenBackground
          padding="$sm"
          borderRadius="$sm"
          gap="$sm"
        >
          <Typography>withElevation withScreenBackground</Typography>
          <Button variant="elevated" text="Button" />
        </Box>
        <Box
          withElevation
          withScreenBackground="translucent"
          padding="$sm"
          borderRadius="$sm"
          gap="$sm"
        >
          <Typography>
            withElevation withScreenBackground=translucent
          </Typography>
          <Button variant="outlined" text="Button" />
        </Box>
        <Box withBackground padding="$sm" borderRadius="$sm" gap="$sm">
          <Typography>withBackground</Typography>
          <Button variant="outlined" text="Button" />
        </Box>
      </VStack>
    </Box>
  );
}

export const PreviewGradientBackgroundStoryLightPrimary: StoryObj = {
  render: () => (
    <GradientBackground theme="primary">
      <Content />
    </GradientBackground>
  ),
};

export const PreviewGradientBackgroundStoryLightPrimaryLight: StoryObj = {
  render: () => (
    <>
      <GradientBackground theme="primary" />
      <Content />
    </>
  ),
};

export const PreviewGradientBackgroundStoryDarkPrimary: StoryObj = {
  render: () => (
    <GradientBackground theme="dark_primary">
      <Content />
    </GradientBackground>
  ),
};

export const PreviewGradientBackgroundStoryDarkPrimaryLight: StoryObj = {
  render: () => (
    <Theme name="dark">
      <GradientBackground theme="dark_primary" />
      <Content />
    </Theme>
  ),
};
