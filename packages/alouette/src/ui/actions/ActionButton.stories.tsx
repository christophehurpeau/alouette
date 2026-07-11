import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";
import { Story } from "../story-components/Story";
import { ActionButton } from "./ActionButton";

type ThisStory = StoryObj<typeof ActionButton>;

export default {
  title: "alouette/Actions/ActionButton",
  component: ActionButton,
  parameters: {
    componentSubtitle:
      "A Button that runs a promise-returning onPress, showing a spinner while pending and flipping to the danger accent if it rejects",
    docs: {
      description: {
        component: `### Usage
~~~tsx
<ActionButton
  text="Save"
  onPress={async () => {
    await saveChanges();
  }}
/>
~~~`,
      },
    },
  },
} satisfies Meta<typeof ActionButton>;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function rejectAfter(ms: number, message: string): Promise<never> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error(message));
    }, ms);
  });
}

export const ActionButtonPreviewStory: ThisStory = {
  name: "ActionButton Preview",
  args: {
    text: "Save",
  },
  render: (args) => (
    <ActionButton
      {...args}
      icon={<CheckRegularIcon />}
      onPress={() => delay(1500)}
    />
  ),
};

export const ActionButtonVariantsStory: ThisStory = {
  name: "ActionButton Variants",
  render: () => (
    <Story documentation="Click a button below to see it in action: the spinner replaces the icon while pending, re-presses are ignored until it settles, and a rejection flips the accent to danger.">
      <Story.Section title="Resolves">
        <ActionButton
          text="Save"
          errorToMessage={(error) =>
            error instanceof Error ? error.message : "Unknown error"
          }
          onPress={() => delay(1500)}
        />
      </Story.Section>

      <Story.Section title="Rejects">
        <ActionButton
          text="Delete"
          errorToMessage={(error) =>
            error instanceof Error ? error.message : "Unknown error"
          }
          onPress={() => rejectAfter(1500, "Simulated failure")}
        />
      </Story.Section>

      <Story.Section title="Sizes">
        <ActionButton
          size="sm"
          text="Save"
          errorToMessage={(error) =>
            error instanceof Error ? error.message : "Unknown error"
          }
          onPress={() => delay(1500)}
        />
        <ActionButton
          size="md"
          text="Save"
          errorToMessage={(error) =>
            error instanceof Error ? error.message : "Unknown error"
          }
          onPress={() => delay(1500)}
        />
      </Story.Section>

      <Story.Section title="Variants">
        <ActionButton
          variant="outlined"
          text="Save"
          errorToMessage={(error) =>
            error instanceof Error ? error.message : "Unknown error"
          }
          onPress={() => delay(1500)}
        />
        <ActionButton
          variant="ghost"
          text="Save"
          errorToMessage={(error) =>
            error instanceof Error ? error.message : "Unknown error"
          }
          onPress={() => delay(1500)}
        />
      </Story.Section>

      <Story.Section title="Synchronous onPress">
        <ActionButton
          text="Log"
          errorToMessage={(error) =>
            error instanceof Error ? error.message : "Unknown error"
          }
          onPress={() => {
            // eslint-disable-next-line no-console
            console.log("Synchronous press, no loading state");
          }}
        />
      </Story.Section>
    </Story>
  ),
};
