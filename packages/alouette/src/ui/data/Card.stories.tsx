import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { Card } from "./Card";

const meta = {
  title: "alouette/Data/Card",
  parameters: {
    componentSubtitle: "Simple Card using Surface for header, body and footer",
  },
} satisfies Meta<unknown>;

export default meta;

export const PreviewStory: StoryObj<unknown> = {
  name: "Card Preview",
  parameters: {
    layout: "padded",
  },
  render: () => (
    <Card
      header={<Text>Header content</Text>}
      footer={<Text>Footer content</Text>}
    >
      <Text>Body content inside the card</Text>
    </Card>
  ),
};

export const VariantsStory: StoryObj<unknown> = {
  name: "Card Variants",
  render: () => (
    <Story>
      <VStack gap="$2.0">
        <Card header={<Text>Header</Text>} footer={<Text>Footer</Text>}>
          <Text>Body</Text>
        </Card>

        <Card footer={<Text>Footer</Text>}>
          <Text>Body</Text>
        </Card>
      </VStack>
    </Story>
  ),
};
