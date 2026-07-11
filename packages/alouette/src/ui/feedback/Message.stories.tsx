import type { Meta, StoryObj } from "@storybook/react-vite";
import { SwatchesRegularIcon } from "alouette-icons/phosphor-icons/SwatchesRegularIcon";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import {
  ConfirmationMessage,
  ErrorMessage,
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
    accent: {
      description: "The accent of the message",
      control: "select",
      options: accents,
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
  args: { accent: "info" },
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
        <Message icon={<SwatchesRegularIcon />} accent="info">
          Example Message
        </Message>
        <Message
          icon={<SwatchesRegularIcon />}
          accent="info"
          dismissIconAriaLabel="Close message"
          onDismiss={() => {}}
        >
          Example Message with dismiss
        </Message>
      </Story.Section>

      <Story.Section withSurface title="Accents">
        {accents.map((accent) => (
          <Message key={accent} icon={<SwatchesRegularIcon />} accent={accent}>
            {`${accent} message`}
          </Message>
        ))}
      </Story.Section>

      <Story.Section withSurface title="Sizes">
        {SIZES.map((size) => (
          <VStack key={size} className="gap-xs">
            <Message icon={<SwatchesRegularIcon />} accent="info" size={size}>
              {`Example ${size} Message`}
            </Message>
            <Message
              icon={<SwatchesRegularIcon />}
              accent="info"
              size={size}
              dismissIconAriaLabel="Close message"
              onDismiss={() => {}}
            >
              {`Example ${size} Message with dismiss`}
            </Message>
          </VStack>
        ))}
      </Story.Section>

      <Story.Section withSurface title="Accent Messages">
        <InfoMessage>Info Message</InfoMessage>
        <ConfirmationMessage>Success Message</ConfirmationMessage>
        <WarningMessage>Warning Message</WarningMessage>
        <ErrorMessage>Error Message</ErrorMessage>
      </Story.Section>

      <Story.Section withSurface title="Edge Cases">
        <Message icon={<SwatchesRegularIcon />} accent="info">
          Example Message with very very very very very very very very very very
          very very very very very very very very very very very very very long
          text
        </Message>

        <Message
          icon={<SwatchesRegularIcon />}
          accent="info"
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
