import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarRegularIcon } from "alouette-icons/phosphor-icons/CalendarRegularIcon";
import { type ReactNode, useState } from "react";
import { Button } from "../actions/Button";
import { Modal } from "../containers/Modal";
import { Paragraph, Text } from "../primitives/Text";
import { Story, accents } from "../story-components/Story";
import { Badge } from "./Badge";
import { EditableItem, type EditableItemProps } from "./EditableItem";

type ThisStory = StoryObj<typeof EditableItem>;

/**
 * EditableItem owns no editor, so the stories supply one: `onEdit` opens a
 * plain Modal. FormEditableItem packages this same composition for a form.
 */
function EditableItemDemo({
  label = "Display name",
  summary = <Badge accent="brand">Ada Lovelace</Badge>,
  editAriaLabel = "Edit display name",
  children,
  ...itemProps
}: Partial<EditableItemProps>): ReactNode {
  const [editing, setEditing] = useState(false);

  function close(): void {
    setEditing(false);
  }

  return (
    <EditableItem
      {...itemProps}
      label={label}
      summary={summary}
      editAriaLabel={editAriaLabel}
      onEdit={() => {
        setEditing(true);
      }}
    >
      {children}
      <Modal
        visible={editing}
        title={label}
        closeButtonAriaLabel="Close editor"
        footer={<Button variant="outlined" text="Close" onPress={close} />}
        onClose={close}
      >
        <Paragraph>Your editor goes here.</Paragraph>
      </Modal>
    </EditableItem>
  );
}

export default {
  title: "alouette/Data/EditableItem",
  component: EditableItem,
  parameters: {
    componentSubtitle:
      "A labelled value with an edit affordance. Owns no editor — pair it with FormEditableItem, or wire onEdit to your own Modal.",
  },
  argTypes: {
    label: { control: "text" },
    details: { control: "text" },
    editAriaLabel: { control: "text" },
    variant: { control: "select", options: ["contained", "outlined", "ghost"] },
    accent: { control: "select", options: accents },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof EditableItem>;

export const EditableItemPreviewStory: ThisStory = {
  name: "EditableItem Preview",
  args: {
    label: "Display name",
    editAriaLabel: "Edit display name",
  },
  render: (args) => <EditableItemDemo {...args} />,
};

export const EditableItemVariantsStory: ThisStory = {
  name: "EditableItem Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="Summary content">
        <EditableItemDemo />
        <EditableItemDemo
          label="Time zone"
          summary={<Text className="text-muted">Europe/Paris</Text>}
          editAriaLabel="Edit time zone"
        />
        <EditableItemDemo
          label="Website"
          summary={undefined}
          editAriaLabel="Edit website"
        />
      </Story.Section>

      <Story.Section withSurface title="Details">
        <EditableItemDemo details="Shown on your public profile." />
      </Story.Section>

      <Story.Section withSurface title="Content below the row">
        <EditableItemDemo
          label="Biography"
          summary={undefined}
          editAriaLabel="Edit biography"
          details="Too long for the summary slot."
        >
          <Paragraph>
            Mathematician and writer, chiefly known for her work on the
            Analytical Engine.
          </Paragraph>
        </EditableItemDemo>
      </Story.Section>

      <Story.Section withSurface title="Edit button variants">
        <EditableItemDemo variant="contained" />
        <EditableItemDemo variant="outlined" />
        <EditableItemDemo variant="ghost" />
      </Story.Section>

      <Story.Section withSurface title="Custom edit icon">
        <EditableItemDemo
          label="Renewal date"
          summary={<Badge accent="info">12 Aug 2026</Badge>}
          editAriaLabel="Edit renewal date"
          editIcon={<CalendarRegularIcon />}
        />
      </Story.Section>

      <Story.Section withSurface title="Accents">
        {accents.map((accent) => (
          <EditableItemDemo
            key={accent}
            accent={accent}
            label={accent}
            summary={<Badge accent={accent}>{accent}</Badge>}
            editAriaLabel={`Edit ${accent}`}
          />
        ))}
      </Story.Section>

      <Story.Section withSurface title="Disabled">
        <EditableItemDemo disabled />
        <EditableItemDemo disabled variant="outlined" />
        <EditableItemDemo disabled variant="ghost" />
      </Story.Section>
    </Story>
  ),
};

// Renders the press count so the play function can assert onEdit fired without
// reaching into a spy.
function EditCounter(props: Partial<EditableItemProps>): ReactNode {
  const [count, setCount] = useState(0);

  return (
    <EditableItem
      label="Display name"
      editAriaLabel="Edit display name"
      summary={<Text>{`edited ${count}`}</Text>}
      {...props}
      onEdit={() => {
        setCount(count + 1);
      }}
    />
  );
}

export const EditableItemTestsStory: ThisStory = {
  name: "EditableItem Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Edit affordance">
        <EditCounter />
        <EditCounter
          disabled
          label="Account ID"
          editAriaLabel="Edit account id"
          summary={<Text>locked 0</Text>}
        />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText("Edit display name"));
    await expect(canvas.getByText("edited 1")).toBeInTheDocument();

    // A disabled item exposes the same accessible name but never fires.
    const lockedButton = canvas.getByLabelText("Edit account id");
    await expect(lockedButton).toBeDisabled();
    await userEvent.click(lockedButton, { pointerEventsCheck: 0 });
    await expect(canvas.getByText("locked 0")).toBeInTheDocument();
  },
};
