import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Story } from "../story-components/Story";
import { RadioButton } from "./RadioButton";
import { RadioButtonGroup } from "./RadioButtonGroup";

type ThisStory = StoryObj<typeof RadioButtonGroup>;

export default {
  title: "alouette/Inputs/RadioButtonGroup",
  component: RadioButtonGroup,
  parameters: {
    componentSubtitle:
      "Segmented button-style single-select. RadioButtonGroup owns the value; RadioButton children read it via context.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    compact: { control: "boolean" },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof RadioButtonGroup>;

export const PreviewRadioButtonGroupStory: ThisStory = {
  name: "RadioButtonGroup Preview",
  render: (args) => (
    <RadioButtonGroup defaultValue="week" {...args}>
      <RadioButton value="day" label="Day" />
      <RadioButton value="week" label="Week" />
      <RadioButton value="month" label="Month" />
    </RadioButtonGroup>
  ),
};

function RadioButtonGroupVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <RadioButtonGroup accent={accent} defaultValue="week">
        <RadioButton value="day" label="Day" />
        <RadioButton value="week" label="Week" />
        <RadioButton disabled value="month" label="Month" />
      </RadioButtonGroup>
      <RadioButtonGroup disabled accent={accent} defaultValue="week">
        <RadioButton value="day" label="Day" />
        <RadioButton value="week" label="Week" />
      </RadioButtonGroup>
      <RadioButtonGroup accent={accent}>
        <RadioButton value="day" label="Day" />
        <RadioButton value="week" label="Week" />
      </RadioButtonGroup>
    </Story.SubSection>
  );
}

function WeekdaysGroup({ compact }: { compact?: boolean }): ReactNode {
  return (
    <RadioButtonGroup compact={compact} defaultValue="wed">
      <RadioButton value="mon" label="Mon" />
      <RadioButton value="tue" label="Tue" />
      <RadioButton value="wed" label="Wed" />
      <RadioButton value="thu" label="Thu" />
      <RadioButton value="fri" label="Fri" />
      <RadioButton value="sat" label="Sat" />
      <RadioButton value="sun" label="Sun" />
    </RadioButtonGroup>
  );
}

export const VariantsRadioButtonGroupStory: ThisStory = {
  name: "RadioButtonGroup Variants",
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <RadioButtonGroupVariant />
        <RadioButtonGroupVariant accent="brand" />
        <RadioButtonGroupVariant accent="danger" />
        <RadioButtonGroupVariant accent="success" />
      </Story.Section>
      <Story.Section title="Compact">
        <Story.SubSection withSurface title="Default">
          <WeekdaysGroup />
        </Story.SubSection>
        <Story.SubSection withSurface title="compact">
          <WeekdaysGroup compact />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

export const TestsRadioButtonGroupStory: StoryObj<typeof RadioButtonGroup> = {
  name: "RadioButtonGroup Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Uncontrolled">
        <RadioButtonGroup defaultValue="day">
          <RadioButton value="day" label="Day" />
          <RadioButton value="week" label="Week" />
          <RadioButton disabled value="month" label="Month" />
        </RadioButtonGroup>
      </Story.Section>
      <Story.Section title="Compact">
        <RadioButtonGroup compact defaultValue="day">
          <RadioButton value="day" label="Day" />
          <RadioButton value="week" label="Week" />
        </RadioButtonGroup>
        <RadioButtonGroup defaultValue="day">
          <RadioButton value="day" label="Day" />
          <RadioButton value="week" label="Week" />
        </RadioButtonGroup>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const [group, compactGroup, defaultGroup] =
      canvas.getAllByRole("radiogroup");
    if (!group || !compactGroup || !defaultGroup) {
      throw new Error("expected three radiogroups");
    }
    const uncontrolled = within(group);

    const day = uncontrolled.getByRole("radio", { name: "Day" });
    const week = uncontrolled.getByRole("radio", { name: "Week" });
    const month = uncontrolled.getByRole("radio", { name: "Month" });

    await expect(day).toHaveAttribute("aria-checked", "true");
    await expect(week).toHaveAttribute("aria-checked", "false");
    await expect(month).toHaveAttribute("aria-disabled", "true");

    // The lowered Surface bar is exactly 44px (zero vertical padding), and each
    // option's tap target fills it to the 44px accessibility minimum even though
    // the visible chip inside is shorter.
    await expect(group.getBoundingClientRect().height).toBe(44);
    for (const option of [day, week, month]) {
      await expect(
        option.getBoundingClientRect().height,
      ).toBeGreaterThanOrEqual(44);
    }

    // `compact` only removes horizontal room: same options, narrower bar, and
    // the tap targets keep the 44px minimum.
    await expect(compactGroup.getBoundingClientRect().height).toBe(44);
    await expect(compactGroup.getBoundingClientRect().width).toBeLessThan(
      defaultGroup.getBoundingClientRect().width,
    );
    for (const option of within(compactGroup).getAllByRole("radio")) {
      await expect(
        option.getBoundingClientRect().height,
      ).toBeGreaterThanOrEqual(44);
    }

    week.click();

    await waitFor(() => expect(week).toHaveAttribute("aria-checked", "true"));
    await expect(day).toHaveAttribute("aria-checked", "false");

    month.click();
    await expect(month).toHaveAttribute("aria-checked", "false");
    await expect(week).toHaveAttribute("aria-checked", "true");
  },
};
