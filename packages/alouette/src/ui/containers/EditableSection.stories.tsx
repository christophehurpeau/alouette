import { expect, screen, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarRegularIcon } from "alouette-icons/phosphor-icons/CalendarRegularIcon";
import { type ReactNode, useState } from "react";
import { Button } from "../actions/Button";
import { Badge } from "../data/Badge";
import { Paragraph, Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story, accentsWithoutNeutral } from "../story-components/Story";
import { EditableSection, type EditableSectionProps } from "./EditableSection";
import { Modal } from "./Modal";

type ThisStory = StoryObj<typeof EditableSection>;

/** The body is plain JSX — as many blocks as the section needs. */
function EventSummary(): ReactNode {
  return (
    <View className="gap-xs">
      <Paragraph className="text-sm">
        An evening of readings in the old library.
      </Paragraph>
      <View className="gap-xxs">
        <Text className="font-body-bold text-sm">Before you come</Text>
        <Paragraph className="text-muted text-sm">
          The gate closes at 19:00 — ring the bell after that.
        </Paragraph>
      </View>
    </View>
  );
}

/**
 * EditableSection owns no editor, so the stories supply one: `onEdit` opens a
 * plain Modal. FormEditableSection packages this same composition for a form.
 */
function EventSection({
  title = "Event details",
  editAriaLabel = "Edit event details",
  titleBadge = <Badge accent="brand">12 August 2026</Badge>,
  children = <EventSummary />,
  // The section brings no material of its own; most stories show it as a card.
  className = "surface",
  ...surfaceProps
}: Partial<EditableSectionProps>): ReactNode {
  const [editing, setEditing] = useState(false);

  function close(): void {
    setEditing(false);
  }

  return (
    <EditableSection
      {...surfaceProps}
      className={className}
      title={title}
      titleBadge={titleBadge}
      editAriaLabel={editAriaLabel}
      onEdit={() => {
        setEditing(true);
      }}
    >
      {children}
      <Modal
        visible={editing}
        title={title}
        closeButtonAriaLabel="Close editor"
        footer={<Button accent="neutral" text="Close" onPress={close} />}
        onClose={close}
      >
        <Paragraph>Your editor goes here.</Paragraph>
      </Modal>
    </EditableSection>
  );
}

export default {
  title: "alouette/Containers/EditableSection",
  component: EditableSection,
  parameters: {
    componentSubtitle:
      "A Surface holding a block of read-only content behind a single edit affordance — the multi-line counterpart of EditableItem.",
  },
  argTypes: {
    title: { control: "text" },
    details: { control: "text" },
    className: { control: "text" },
    editIconVariant: {
      control: "select",
      options: ["contained", "outlined", "ghost", "soft"],
    },
    accent: { control: "select", options: accentsWithoutNeutral },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof EditableSection>;

export const EditableSectionPreviewStory: ThisStory = {
  name: "EditableSection Preview",
  args: { title: "Event details" },
  render: (args) => <EventSection {...args} />,
};

export const EditableSectionVariantsStory: ThisStory = {
  name: "EditableSection Variants",
  render: () => (
    <Story>
      <Story.Section title="Default">
        <EventSection />
      </Story.Section>

      <Story.Section title="Details under the title">
        <EventSection details="The name, the date, and what guests may see." />
      </Story.Section>

      <Story.Section title="Without the title badge">
        <EventSection titleBadge={null} />
      </Story.Section>

      <Story.Section title="Short body">
        <EventSection
          title="Visibility"
          editAriaLabel="Edit visibility"
          titleBadge={<Badge accent="warning">Private</Badge>}
        >
          <Paragraph className="text-muted text-sm">
            Each guest only sees their own card.
          </Paragraph>
        </EventSection>
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
          className="bg-highlight border border-muted rounded-sm p-m"
          title="outlined"
          editAriaLabel="Edit outlined"
        />
        <EventSection
          className=""
          title="no material"
          editAriaLabel="Edit no material"
        />
      </Story.Section>

      <Story.Section title="Surface sizes">
        <EventSection
          className="surface surface-xxs"
          title="surface-xxs"
          editAriaLabel="Edit surface-xxs"
        />
        <EventSection
          className="surface surface-xs"
          title="surface-xs"
          editAriaLabel="Edit surface-xs"
        />
        <EventSection
          className="surface surface-sm"
          title="surface-sm"
          editAriaLabel="Edit surface-sm"
        />
        <EventSection title="surface-md" editAriaLabel="Edit surface-md" />
        <EventSection
          className="surface surface-lg"
          title="surface-lg"
          editAriaLabel="Edit surface-lg"
        />
      </Story.Section>

      {/* The tightest case for the edit button's negative margin: a
          single-line title, so the row is shorter than the 38px button. */}
      <Story.Section title="Surface sizes, single-line title">
        <EventSection
          className="surface surface-xxs"
          title="Smallest"
          editAriaLabel="Edit smallest"
        >
          <Paragraph className="text-sm">One line of body.</Paragraph>
        </EventSection>
        <EventSection
          className="surface surface-lg"
          title="Largest"
          editAriaLabel="Edit largest"
        >
          <Paragraph className="text-sm">One line of body.</Paragraph>
        </EventSection>
      </Story.Section>

      <Story.Section title="Edit button variants">
        <EventSection editIconVariant="contained" />
        <EventSection editIconVariant="outlined" />
        <EventSection editIconVariant="ghost" />
        <EventSection editIconVariant="soft" />
      </Story.Section>

      <Story.Section title="Custom edit icon">
        <EventSection editIcon={<CalendarRegularIcon />} />
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
    </Story>
  ),
};

export const EditableSectionTestsStory: ThisStory = {
  name: "EditableSection Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Edit affordance">
        <EventSection details="The name, the date, and what guests may see." />
      </Story.Section>
      <Story.Section title="Disabled">
        <EventSection
          disabled
          title="Locked section"
          editAriaLabel="Edit locked section"
        />
      </Story.Section>
      {/* The size only moves the Surface's padding — from 8px at surface-xxs
          to 48px at surface-lg — so the header must hold at either end. */}
      <Story.Section title="Every surface size">
        <EventSection
          className="surface surface-xxs"
          title="surface-xxs"
          editAriaLabel="Edit surface-xxs"
        />
        <EventSection
          className="surface surface-xs"
          title="surface-xs"
          editAriaLabel="Edit surface-xs"
        />
        <EventSection
          className="surface surface-sm"
          title="surface-sm"
          editAriaLabel="Edit surface-sm"
        />
        <EventSection title="surface-md" editAriaLabel="Edit surface-md" />
        <EventSection
          className="surface surface-lg"
          title="surface-lg"
          editAriaLabel="Edit surface-lg"
        />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The title alone names the region — the badge beside it renders inside
    // the section without lending its text to the accessible name.
    const region = canvas.getByRole("region", { name: "Event details" });
    await expect(
      within(region).getByText("An evening of readings in the old library."),
    ).toBeVisible();
    // The badge is centered on the title's line box: a Badge's own
    // `self-start` would otherwise pin it to the top of the row.
    const badge = within(region).getByText("12 August 2026");
    await expect(badge).toBeVisible();
    const badgeRect = badge.getBoundingClientRect();
    const titleRect = within(region)
      .getByText("Event details")
      .getBoundingClientRect();
    await expect(
      Math.abs(
        badgeRect.top +
          badgeRect.height / 2 -
          (titleRect.top + titleRect.height / 2),
      ),
    ).toBeLessThanOrEqual(1);

    // A disabled section keeps its content readable and its button inert.
    await expect(
      canvas.getByRole("button", { name: "Edit locked section" }),
    ).toBeDisabled();

    // The title is sized to the 38px edit button, so the header row leaves no
    // dead space around it and the button sits inside the Surface's padding —
    // whatever that padding is.
    async function expectHeaderFitsTheButton(title: string): Promise<void> {
      const surface = canvas.getByRole("region", { name: title });
      const button = canvas.getByRole("button", { name: `Edit ${title}` });
      const buttonRect = button.getBoundingClientRect();
      const headingRect = within(surface)
        .getByText(title)
        .getBoundingClientRect();
      const paddingTop = Number.parseFloat(
        getComputedStyle(surface).paddingTop,
      );

      await expect(buttonRect.height).toBe(38);
      await expect(
        (buttonRect.height - headingRect.height) / 2,
      ).toBeLessThanOrEqual(4);
      await expect(buttonRect.top).toBeGreaterThanOrEqual(
        surface.getBoundingClientRect().top + paddingTop,
      );
    }

    await expectHeaderFitsTheButton("surface-xxs");
    await expectHeaderFitsTheButton("surface-xs");
    await expectHeaderFitsTheButton("surface-sm");
    await expectHeaderFitsTheButton("surface-md");
    await expectHeaderFitsTheButton("surface-lg");

    // The edit affordance is the button, not the surface: pressing the body
    // must not open anything.
    await userEvent.click(within(region).getByText("Before you come"));
    await expect(screen.queryAllByRole("dialog")).toHaveLength(0);

    // The modal portals outside the canvas, so it is queried from `screen`.
    await userEvent.click(
      canvas.getByRole("button", { name: "Edit event details" }),
    );
    await expect(
      await screen.findByText("Your editor goes here."),
    ).toBeVisible();
  },
};
