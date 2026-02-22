import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { ScreenCenterLayout } from "./ScreenCenterLayout";

const meta = {
  title: "alouette/Screen/ScreenCenterLayout",
  parameters: {
    componentSubtitle:
      "Centers main content between a header and a footer using layout primitives",
  },
} satisfies Meta<typeof ScreenCenterLayout>;

export default meta;

export const PreviewStory: StoryObj<typeof ScreenCenterLayout> = {
  name: "Preview",
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <ScreenCenterLayout
      header={<Text>Header area</Text>}
      content={<Text>Centered content</Text>}
      footer={<Text>Footer area</Text>}
    />
  ),
};
