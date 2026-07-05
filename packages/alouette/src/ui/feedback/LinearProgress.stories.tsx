import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { IndeterminateToggleDemo } from "../story-components/IndeterminateToggleDemo";
import { Story } from "../story-components/Story";
import { IndeterminateLinearProgress, LinearProgress } from "./LinearProgress";

type ThisStory = StoryObj<typeof LinearProgress>;

export default {
  title: "alouette/Feedback/LinearProgress",
  component: LinearProgress,
  parameters: {
    componentSubtitle:
      "Bar pinned to the top of its container that fills to a known completion percentage",
  },
  argTypes: {
    progress: {
      description: "Known completion percentage, 0-100",
      control: { type: "range", min: 0, max: 100 },
    },
    hidden: {
      description: "Hide the bar, e.g. once the operation completes",
      control: "boolean",
    },
    accent: {
      description: "Accent used for the bar's fill color",
      control: "select",
      options: ["brand", "danger", "info", "success", "warning"],
    },
    size: {
      description: "Thickness of the bar",
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof LinearProgress>;

export const LinearProgressPreviewStory: ThisStory = {
  name: "LinearProgress Preview",
  args: { progress: 60 },
  render: (args) => (
    <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
      <LinearProgress {...args} />
    </Box>
  ),
};

export const LinearProgressVariantsStory: ThisStory = {
  name: "LinearProgress Variants",
  render: () => (
    <Story>
      <Story.Section title="Progress">
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress progress={20} />
        </Box>
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress progress={60} />
        </Box>
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress progress={100} />
        </Box>
      </Story.Section>

      <Story.Section title="Accents">
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress progress={60} accent="danger" />
        </Box>
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress progress={60} accent="success" />
        </Box>
      </Story.Section>

      <Story.Section title="Hidden">
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress hidden progress={60} />
        </Box>
      </Story.Section>

      <Story.Section title="Sizes">
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress progress={60} size="xs" />
        </Box>
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress progress={60} size="sm" />
        </Box>
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress progress={60} size="md" />
        </Box>
        <Box className="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          <LinearProgress progress={60} size="lg" />
        </Box>
      </Story.Section>

      <Story.Section title="Indeterminate">
        <IndeterminateToggleDemo boxClassName="relative h-16 w-80 overflow-hidden rounded-sm bg-lowered">
          {(loading) => <IndeterminateLinearProgress loading={loading} />}
        </IndeterminateToggleDemo>
      </Story.Section>
    </Story>
  ),
};
