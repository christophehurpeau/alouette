import type { Meta, StoryObj } from "@storybook/react";
import { Story } from "../story-components/Story";
import type { MessageProps } from "./Message";
import { Message } from "./Message";
import { VStack } from "../primitives/stacks";

type ThisStory = StoryObj<typeof Message>;

export default {
  title: "alouette/Feedback/Message",
  component: Message,
} satisfies Meta<typeof Message>;

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

export const MessageStory: ThisStory = {
  name: "Message",
  render: () => (
    <Story preview={<Message theme="info">Test</Message>}>
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
          <Message theme="info" textCentered>
            "textCentered" Example Message with very very very very very very
            very very very very very very very very very very very very very
            very very very long text
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
