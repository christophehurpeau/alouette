import type { Meta, StoryObj } from "@storybook/react";
import { VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import type { MessageProps } from "./Message";
import { Message } from "./Message";

type ThisStory = StoryObj<typeof Message>;

interface StoryMapConfig {
  title: string;
  theme: NonNullable<MessageProps["theme"]>;
}

const storyMapConfig: StoryMapConfig[] = [
  { title: "Info", theme: "info" },
  { title: "Confirmation", theme: "success" },
  { title: "Warning", theme: "warning" },
  { title: "Error", theme: "danger" },
  { title: "Primary", theme: "primary" },
];

export default {
  title: "alouette/Feedback/Message",
  component: Message,
  parameters: {
    componentSubtitle:
      "A versatile component for displaying feedback, status updates, and notifications to users",
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
- \`textCentered\`: Centers text horizontally
- \`onDismiss\`: Adds dismiss button with callback
- \`children\`: Message content (string or ReactNode)

### Guidelines
- Keep messages concise and clear
- Use dismissible messages for temporary notifications
- Center text only when the message is short
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
      options: ["info", "success", "warning", "danger", "primary"],
      table: {
        defaultValue: { summary: "info" },
      },
    },
    textCentered: {
      description: "Whether to center-align the message text",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
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
    children: "Example Message",
  },
  render: (args) => <Message {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Defaults">
        {storyMapConfig.map(({ title, theme }) => (
          <Story.SubSection key={title} title={title}>
            <VStack gap="$1">
              <Message theme={theme}>Example Message</Message>
              <Message theme={theme} onDismiss={() => {}}>
                Example Message with dismiss
              </Message>
              <Message textCentered theme={theme}>
                "textCentered" Example Message
              </Message>
            </VStack>
          </Story.SubSection>
        ))}
      </Story.Section>
      <Story.Section title="Edge Cases">
        <VStack gap="$1">
          <Message textCentered theme="info">
            "textCentered" Example Message with very very very very very very
            very very very very very very very very very very very very very
            very very very very long text
          </Message>

          <Message theme="info" onDismiss={() => {}}>
            Dismissable Example Message with very very very very very very very
            very very very very very very very very very very very very very
            very very long text
          </Message>
        </VStack>
      </Story.Section>
    </Story>
  ),
};
