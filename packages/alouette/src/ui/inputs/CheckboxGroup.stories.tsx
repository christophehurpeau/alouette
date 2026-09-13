import { expect, fn, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Story } from "../story-components/Story";
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";

type ThisStory = StoryObj<typeof CheckboxGroup>;

export default {
  title: "alouette/Inputs/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    componentSubtitle:
      "Multi-choice checkbox list. CheckboxGroup owns the checked values; Checkbox children read them via context. A Checkbox outside any group is a standalone boolean.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof CheckboxGroup>;

export const PreviewCheckboxGroupStory: ThisStory = {
  name: "CheckboxGroup Preview",
  render: (args) => (
    <CheckboxGroup defaultValues={["week"]} {...args}>
      <Checkbox value="day" label="Day" />
      <Checkbox value="week" label="Week" />
      <Checkbox value="month" label="Month" />
    </CheckboxGroup>
  ),
};

function CheckboxGroupVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <CheckboxGroup accent={accent} defaultValues={["week", "month"]}>
        <Checkbox value="day" label="Unchecked / day" />
        <Checkbox value="week" label="Checked / week" />
        <Checkbox disabled value="month" label="Disabled checked / month" />
        <Checkbox disabled value="year" label="Disabled unchecked / year" />
      </CheckboxGroup>
      <CheckboxGroup disabled accent={accent} defaultValues={["week"]}>
        <Checkbox value="day" label="Group disabled / day" />
        <Checkbox value="week" label="Group disabled / week" />
      </CheckboxGroup>
      <CheckboxGroup accent={accent}>
        <Checkbox value="day" label="No selection / day" />
        <Checkbox value="week" label="No selection / week" />
      </CheckboxGroup>
    </Story.SubSection>
  );
}

function StandaloneCheckboxVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <Checkbox accent={accent} label="Unchecked" />
      <Checkbox defaultChecked accent={accent} label="Checked" />
      <Checkbox disabled accent={accent} label="Disabled unchecked" />
      <Checkbox
        defaultChecked
        disabled
        accent={accent}
        label="Disabled checked"
      />
    </Story.SubSection>
  );
}

export const VariantsCheckboxGroupStory: ThisStory = {
  name: "CheckboxGroup Variants",
  render: () => (
    <Story>
      <Story.Section title="Group">
        <CheckboxGroupVariant />
        <CheckboxGroupVariant accent="brand" />
        <CheckboxGroupVariant accent="danger" />
        <CheckboxGroupVariant accent="success" />
      </Story.Section>
      <Story.Section title="Standalone">
        <StandaloneCheckboxVariant />
        <StandaloneCheckboxVariant accent="brand" />
        <StandaloneCheckboxVariant accent="danger" />
      </Story.Section>
    </Story>
  ),
};

export const TestsCheckboxGroupStory: ThisStory = {
  name: "CheckboxGroup Tests",
  args: { onValuesChange: fn() },
  render: (args) => (
    <Story noDarkMode>
      <Story.Section title="Uncontrolled">
        <CheckboxGroup
          aria-label="Periods"
          defaultValues={["day"]}
          onValuesChange={args.onValuesChange}
        >
          <Checkbox value="day" label="Day" />
          <Checkbox value="week" label="Week" />
          <Checkbox disabled value="month" label="Month" />
        </CheckboxGroup>
      </Story.Section>
    </Story>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const group = canvas.getByRole("group", { name: "Periods" });
    const day = within(group).getByRole("checkbox", { name: "Day" });
    const week = within(group).getByRole("checkbox", { name: "Week" });
    const month = within(group).getByRole("checkbox", { name: "Month" });

    await expect(day).toHaveAttribute("aria-checked", "true");
    await expect(week).toHaveAttribute("aria-checked", "false");
    await expect(month).toHaveAttribute("aria-disabled", "true");
    await expect(day.getBoundingClientRect().height).toBeGreaterThanOrEqual(44);

    week.click();

    await waitFor(() => expect(week).toHaveAttribute("aria-checked", "true"));
    await expect(day).toHaveAttribute("aria-checked", "true");
    await expect(args.onValuesChange).toHaveBeenLastCalledWith(["day", "week"]);

    day.click();

    await waitFor(() => expect(day).toHaveAttribute("aria-checked", "false"));
    await expect(args.onValuesChange).toHaveBeenLastCalledWith(["week"]);

    month.click();
    await expect(month).toHaveAttribute("aria-checked", "false");
  },
};

export const TestsStandaloneCheckboxStory: ThisStory = {
  name: "Checkbox Standalone Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Standalone">
        <Checkbox label="Accept terms" />
        <Checkbox defaultChecked disabled label="Locked" />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const terms = canvas.getByRole("checkbox", { name: "Accept terms" });
    const locked = canvas.getByRole("checkbox", { name: "Locked" });

    await expect(terms).toHaveAttribute("aria-checked", "false");

    terms.click();
    await waitFor(() => expect(terms).toHaveAttribute("aria-checked", "true"));

    terms.click();
    await waitFor(() => expect(terms).toHaveAttribute("aria-checked", "false"));

    await expect(locked).toHaveAttribute("aria-checked", "true");
    locked.click();
    await expect(locked).toHaveAttribute("aria-checked", "true");
  },
};
