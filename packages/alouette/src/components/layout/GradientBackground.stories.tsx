import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { Typography } from "../typography/Typography";
import { GradientBackground } from "./GradientBackground";

export default {
  title: "alouette/layout/GradientBackground",
  component: GradientBackground,
  parameters: {},
} satisfies Meta<typeof GradientBackground>;

export const PreviewGradientBackgroundStoryLightPrimary: StoryObj = {
  render: () => (
    <GradientBackground theme="primary">
      <Box centered flexGrow={1}>
        <Typography>Content</Typography>
      </Box>
    </GradientBackground>
  ),
};

export const PreviewGradientBackgroundStoryDarkPrimary: StoryObj = {
  render: () => (
    <GradientBackground theme="dark_primary">
      <Box centered flexGrow={1}>
        <Typography>Content</Typography>
      </Box>
    </GradientBackground>
  ),
};
