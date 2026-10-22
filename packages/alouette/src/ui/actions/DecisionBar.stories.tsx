import { expect, fn, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { ActionButton } from "./ActionButton";
import { Button } from "./Button";
import { DecisionBar } from "./DecisionBar";

type ThisStory = StoryObj<typeof DecisionBar>;

export default {
  title: "alouette/Actions/DecisionBar",
  component: DecisionBar,
  parameters: {
    componentSubtitle:
      "The row of actions ending a decision: it owns their order and alignment.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<DecisionBar
  dismissText="Discard"
  onDismiss={close}
  alternative={<ActionButton accent="neutral" text="Save draft" onPress={saveDraft} errorToMessage={toMessage} />}
  primary={<ActionButton text="Publish" onPress={publish} errorToMessage={toMessage} />}
/>
~~~

- Right-aligned, in this order whatever the props' order: dismiss, \`alternative\`, \`primary\`
- \`primary\` is required: an \`ActionButton\` for an async action, a \`FormSubmitButton\` in a \`Form\`, a \`Button\` for a synchronous one
- \`onDismiss\` renders the dismiss action itself, a neutral \`soft\` Button labelled \`dismissText\` ("Cancel" by default); \`emphasis="dismiss"\` makes it neutral \`filled\` when backing out is the expected answer
- \`alternative\` is one element, another way to commit; several belong in a \`SplitButton\` or a \`Menu\`
- Only actions that end the decision: an editor's tools (attach, insert) stay in the editor's own toolbar`,
      },
    },
  },
} satisfies Meta<typeof DecisionBar>;

function errorToMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

function rejectAfter(ms: number, message: string): Promise<never> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error(message));
    }, ms);
  });
}

export const DecisionBarPreviewStory: ThisStory = {
  name: "DecisionBar Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: {
    dismissText: "Cancel",
    onDismiss: fn(),
    primary: <Button text="Save" onPress={fn()} />,
  },
  render: (args) => <DecisionBar {...args} />,
};

export const DecisionBarVariantsStory: ThisStory = {
  name: "DecisionBar Variants",
  render: () => (
    <Story>
      <Story.Section title="Primary only">
        <DecisionBar primary={<Button text="Close" onPress={fn()} />} />
      </Story.Section>

      <Story.Section title="Dismiss and primary">
        <DecisionBar
          dismissText="Cancel"
          primary={<Button text="Save" onPress={fn()} />}
          onDismiss={fn()}
        />
      </Story.Section>

      <Story.Section title="Default dismiss text">
        <DecisionBar
          primary={<Button text="Save" onPress={fn()} />}
          onDismiss={fn()}
        />
      </Story.Section>

      <Story.Section title="Null dismiss text">
        <DecisionBar
          dismissText={null}
          primary={<Button text="Save" onPress={fn()} />}
          onDismiss={fn()}
        />
      </Story.Section>

      <Story.Section title="With an alternative">
        <DecisionBar
          primary={<Button text="Publish" onPress={fn()} />}
          alternative={
            <Button accent="neutral" text="Save draft" onPress={fn()} />
          }
          dismissText="Discard"
          onDismiss={fn()}
        />
      </Story.Section>

      <Story.Section title="Alternative without dismiss">
        <DecisionBar
          primary={<Button text="Save and close" onPress={fn()} />}
          alternative={<Button accent="neutral" text="Save" onPress={fn()} />}
        />
      </Story.Section>

      <Story.Section title="Emphasis on dismiss">
        <DecisionBar
          emphasis="dismiss"
          primary={
            <Button
              accent="danger"
              variant="soft"
              text="Delete account"
              onPress={fn()}
            />
          }
          onDismiss={fn()}
        />
      </Story.Section>

      <Story.Section title="Dismiss disabled">
        <DecisionBar
          dismissDisabled
          primary={<Button state="loading" text="Save" onPress={fn()} />}
          onDismiss={fn()}
        />
      </Story.Section>

      <Story.Section title="Async primary">
        <DecisionBar
          primary={
            <ActionButton
              text="Save"
              errorToMessage={errorToMessage}
              onPress={() => rejectAfter(1000, "Simulated failure")}
            />
          }
          onDismiss={fn()}
        />
      </Story.Section>

      <Story.Section title="Narrow: wraps from the left">
        <View className="w-[280px]">
          <DecisionBar
            primary={<Button text="Publish" onPress={fn()} />}
            alternative={
              <Button accent="neutral" text="Save draft" onPress={fn()} />
            }
            dismissText="Discard"
            onDismiss={fn()}
          />
        </View>
      </Story.Section>
    </Story>
  ),
};

export const DecisionBarOrderStory: ThisStory = {
  name: "DecisionBar Order",
  args: {
    primary: <Button text="Publish" onPress={fn()} />,
    alternative: <Button accent="neutral" text="Save draft" onPress={fn()} />,
    dismissText: "Discard",
    onDismiss: fn(),
  },
  render: (args) => <DecisionBar {...args} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const names = canvas
      .getAllByRole("button")
      .map((button) => button.textContent);
    await expect(names).toEqual(["Discard", "Save draft", "Publish"]);

    await userEvent.click(canvas.getByRole("button", { name: "Discard" }));
    await expect(args.onDismiss).toHaveBeenCalledOnce();
  },
};

export const DecisionBarDefaultDismissTextStory: ThisStory = {
  name: "DecisionBar Default Dismiss Text",
  args: {
    primary: <Button text="Save" onPress={fn()} />,
    dismissText: null,
    onDismiss: fn(),
  },
  render: (args) => <DecisionBar {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Cancel" }),
    ).toBeInTheDocument();
  },
};
