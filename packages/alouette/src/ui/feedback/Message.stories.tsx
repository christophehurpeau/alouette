import type { Meta, StoryObj } from "@storybook/react-vite";
import { SwatchesRegularIcon } from "alouette-icons/phosphor-icons/SwatchesRegularIcon";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story, semanticRoles } from "../story-components/Story";
import {
  ConfirmationMessage,
  InfoMessage,
  Message,
  WarningMessage,
} from "./Message";

type ThisStory = StoryObj<typeof Message>;

const SIZES = ["sm", "md", "lg"] as const;

export default {
  title: "alouette/Feedback/Message",
  component: Message,
  parameters: {
    componentSubtitle: "A versatile component for displaying feedback to users",
  },
  argTypes: {
    semanticRole: {
      description: "The semantic role of the message",
      control: "select",
      options: semanticRoles,
      table: { defaultValue: { summary: "info" } },
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
  args: { semanticRole: "info" },
  render: (args) => (
    <Message {...args} icon={<SwatchesRegularIcon />}>
      <Text>Example Message</Text>
    </Message>
  ),
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section withSurface title="Defaults">
        <Message icon={<SwatchesRegularIcon />} semanticRole="info">
          Example Message
        </Message>
        <Message
          icon={<SwatchesRegularIcon />}
          semanticRole="info"
          dismissIconAriaLabel="Close message"
          onDismiss={() => {}}
        >
          Example Message with dismiss
        </Message>
      </Story.Section>

      <Story.Section withSurface title="Semantic Roles">
        {semanticRoles.map((semanticRole) => (
          <Message
            key={semanticRole}
            icon={<SwatchesRegularIcon />}
            semanticRole={semanticRole}
          >
            {`${semanticRole} message`}
          </Message>
        ))}
      </Story.Section>

      <Story.Section withSurface title="Sizes">
        {SIZES.map((size) => (
          <VStack key={size} className="gap-xs">
            <Message
              icon={<SwatchesRegularIcon />}
              semanticRole="info"
              size={size}
            >
              {`Example ${size} Message`}
            </Message>
            <Message
              icon={<SwatchesRegularIcon />}
              semanticRole="info"
              size={size}
              dismissIconAriaLabel="Close message"
              onDismiss={() => {}}
            >
              {`Example ${size} Message with dismiss`}
            </Message>
          </VStack>
        ))}
      </Story.Section>

      <Story.Section withSurface title="Semantic Messages">
        <InfoMessage>Info Message</InfoMessage>
        <ConfirmationMessage>Success Message</ConfirmationMessage>
        <WarningMessage>Warning Message</WarningMessage>
      </Story.Section>

      <Story.Section withSurface title="Edge Cases">
        <Message icon={<SwatchesRegularIcon />} semanticRole="info">
          Example Message with very very very very very very very very very very
          very very very very very very very very very very very very very long
          text
        </Message>

        <Message
          icon={<SwatchesRegularIcon />}
          semanticRole="info"
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
