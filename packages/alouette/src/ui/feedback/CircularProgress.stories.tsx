import { expect } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HStack } from "../stacks/stacks";
import { IndeterminateToggleDemo } from "../story-components/IndeterminateToggleDemo";
import { Story } from "../story-components/Story";
import {
  CircularProgress,
  IndeterminateCircularProgress,
} from "./CircularProgress";

type ThisStory = StoryObj<typeof CircularProgress>;

export default {
  title: "alouette/Feedback/CircularProgress",
  component: CircularProgress,
  parameters: {
    componentSubtitle:
      "Inline ring that fills to a known completion percentage",
  },
  argTypes: {
    progress: {
      description: "Known completion percentage, 0-100",
      control: { type: "range", min: 0, max: 100 },
    },
    hidden: {
      description: "Hide the ring, e.g. once the operation completes",
      control: "boolean",
    },
    accent: {
      description: "Accent used for the ring's fill color",
      control: "select",
      options: ["brand", "danger", "info", "success", "warning"],
    },
    size: {
      description: "Diameter of the ring",
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof CircularProgress>;

export const CircularProgressPreviewStory: ThisStory = {
  name: "CircularProgress Preview",
  args: { progress: 60 },
  render: (args) => <CircularProgress {...args} />,
  play: async ({ canvasElement }) => {
    // Rings must resolve their text-* class through the brand accent scope,
    // not inherit body's hotpink lint marker. The expected values are
    // light_brand's --color-border-muted (#98D9F3) and --color-accent (#07556D).
    const [trackSvg, fillSvg] = canvasElement.querySelectorAll("svg");
    if (!trackSvg || !fillSvg) throw new Error("Expected track and fill svgs");
    await expect(getComputedStyle(trackSvg).color).toBe("rgb(152, 217, 243)");
    await expect(getComputedStyle(fillSvg).color).toBe("rgb(7, 85, 109)");
  },
};

export const CircularProgressVariantsStory: ThisStory = {
  name: "CircularProgress Variants",
  render: () => (
    <Story>
      <Story.Section title="Sizes">
        <HStack className="items-center gap-m">
          <CircularProgress progress={60} size="xs" />
          <CircularProgress progress={60} size="sm" />
          <CircularProgress progress={60} size="md" />
          <CircularProgress progress={60} size="lg" />
        </HStack>
      </Story.Section>

      <Story.Section title="Accents">
        <HStack className="items-center gap-m">
          <CircularProgress progress={30} />
          <CircularProgress progress={60} accent="danger" />
          <CircularProgress progress={90} accent="success" />
        </HStack>
      </Story.Section>

      <Story.Section title="Hidden">
        <CircularProgress hidden progress={60} />
      </Story.Section>

      <Story.Section title="Indeterminate">
        <IndeterminateToggleDemo boxClassName="relative h-80 w-80 overflow-hidden rounded-sm bg-lowered flex-center">
          {(loading) => <IndeterminateCircularProgress loading={loading} />}
        </IndeterminateToggleDemo>
      </Story.Section>
    </Story>
  ),
};
