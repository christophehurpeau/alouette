import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarRegularIcon } from "alouette-icons/phosphor-icons/CalendarRegularIcon";
import { type ReactNode, useState } from "react";
import { Badge } from "../data/Badge";
import type { EditableItemProps } from "../data/EditableItem";
import { InputText } from "../inputs/InputText";
import { Text } from "../primitives/Text";
import { Story, accents } from "../story-components/Story";
import { FormValidationError } from "./Form";
import {
  FormEditableItem,
  type FormEditableItemProps,
} from "./FormEditableItem";
import { FormField } from "./FormField";

function submitErrorToMessage(error: unknown): string {
  if (error instanceof FormValidationError) {
    return "Please fix the errors above.";
  }
  return error instanceof Error ? error.message : "Something went wrong.";
}

interface ProfileFormValues {
  displayName: string;
}

type SummaryVariant = "badge" | "mono" | "muted" | "none" | "text";

interface ValueSummaryProps {
  variant: SummaryVariant;
  value: string;
}

/** `summary` is any node — a Badge is only the most compact option. */
function ValueSummary({ variant, value }: ValueSummaryProps): ReactNode {
  if (variant === "none") return null;
  if (variant === "text") return <Text className="text-sharp">{value}</Text>;
  if (variant === "muted") return <Text className="text-muted">{value}</Text>;
  if (variant === "mono") {
    return <Text className="font-mono text-sm text-muted">{value}</Text>;
  }
  return <Badge accent="brand">{value}</Badge>;
}

interface ProfileItemProps extends Partial<
  Pick<
    FormEditableItemProps<ProfileFormValues>,
    "accent" | "details" | "disabled" | "label" | "size" | "title"
  >
> {
  editAriaLabel?: string;
  editIcon?: EditableItemProps["editIcon"];
  variant?: EditableItemProps["variant"];
  initialValue?: string;
  summaryVariant?: SummaryVariant;
  /** Makes onSubmit reject, so the modal stays open on the error. */
  failing?: boolean;
}

/**
 * Stateful demo: the saved value drives the summary, so the play function can
 * tell a discarded edit from a saved one by reading the row.
 */
function ProfileItem({
  label = "Display name",
  editAriaLabel = "Edit display name",
  initialValue = "Ada Lovelace",
  summaryVariant = "badge",
  failing = false,
  ...itemProps
}: ProfileItemProps): ReactNode {
  const [displayName, setDisplayName] = useState(initialValue);

  return (
    <FormEditableItem<ProfileFormValues>
      {...itemProps}
      label={label}
      editAriaLabel={editAriaLabel}
      summary={<ValueSummary variant={summaryVariant} value={displayName} />}
      cancelLabel="Cancel"
      submitLabel="Save"
      closeButtonAriaLabel="Close editor"
      submitErrorToMessage={submitErrorToMessage}
      defaultValues={{ displayName }}
      render={({ control }) => (
        <FormField
          control={control}
          name="displayName"
          label="Name"
          required="A name is required."
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
      )}
      onSubmit={({ displayName: nextName }) => {
        if (failing) throw new Error("The server rejected the change.");
        setDisplayName(nextName);
      }}
    />
  );
}

type ThisStory = StoryObj<typeof ProfileItem>;

export default {
  title: "alouette/Forms/FormEditableItem",
  component: ProfileItem,
  parameters: {
    componentSubtitle:
      "An EditableItem whose editor is a modal owning its own Form — mounted per open, so cancelling is a plain unmount and the surrounding screen's state is never touched by an abandoned edit.",
  },
  argTypes: {
    label: { control: "text" },
    title: { control: "text" },
    details: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    accent: { control: "select", options: accents },
    variant: { control: "select", options: ["contained", "outlined", "ghost"] },
    summaryVariant: {
      control: "select",
      options: ["badge", "text", "muted", "mono", "none"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof ProfileItem>;

export const FormEditableItemPreviewStory: ThisStory = {
  name: "FormEditableItem Preview",
  args: { label: "Display name" },
  render: (args) => <ProfileItem {...args} />,
};

export const FormEditableItemVariantsStory: ThisStory = {
  name: "FormEditableItem Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="Default">
        <ProfileItem />
      </Story.Section>

      <Story.Section withSurface title="Summary content">
        <ProfileItem summaryVariant="badge" />
        <ProfileItem
          label="Full name"
          summaryVariant="text"
          editAriaLabel="Edit full name"
        />
        <ProfileItem
          label="Time zone"
          summaryVariant="muted"
          initialValue="Europe/Paris"
          editAriaLabel="Edit time zone"
        />
        <ProfileItem
          label="API key"
          summaryVariant="mono"
          initialValue="sk_live_8f2c"
          editAriaLabel="Edit api key"
        />
        <ProfileItem
          label="Website"
          summaryVariant="none"
          details="No summary — the value only lives in the editor."
          editAriaLabel="Edit website"
        />
      </Story.Section>

      <Story.Section withSurface title="Details">
        <ProfileItem details="Shown on your public profile." />
      </Story.Section>

      <Story.Section withSurface title="Modal title differing from the label">
        <ProfileItem title="Edit your display name" />
      </Story.Section>

      <Story.Section withSurface title="Modal sizes">
        <ProfileItem
          label="Small editor"
          size="sm"
          editAriaLabel="Edit small editor"
        />
        <ProfileItem
          label="Medium editor"
          size="md"
          editAriaLabel="Edit medium editor"
        />
        <ProfileItem
          label="Large editor"
          size="lg"
          editAriaLabel="Edit large editor"
        />
      </Story.Section>

      <Story.Section withSurface title="Edit button variants">
        <ProfileItem variant="contained" />
        <ProfileItem variant="outlined" />
        <ProfileItem variant="ghost" />
      </Story.Section>

      <Story.Section withSurface title="Custom edit icon">
        <ProfileItem editIcon={<CalendarRegularIcon />} />
      </Story.Section>

      <Story.Section withSurface title="Accents">
        {accents.map((accent) => (
          <ProfileItem
            key={accent}
            accent={accent}
            label={accent}
            editAriaLabel={`Edit ${accent}`}
          />
        ))}
      </Story.Section>

      <Story.Section withSurface title="Disabled">
        <ProfileItem disabled />
      </Story.Section>

      <Story.Section withSurface title="Failing submit">
        <ProfileItem
          failing
          label="Rejected by the server"
          editAriaLabel="Edit rejected"
        />
      </Story.Section>
    </Story>
  ),
};

export const FormEditableItemTestsStory: ThisStory = {
  name: "FormEditableItem Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Edit lifecycle">
        <ProfileItem />
      </Story.Section>
      <Story.Section title="Failing submit">
        <ProfileItem
          failing
          label="Handle"
          editAriaLabel="Edit handle"
          initialValue="@ada"
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

    // Cancelling discards the edit: the row still shows the saved value.
    const dialog = await openEditor("Edit display name", "Display name");

    // The submit button's collapsed error message must not lend its width to
    // the footer row, which would squeeze Cancel until its label is clipped.
    const cancel = within(dialog).getByRole("button", { name: "Cancel" });
    await expect(cancel.scrollWidth).toBeLessThanOrEqual(cancel.clientWidth);

    const firstInput = within(dialog).getByLabelText("Name");
    await userEvent.clear(firstInput);
    await userEvent.type(firstInput, "Grace Hopper");
    await userEvent.click(cancel);
    await expectClosed();
    await expect(canvas.getByText("Ada Lovelace")).toBeInTheDocument();

    // Reopening reseeds from defaultValues — the discarded text is gone.
    const reopened = await openEditor("Edit display name", "Display name");
    const input = within(reopened).getByLabelText("Name");
    await expect(input).toHaveValue("Ada Lovelace");

    // A successful save closes the modal and updates the row.
    await userEvent.clear(input);
    await userEvent.type(input, "Grace Hopper");
    await userEvent.click(
      within(reopened).getByRole("button", { name: "Save" }),
    );
    await expectClosed();
    await expect(canvas.getByText("Grace Hopper")).toBeInTheDocument();

    // An empty required field keeps the modal open and reports inline. A
    // rejected submit disables the button for settledDisplayDurationMs, so the
    // retry path is a fresh modal rather than a wait — Cancel stays live.
    const invalid = await openEditor("Edit display name", "Display name");
    await userEvent.clear(within(invalid).getByLabelText("Name"));
    await userEvent.click(
      within(invalid).getByRole("button", { name: "Save" }),
    );
    await expect(
      await within(invalid).findByText("A name is required."),
    ).toBeVisible();
    await userEvent.click(
      within(invalid).getByRole("button", { name: "Cancel" }),
    );
    await expectClosed();

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
