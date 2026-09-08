import { expect, screen, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarRegularIcon } from "alouette-icons/phosphor-icons/CalendarRegularIcon";
import { type ReactNode, useState } from "react";
import { Button } from "../actions/Button";
import { Badge } from "../data/Badge";
import { Paragraph, Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story, accentsWithoutNeutral } from "../story-components/Story";
import { EditableSurface, type EditableSurfaceProps } from "./EditableSurface";
import { Modal } from "./Modal";

type ThisStory = StoryObj<typeof EditableSurface>;

/** The body is plain JSX — as many blocks as the section needs. */
function EventSummary(): ReactNode {
  return (
    <VStack className="gap-xs">
      <Paragraph className="text-sm">
        An evening of readings in the old library.
      </Paragraph>
      <VStack className="gap-xxs">
        <Text className="font-body-bold text-sm">Before you come</Text>
        <Paragraph className="text-muted text-sm">
          The gate closes at 19:00 — ring the bell after that.
        </Paragraph>
      </VStack>
    </VStack>
  );
}

/**
 * EditableSurface owns no editor, so the stories supply one: `onEdit` opens a
 * plain Modal. FormEditableSurface packages this same composition for a form.
 */
function EventSection({
  title = "Event details",
  editAriaLabel = "Edit event details",
  titleBadge = <Badge accent="brand">12 August 2026</Badge>,
  children = <EventSummary />,
  ...surfaceProps
}: Partial<EditableSurfaceProps>): ReactNode {
  const [editing, setEditing] = useState(false);

  function close(): void {
    setEditing(false);
  }

  return (
    <EditableSurface
      {...surfaceProps}
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
    </EditableSurface>
  );
}

export default {
  title: "alouette/Containers/EditableSurface",
  component: EditableSurface,
  parameters: {
    componentSubtitle:
      "A Surface holding a block of read-only content behind a single edit affordance — the multi-line counterpart of EditableItem.",
  },
  argTypes: {
    title: { control: "text" },
    details: { control: "text" },
    size: { control: "select", options: ["xxs", "xs", "sm", "md", "lg"] },
    variant: {
      control: "select",
      options: [
        "surface",
        "highlight",
        "highlight-accent",
        "lowered",
        "translucent",
      ],
    },
    editIconVariant: {
      control: "select",
      options: ["contained", "outlined", "ghost", "soft"],
    },
    accent: { control: "select", options: accentsWithoutNeutral },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof EditableSurface>;

export const EditableSurfacePreviewStory: ThisStory = {
  name: "EditableSurface Preview",
  args: { title: "Event details" },
  render: (args) => <EventSection {...args} />,
};

export const EditableSurfaceVariantsStory: ThisStory = {
  name: "EditableSurface Variants",
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

      <Story.Section title="Surface variants">
        <EventSection variant="surface" />
        <EventSection variant="highlight" />
        <EventSection variant="lowered" />
      </Story.Section>

      <Story.Section title="Surface sizes">
        <EventSection size="xxs" title="xxs" editAriaLabel="Edit xxs" />
        <EventSection size="xs" title="xs" editAriaLabel="Edit xs" />
        <EventSection size="sm" title="sm" editAriaLabel="Edit sm" />
        <EventSection size="md" title="md" editAriaLabel="Edit md" />
        <EventSection size="lg" title="lg" editAriaLabel="Edit lg" />
      </Story.Section>

      {/* The tightest case for the edit button's negative margin: a
          single-line title, so the row is shorter than the 38px button. */}
      <Story.Section title="Surface sizes, single-line title">
        <EventSection size="xxs" title="Smallest" editAriaLabel="Edit smallest">
          <Paragraph className="text-sm">One line of body.</Paragraph>
        </EventSection>
        <EventSection size="lg" title="Largest" editAriaLabel="Edit largest">
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

export const EditableSurfaceTestsStory: ThisStory = {
  name: "EditableSurface Tests",
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
      {/* `size` only moves the Surface's padding — from p-xs (8px) at xxs to
          p-xxl (48px) at lg — so the header must hold at either end. */}
      <Story.Section title="Every surface size">
        <EventSection size="xxs" title="xxs" editAriaLabel="Edit xxs" />
        <EventSection size="xs" title="xs" editAriaLabel="Edit xs" />
        <EventSection size="sm" title="sm" editAriaLabel="Edit sm" />
        <EventSection size="md" title="md" editAriaLabel="Edit md" />
        <EventSection size="lg" title="lg" editAriaLabel="Edit lg" />
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
    // whatever that padding is, since `size` is the only thing that moves it.
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

    await expectHeaderFitsTheButton("xxs");
    await expectHeaderFitsTheButton("xs");
    await expectHeaderFitsTheButton("sm");
    await expectHeaderFitsTheButton("md");
    await expectHeaderFitsTheButton("lg");

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
