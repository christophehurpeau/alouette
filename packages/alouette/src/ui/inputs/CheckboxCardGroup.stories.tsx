import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellRegularIcon } from "alouette-icons/phosphor-icons/BellRegularIcon";
import { ChatTextRegularIcon } from "alouette-icons/phosphor-icons/ChatTextRegularIcon";
import { EnvelopeRegularIcon } from "alouette-icons/phosphor-icons/EnvelopeRegularIcon";
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
    variant: { control: "inline-radio", options: ["contained", "outlined"] },
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
      <CheckboxCardGroupVariant variant="contained" />
      <CheckboxCardGroupVariant variant="outlined" />
      <CheckboxCardGroupVariant accent="brand" variant="contained" />
      <CheckboxCardGroupVariant accent="brand" variant="outlined" />
      <CheckboxCardGroupVariant accent="danger" variant="contained" />
      <CheckboxCardGroupVariant accent="danger" variant="outlined" />
      <CheckboxCardGroupVariant accent="success" variant="contained" />
      <CheckboxCardGroupVariant accent="success" variant="outlined" />
    </Story>
  ),
};

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
