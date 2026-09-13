import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import type { EditableSectionProps } from "../containers/EditableSection";
import { Badge } from "../data/Badge";
import { InputText } from "../inputs/InputText";
import { Paragraph, Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story, accentsWithoutNeutral } from "../story-components/Story";
import { FormValidationError } from "./Form";
import {
  FormEditableSection,
  type FormEditableSectionProps,
} from "./FormEditableSection";
import { FormField } from "./FormField";

function submitErrorToMessage(error: unknown): string {
  if (error instanceof FormValidationError) {
    return "Please fix the errors above.";
  }
  return error instanceof Error ? error.message : "Something went wrong.";
}

interface EventFormValues {
  date: string;
  notes: string;
}

interface EventSectionProps extends Partial<
  Pick<
    FormEditableSectionProps<EventFormValues>,
    | "accent"
    | "className"
    | "details"
    | "disabled"
    | "editIconVariant"
    | "modalSize"
    | "modalTitle"
    | "title"
  >
> {
  editAriaLabel?: string;
  editIcon?: EditableSectionProps["editIcon"];
  initialDate?: string;
  initialNotes?: string;
  /** Makes onSubmit reject, so the modal stays open on the error. */
  failing?: boolean;
}

/**
 * Stateful demo: the saved values drive the body, so the play function can tell
 * a discarded edit from a saved one by reading the section.
 */
function EventSection({
  title = "Event details",
  editAriaLabel = "Edit event details",
  initialDate = "12 August 2026",
  initialNotes = "The gate closes at 19:00.",
  failing = false,
  // The section brings no material of its own; most stories show it as a card.
  className = "surface",
  ...surfaceProps
}: EventSectionProps): ReactNode {
  const [date, setDate] = useState(initialDate);
  const [notes, setNotes] = useState(initialNotes);

  return (
    <FormEditableSection<EventFormValues>
      {...surfaceProps}
      className={className}
      title={title}
      titleBadge={<Badge accent="brand">{date}</Badge>}
      editAriaLabel={editAriaLabel}
      cancelLabel="Cancel"
      submitLabel="Save"
      closeButtonAriaLabel="Close editor"
      submitErrorToMessage={submitErrorToMessage}
      defaultValues={{ date, notes }}
      render={({ control }) => (
        <View className="gap-m">
          <FormField
            control={control}
            name="date"
            label="Date"
            required="A date is required."
            render={({ field, labelId }) => (
              <InputText
                ref={field.ref}
                value={field.value}
                aria-labelledby={labelId}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <FormField
            control={control}
            name="notes"
            label="Before you come"
            render={({ field, labelId }) => (
              <InputText
                ref={field.ref}
                value={field.value}
                aria-labelledby={labelId}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </View>
      )}
      onSubmit={(values) => {
        if (failing) throw new Error("The server rejected the change.");
        setDate(values.date);
        setNotes(values.notes);
      }}
    >
      <View className="gap-xs">
        <View className="gap-xxs">
          <Text className="font-body-bold text-sm">Before you come</Text>
          <Paragraph className="text-muted text-sm">{notes}</Paragraph>
        </View>
      </View>
    </FormEditableSection>
  );
}

type ThisStory = StoryObj<typeof EventSection>;

export default {
  title: "alouette/Forms/FormEditableSection",
  component: EventSection,
  parameters: {
    componentSubtitle:
      "An EditableSection whose editor is a modal owning its own Form — for a section whose value is a block of several lines rather than a summary beside a label.",
  },
  argTypes: {
    title: { control: "text" },
    modalTitle: { control: "text" },
    details: { control: "text" },
    className: { control: "text" },
    modalSize: { control: "select", options: ["sm", "md", "lg"] },
    accent: { control: "select", options: accentsWithoutNeutral },
    editIconVariant: {
      control: "select",
      options: ["contained", "outlined", "ghost", "soft"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof EventSection>;

export const FormEditableSectionPreviewStory: ThisStory = {
  name: "FormEditableSection Preview",
  args: { title: "Event details" },
  render: (args) => <EventSection {...args} />,
};

export const FormEditableSectionVariantsStory: ThisStory = {
  name: "FormEditableSection Variants",
  render: () => (
    <Story>
      <Story.Section title="Default">
        <EventSection />
      </Story.Section>

      <Story.Section title="Details under the title">
        <EventSection details="The date and what guests should know before coming." />
      </Story.Section>

      <Story.Section title="Modal title differing from the section title">
        <EventSection modalTitle="Edit the event details" />
      </Story.Section>

      <Story.Section title="Materials">
        <EventSection title="surface" editAriaLabel="Edit surface" />
        <EventSection
          className="surface bg-highlight"
          title="bg-highlight"
          editAriaLabel="Edit bg-highlight"
        />
        <EventSection
          className="surface lowered"
          title="lowered"
          editAriaLabel="Edit lowered"
        />
        <EventSection
          className="border border-muted rounded-sm p-m"
          title="outlined"
          editAriaLabel="Edit outlined"
        />
        <EventSection
          className=""
          title="no material"
          editAriaLabel="Edit no material"
        />
      </Story.Section>

      <Story.Section title="Modal sizes">
        <EventSection modalSize="sm" />
        <EventSection modalSize="lg" />
      </Story.Section>

      <Story.Section title="Accents">
        {accentsWithoutNeutral.map((accent) => (
          <EventSection
            key={accent}
            accent={accent}
            title={accent}
            editAriaLabel={`Edit ${accent}`}
          />
        ))}
      </Story.Section>

      <Story.Section title="Disabled">
        <EventSection disabled />
      </Story.Section>

      <Story.Section title="Failing submit">
        <EventSection
          failing
          title="Rejected by the server"
          editAriaLabel="Edit rejected"
        />
      </Story.Section>
    </Story>
  ),
};

export const FormEditableSectionTestsStory: ThisStory = {
  name: "FormEditableSection Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Edit lifecycle">
        <EventSection />
      </Story.Section>
      <Story.Section title="Failing submit">
        <EventSection
          failing
          title="Handle"
          editAriaLabel="Edit handle"
          initialDate="1 January 2026"
        />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The modal portals outside the canvas, so it is queried from `screen`.
    // react-native-web's own Modal container also takes role="dialog" once it
    // becomes the active modal, hence the accessible name on every query.
    async function openEditor(
      editLabel: string,
      title: string,
    ): Promise<HTMLElement> {
      await userEvent.click(canvas.getByLabelText(editLabel));
      return screen.findByRole("dialog", { name: title });
    }

    async function expectClosed(): Promise<void> {
      await waitFor(async () => {
        await expect(screen.queryAllByRole("dialog")).toHaveLength(0);
      });
    }

    // The saved date is the title badge and the notes are the body — both
    // under the region the title alone names.
    const region = canvas.getByRole("region", { name: "Event details" });
    await expect(within(region).getByText("12 August 2026")).toBeVisible();
    await expect(
      within(region).getByText("The gate closes at 19:00."),
    ).toBeVisible();

    // Cancelling discards the edit: the body still shows the saved values.
    const dialog = await openEditor("Edit event details", "Event details");
    const dateInput = within(dialog).getByLabelText("Date");
    await userEvent.clear(dateInput);
    await userEvent.type(dateInput, "13 August 2026");
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Cancel" }),
    );
    await expectClosed();
    await expect(within(region).getByText("12 August 2026")).toBeVisible();

    // Reopening reseeds from defaultValues — the discarded text is gone.
    const reopened = await openEditor("Edit event details", "Event details");
    const reopenedDate = within(reopened).getByLabelText("Date");
    await expect(reopenedDate).toHaveValue("12 August 2026");

    // A successful save closes the modal and updates the body.
    await userEvent.clear(reopenedDate);
    await userEvent.type(reopenedDate, "13 August 2026");
    await userEvent.click(
      within(reopened).getByRole("button", { name: "Save" }),
    );
    await expectClosed();
    await expect(within(region).getByText("13 August 2026")).toBeVisible();

    // A rejected submit leaves the modal open with the error rendered.
    const failing = await openEditor("Edit handle", "Handle");
    await userEvent.click(
      within(failing).getByRole("button", { name: "Save" }),
    );
    // The message lives in ActionButton's collapsible wrapper, so visibility
    // only settles once the expand transition has run.
    await waitFor(async () => {
      await expect(
        within(failing).getByText("The server rejected the change."),
      ).toBeVisible();
    });
    await expect(
      screen.getByRole("dialog", { name: "Handle" }),
    ).toBeInTheDocument();
  },
};
