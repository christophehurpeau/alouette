import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellDuotoneIcon } from "alouette-icons/phosphor-icons/BellDuotoneIcon";
import { BellRegularIcon } from "alouette-icons/phosphor-icons/BellRegularIcon";
import { ChatTextDuotoneIcon } from "alouette-icons/phosphor-icons/ChatTextDuotoneIcon";
import { ChatTextRegularIcon } from "alouette-icons/phosphor-icons/ChatTextRegularIcon";
import { EnvelopeDuotoneIcon } from "alouette-icons/phosphor-icons/EnvelopeDuotoneIcon";
import { EnvelopeRegularIcon } from "alouette-icons/phosphor-icons/EnvelopeRegularIcon";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Story } from "../story-components/Story";
import { CheckboxButton } from "./CheckboxButton";
import { CheckboxButtonGroup } from "./CheckboxButtonGroup";

type ThisStory = StoryObj<typeof CheckboxButtonGroup>;

export default {
  title: "alouette/Inputs/CheckboxButtonGroup",
  component: CheckboxButtonGroup,
  parameters: {
    componentSubtitle:
      "Segmented button-style multi-select. CheckboxButtonGroup owns the checked values; CheckboxButton children read them via context.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    compact: { control: "boolean" },
    variant: { control: "inline-radio", options: ["segmented", "icon"] },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof CheckboxButtonGroup>;

export const PreviewCheckboxButtonGroupStory: ThisStory = {
  name: "CheckboxButtonGroup Preview",
  render: (args) => (
    <CheckboxButtonGroup defaultValues={["mon", "wed"]} {...args}>
      <CheckboxButton value="mon" label="Mon" />
      <CheckboxButton value="tue" label="Tue" />
      <CheckboxButton value="wed" label="Wed" />
    </CheckboxButtonGroup>
  ),
};

interface ChannelsGroupProps {
  label: string;
  accent?: Accent;
  disabled?: boolean;
  /** Renders `icon` alone, so the glyph keeps one weight throughout. */
  withoutActiveIcon?: boolean;
  /** Badges the email chip, the state its own label would spell out. */
  withIndicator?: boolean;
  variant?: "icon" | "segmented";
}

function ChannelsGroup({
  label,
  accent,
  disabled,
  withoutActiveIcon,
  withIndicator,
  variant,
}: ChannelsGroupProps): ReactNode {
  return (
    <CheckboxButtonGroup
      variant={variant}
      accent={accent}
      disabled={disabled}
      aria-label={label}
      defaultValues={["email", "push"]}
    >
      <CheckboxButton
        value="email"
        label="Email"
        icon={<EnvelopeRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <EnvelopeDuotoneIcon />}
        indicator={withIndicator ? <BellRegularIcon /> : undefined}
      />
      <CheckboxButton
        value="push"
        label="Push"
        icon={<BellRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <BellDuotoneIcon />}
      />
      <CheckboxButton
        value="sms"
        label="SMS"
        icon={<ChatTextRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <ChatTextDuotoneIcon />}
      />
    </CheckboxButtonGroup>
  );
}

function CheckboxButtonGroupVariant({
  accent,
}: {
  accent?: Accent;
}): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <CheckboxButtonGroup accent={accent} defaultValues={["day", "month"]}>
        <CheckboxButton value="day" label="Day" />
        <CheckboxButton value="week" label="Week" />
        <CheckboxButton disabled value="month" label="Month" />
      </CheckboxButtonGroup>
      <CheckboxButtonGroup disabled accent={accent} defaultValues={["week"]}>
        <CheckboxButton value="day" label="Day" />
        <CheckboxButton value="week" label="Week" />
      </CheckboxButtonGroup>
      <CheckboxButtonGroup accent={accent}>
        <CheckboxButton value="day" label="Day" />
        <CheckboxButton value="week" label="Week" />
      </CheckboxButtonGroup>
    </Story.SubSection>
  );
}

function WeekdaysGroup({ compact }: { compact?: boolean }): ReactNode {
  return (
    <CheckboxButtonGroup
      compact={compact}
      defaultValues={["mon", "wed", "fri"]}
    >
      <CheckboxButton value="mon" label="Mon" />
      <CheckboxButton value="tue" label="Tue" />
      <CheckboxButton value="wed" label="Wed" />
      <CheckboxButton value="thu" label="Thu" />
      <CheckboxButton value="fri" label="Fri" />
      <CheckboxButton value="sat" label="Sat" />
      <CheckboxButton value="sun" label="Sun" />
    </CheckboxButtonGroup>
  );
}

export const VariantsCheckboxButtonGroupStory: ThisStory = {
  name: "CheckboxButtonGroup Variants",
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <CheckboxButtonGroupVariant />
        <CheckboxButtonGroupVariant accent="brand" />
        <CheckboxButtonGroupVariant accent="danger" />
        <CheckboxButtonGroupVariant accent="success" />
      </Story.Section>
      <Story.Section title="Compact">
        <Story.SubSection withSurface title="Default">
          <WeekdaysGroup />
        </Story.SubSection>
        <Story.SubSection withSurface title="compact">
          <WeekdaysGroup compact />
        </Story.SubSection>
      </Story.Section>
      <Story.Section title="With icons">
        <Story.SubSection withSurface title="Segmented">
          <ChannelsGroup label="Channels" />
        </Story.SubSection>
        <Story.SubSection withSurface title="Icon chips">
          <ChannelsGroup variant="icon" label="Channels icons" />
          <ChannelsGroup variant="icon" accent="brand" label="Brand icons" />
          <ChannelsGroup disabled variant="icon" label="Disabled icons" />
        </Story.SubSection>
        <Story.SubSection withSurface title="Without activeIcon">
          <ChannelsGroup
            withoutActiveIcon
            variant="icon"
            label="Single weight"
          />
        </Story.SubSection>
        <Story.SubSection withSurface title="Indicator">
          <ChannelsGroup withIndicator variant="icon" label="With indicator" />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

export const TestsCheckboxButtonGroupStory: ThisStory = {
  name: "CheckboxButtonGroup Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Uncontrolled">
        <CheckboxButtonGroup aria-label="Periods" defaultValues={["day"]}>
          <CheckboxButton value="day" label="Day" />
          <CheckboxButton value="week" label="Week" />
          <CheckboxButton disabled value="month" label="Month" />
        </CheckboxButtonGroup>
      </Story.Section>
      <Story.Section title="Icon">
        <ChannelsGroup variant="icon" label="Channels" />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const group = canvas.getByRole("group", { name: "Periods" });
    const periods = within(group);
    const day = periods.getByRole("checkbox", { name: "Day" });
    const week = periods.getByRole("checkbox", { name: "Week" });
    const month = periods.getByRole("checkbox", { name: "Month" });

    await expect(day).toHaveAttribute("aria-checked", "true");
    await expect(week).toHaveAttribute("aria-checked", "false");
    await expect(month).toHaveAttribute("aria-disabled", "true");

    await expect(group.getBoundingClientRect().height).toBe(44);
    for (const option of [day, week, month]) {
      await expect(
        option.getBoundingClientRect().height,
      ).toBeGreaterThanOrEqual(44);
    }

    week.click();

    await waitFor(() => expect(week).toHaveAttribute("aria-checked", "true"));
    await expect(day).toHaveAttribute("aria-checked", "true");

    day.click();
    await waitFor(() => expect(day).toHaveAttribute("aria-checked", "false"));

    month.click();
    await expect(month).toHaveAttribute("aria-checked", "false");

    const iconGroup = canvas.getByRole("group", { name: "Channels" });
    const channels = within(iconGroup);
    const email = channels.getByRole("checkbox", { name: "Email" });
    const push = channels.getByRole("checkbox", { name: "Push" });
    const sms = channels.getByRole("checkbox", { name: "SMS" });

    await expect(channels.queryByText("Email")).toBeNull();
    await expect(iconGroup.getBoundingClientRect().height).toBe(44);
    for (const option of [email, push, sms]) {
      const rect = option.getBoundingClientRect();
      await expect(rect.height).toBeGreaterThanOrEqual(44);
      await expect(rect.width).toBeGreaterThanOrEqual(44);
    }

    sms.click();
    await waitFor(() => expect(sms).toHaveAttribute("aria-checked", "true"));
    await expect(email).toHaveAttribute("aria-checked", "true");
    await expect(push).toHaveAttribute("aria-checked", "true");
  },
};
