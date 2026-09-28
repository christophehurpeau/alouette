import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellRegularIcon } from "alouette-icons/phosphor-icons/Bell";
import { ChatTextRegularIcon } from "alouette-icons/phosphor-icons/ChatText";
import { EnvelopeRegularIcon } from "alouette-icons/phosphor-icons/Envelope";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { CheckboxCard } from "./CheckboxCard";
import {
  CheckboxCardGroup,
  type CheckboxCardGroupVariant,
} from "./CheckboxCardGroup";

type ThisStory = StoryObj<typeof CheckboxCardGroup>;

export default {
  title: "alouette/Inputs/CheckboxCardGroup",
  component: CheckboxCardGroup,
  parameters: {
    componentSubtitle:
      "Multi-choice card list: each option is a large pressable card with an icon, a title, a description and a checkbox indicator.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    variant: {
      control: "inline-radio",
      options: ["tonal", "outlined"],
    },
    layout: { control: "inline-radio", options: ["list", "stack"] },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof CheckboxCardGroup>;

function ChannelCards(): ReactNode {
  return (
    <>
      <CheckboxCard
        value="email"
        icon={<EnvelopeRegularIcon />}
        label="Email"
        description="A summary in your inbox"
      />
      <CheckboxCard
        value="push"
        icon={<BellRegularIcon />}
        label="Push"
        description="A notification on your devices"
      />
      <CheckboxCard
        value="sms"
        icon={<ChatTextRegularIcon />}
        label="SMS"
        description="A text message to your phone"
      />
    </>
  );
}

export const PreviewCheckboxCardGroupStory: ThisStory = {
  name: "CheckboxCardGroup Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  render: (args) => (
    <CheckboxCardGroup defaultValues={["email", "push"]} {...args}>
      <ChannelCards />
    </CheckboxCardGroup>
  ),
};

function CheckboxCardGroupVariant({
  accent,
  variant,
}: {
  accent?: Accent;
  variant: CheckboxCardGroupVariant;
}): ReactNode {
  return (
    <Story.Section withSurface title={`${accent ?? "Default"} — ${variant}`}>
      <Story.SubSection title="Demo">
        <CheckboxCardGroup
          accent={accent}
          variant={variant}
          defaultValues={["email", "push"]}
        >
          <ChannelCards />
        </CheckboxCardGroup>
      </Story.SubSection>

      <Story.SubSection title="No selection">
        <CheckboxCardGroup accent={accent} variant={variant}>
          <ChannelCards />
        </CheckboxCardGroup>
      </Story.SubSection>

      <Story.SubSection title="Edge cases">
        <CheckboxCardGroup
          accent={accent}
          variant={variant}
          defaultValues={["email", "sms"]}
        >
          <CheckboxCard
            value="email"
            icon={<EnvelopeRegularIcon />}
            label="Without description"
          />
          <CheckboxCard value="push" label="Without icon" />
          <CheckboxCard
            disabled
            value="sms"
            icon={<ChatTextRegularIcon />}
            label="Disabled checked"
            description="Not toggleable"
          />
          <CheckboxCard
            disabled
            value="fax"
            label="Disabled unchecked"
            description="Not toggleable"
          />
        </CheckboxCardGroup>
      </Story.SubSection>

      <Story.SubSection title="Stack layout">
        <CheckboxCardGroup
          layout="stack"
          accent={accent}
          variant={variant}
          defaultValues={["email"]}
        >
          <ChannelCards />
        </CheckboxCardGroup>
      </Story.SubSection>

      <Story.SubSection title="Disabled group">
        <CheckboxCardGroup
          disabled
          accent={accent}
          variant={variant}
          defaultValues={["push"]}
        >
          <CheckboxCard
            value="email"
            icon={<EnvelopeRegularIcon />}
            label="Group disabled"
            description="Unchecked card"
          />
          <CheckboxCard
            value="push"
            icon={<BellRegularIcon />}
            label="Group disabled"
            description="Checked card"
          />
        </CheckboxCardGroup>
      </Story.SubSection>
    </Story.Section>
  );
}

export const VariantsCheckboxCardGroupStory: ThisStory = {
  name: "CheckboxCardGroup Variants",
  render: () => (
    <Story>
      <CheckboxCardGroupVariant variant="tonal" />
      <CheckboxCardGroupVariant variant="outlined" />
      <CheckboxCardGroupVariant accent="brand" variant="tonal" />
      <CheckboxCardGroupVariant accent="brand" variant="outlined" />
    </Story>
  ),
};

// Split from the variants above: in a single story the page exceeds
// Chromatic's 25,000,000px snapshot limit.
export const AccentVariantsCheckboxCardGroupStory: ThisStory = {
  name: "CheckboxCardGroup Accent Variants",
  render: () => (
    <Story>
      <CheckboxCardGroupVariant accent="danger" variant="tonal" />
      <CheckboxCardGroupVariant accent="danger" variant="outlined" />
      <CheckboxCardGroupVariant accent="success" variant="tonal" />
      <CheckboxCardGroupVariant accent="success" variant="outlined" />
    </Story>
  ),
};

function getBox(card: HTMLElement): HTMLElement {
  const box = [...card.querySelectorAll("div")].find(
    (element) => getComputedStyle(element).borderTopWidth === "2px",
  );
  if (!box) throw new Error("No checkbox box in the card");
  return box;
}

function getBoxBorderColor(card: HTMLElement): string {
  return getComputedStyle(getBox(card)).borderTopColor;
}

export const TestsCheckboxCardGroupStory: ThisStory = {
  name: "CheckboxCardGroup Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Uncontrolled">
        <CheckboxCardGroup aria-label="Channels" defaultValues={["email"]}>
          <ChannelCards />
          <CheckboxCard disabled value="fax" label="Fax" />
        </CheckboxCardGroup>
      </Story.Section>
      <Story.Section title="Danger">
        <CheckboxCardGroup accent="danger">
          <CheckboxCard value="danger" label="Danger unchecked" />
        </CheckboxCardGroup>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const group = canvas.getByRole("group", { name: "Channels" });
    const email = within(group).getByRole("checkbox", { name: "Email" });
    const push = within(group).getByRole("checkbox", { name: "Push" });
    const fax = within(group).getByRole("checkbox", { name: "Fax" });

    await expect(email).toHaveAttribute("aria-checked", "true");
    await expect(push).toHaveAttribute("aria-checked", "false");
    await expect(email.getBoundingClientRect().height).toBeGreaterThanOrEqual(
      44,
    );

    // The box is the accent's interactive foreground, checked or not: the
    // unchecked card drops to the neutral theme, its box keeps the accent.
    const restBoxColor = getBoxBorderColor(push);
    await expect(getBoxBorderColor(email)).toBe(restBoxColor);
    await expect(getComputedStyle(getBox(email)).backgroundColor).toBe(
      restBoxColor,
    );
    await expect(
      getBoxBorderColor(
        canvas.getByRole("checkbox", { name: "Danger unchecked" }),
      ),
    ).not.toBe(restBoxColor);

    // It reacts to the card's state.
    push.focus();
    await waitFor(() => expect(getBoxBorderColor(push)).not.toBe(restBoxColor));
    push.blur();

    push.click();

    await waitFor(() => expect(push).toHaveAttribute("aria-checked", "true"));
    await expect(email).toHaveAttribute("aria-checked", "true");

    email.click();
    await waitFor(() => expect(email).toHaveAttribute("aria-checked", "false"));

    await expect(fax).toHaveAttribute("aria-disabled", "true");
    fax.click();
    await expect(fax).toHaveAttribute("aria-checked", "false");
  },
};

export const TestsDisabledCheckboxCardGroupStory: ThisStory = {
  name: "CheckboxCardGroup Disabled Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Disabled group">
        <CheckboxCardGroup disabled defaultValues={["push"]}>
          <ChannelCards />
        </CheckboxCardGroup>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const email = canvas.getByRole("checkbox", { name: "Email" });
    const push = canvas.getByRole("checkbox", { name: "Push" });

    await expect(email).toHaveAttribute("aria-checked", "false");
    await expect(push).toHaveAttribute("aria-checked", "true");

    // The disabled box must not take the disabled card's own ground.
    const emailBox = getComputedStyle(getBox(email));
    await expect(emailBox.borderTopColor).not.toBe(
      getComputedStyle(email).backgroundColor,
    );
    await expect(emailBox.backgroundColor).toBe("rgba(0, 0, 0, 0)");

    // A checked disabled box stays filled, like an enabled one.
    const pushBox = getComputedStyle(getBox(push));
    await expect(pushBox.borderTopColor).not.toBe(
      getComputedStyle(push).backgroundColor,
    );
    await expect(pushBox.backgroundColor).toBe(pushBox.borderTopColor);
  },
};

export const TestsStackCheckboxCardGroupStory: ThisStory = {
  name: "CheckboxCardGroup Stack Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Stack">
        <View className="w-[560px]">
          <CheckboxCardGroup layout="stack" defaultValues={["email"]}>
            <ChannelCards />
          </CheckboxCardGroup>
        </View>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailRect = canvas
      .getByRole("checkbox", { name: "Email" })
      .getBoundingClientRect();
    const pushRect = canvas
      .getByRole("checkbox", { name: "Push" })
      .getBoundingClientRect();
    const smsRect = canvas
      .getByRole("checkbox", { name: "SMS" })
      .getBoundingClientRect();

    await expect(pushRect.top).toBe(emailRect.top);
    await expect(pushRect.left).toBeGreaterThan(emailRect.left);
    await expect(smsRect.top).toBeGreaterThan(emailRect.top);
    await expect(smsRect.left).toBe(emailRect.left);
    await expect(emailRect.height).toBeGreaterThanOrEqual(44);
  },
};
