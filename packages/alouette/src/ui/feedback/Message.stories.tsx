import type { Meta, StoryObj } from "@storybook/react-vite";
import { SwatchesRegularIcon } from "alouette-icons/phosphor-icons/SwatchesRegularIcon";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import {
  ConfirmationMessage,
  InfoMessage,
  Message,
  WarningMessage,
} from "./Message";

type ThisStory = StoryObj<typeof Message>;

export default {
  title: "alouette/Feedback/Message",
  component: Message,
  parameters: {
    componentSubtitle: "A versatile component for displaying feedback to users",
    docs: {
      description: {
        component: `
### Features
- Multiple semantic themes for different message types
- Optional dismiss button for temporary notifications
- Text alignment options for emphasis
- Responsive layout with proper spacing
- Accessible by default with proper ARIA roles

### Variants
- \`onDismiss\`: Adds dismiss button with callback
- \`children\`: Message content (string or ReactNode)

### Guidelines
- Keep messages concise and clear
- Carefully choose the appropriate icon
- Use dismissible messages for temporary notifications
- Avoid stacking too many messages
- Consider message persistence based on importance

### Usage
~~~tsx
<Message onDismiss={() => setVisible(false)}>
  Operation completed successfully
</Message>
~~~`,
      },
    },
  },
  argTypes: {
    theme: {
      description: "The semantic theme of the message",
      control: "select",
      options: ["info", "success", "warning", "danger"],
      table: {
        defaultValue: { summary: "info" },
      },
    },
    onDismiss: {
      description: "Callback function when dismiss button is clicked",
      control: "boolean",
    },
    children: {
      description: "The content of the message",
      control: "text",
    },
  },
} satisfies Meta<typeof Message>;

export const PreviewMessageStory: ThisStory = {
  args: {
    theme: "info",
  },
  render: (args) => (
    <Message {...args} icon={<SwatchesRegularIcon />}>
      <Text>Example Message</Text>
    </Message>
  ),
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Defaults">
        <Message icon={<SwatchesRegularIcon />} theme="info">
          Example Message
        </Message>
        <Message
          icon={<SwatchesRegularIcon />}
          theme="info"
          dismissIconAriaLabel="Close message"
          onDismiss={() => {}}
        >
          Example Message with dismiss
        </Message>
      </Story.Section>

      <Story.Section title="Sizes">
        {(["sm", "md", "lg"] as const).map((size) => (
          <VStack key={size} gap="$0.5">
            <Message icon={<SwatchesRegularIcon />} theme="info" size={size}>
              {`Example ${size} Message`}
            </Message>
            <Message
              icon={<SwatchesRegularIcon />}
              theme="info"
              size={size}
              dismissIconAriaLabel="Close message"
              onDismiss={() => {}}
            >
              {`Example ${size} Message with dismiss`}
            </Message>
          </VStack>
        ))}
      </Story.Section>

      <Story.Section title="Semantic Messages">
        <InfoMessage>Info Message</InfoMessage>
        <ConfirmationMessage>Success Message</ConfirmationMessage>
        <WarningMessage>Danger Message</WarningMessage>
      </Story.Section>

      <Story.Section title="Edge Cases">
        <Message icon={<SwatchesRegularIcon />} theme="info">
          "Example Message with very very very very very very very very very
          very very very very very very very very very very very very very very
          long text
        </Message>

        <Message
          icon={<SwatchesRegularIcon />}
          theme="info"
          dismissIconAriaLabel="Close message"
          onDismiss={() => {}}
        >
          Dismissable Example Message with very very very very very very very
          very very very very very very very very very very very very very very
          very long text
        </Message>
      </Story.Section>
    </Story>
  ),
};
