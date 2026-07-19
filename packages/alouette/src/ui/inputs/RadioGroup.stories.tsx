import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Story } from "../story-components/Story";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

type ThisStory = StoryObj<typeof RadioGroup>;

export default {
  title: "alouette/Inputs/RadioGroup",
  component: RadioGroup,
  parameters: {
    componentSubtitle:
      "Single-choice circle-dot option list. RadioGroup owns the value; Radio children read it via context.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof RadioGroup>;

export const PreviewRadioGroupStory: ThisStory = {
  name: "RadioGroup Preview",
  render: (args) => (
    <RadioGroup defaultValue="week" {...args}>
      <Radio value="day" label="Day" />
      <Radio value="week" label="Week" />
      <Radio value="month" label="Month" />
    </RadioGroup>
  ),
};

function RadioGroupVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <RadioGroup accent={accent} defaultValue="week">
        <Radio value="day" label="Selected off / day" />
        <Radio value="week" label="Selected on / week" />
        <Radio disabled value="month" label="Disabled option / month" />
      </RadioGroup>
      <RadioGroup disabled accent={accent} defaultValue="week">
        <Radio value="day" label="Group disabled / day" />
        <Radio value="week" label="Group disabled / week" />
      </RadioGroup>
      <RadioGroup accent={accent}>
        <Radio value="day" label="No selection / day" />
        <Radio value="week" label="No selection / week" />
      </RadioGroup>
    </Story.SubSection>
  );
}

export const VariantsRadioGroupStory: ThisStory = {
  name: "RadioGroup Variants",
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <RadioGroupVariant />
        <RadioGroupVariant accent="brand" />
        <RadioGroupVariant accent="danger" />
        <RadioGroupVariant accent="success" />
      </Story.Section>
    </Story>
  ),
};

export const TestsRadioGroupStory: StoryObj<typeof RadioGroup> = {
  name: "RadioGroup Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Uncontrolled">
        <RadioGroup defaultValue="day">
          <Radio value="day" label="Day" />
          <Radio value="week" label="Week" />
          <Radio disabled value="month" label="Month" />
        </RadioGroup>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const day = canvas.getByRole("radio", { name: "Day" });
    const week = canvas.getByRole("radio", { name: "Week" });
    const month = canvas.getByRole("radio", { name: "Month" });

    await expect(day).toHaveAttribute("aria-checked", "true");
    await expect(week).toHaveAttribute("aria-checked", "false");
    await expect(month).toHaveAttribute("aria-disabled", "true");

    week.click();

    await waitFor(() => expect(week).toHaveAttribute("aria-checked", "true"));
    await expect(day).toHaveAttribute("aria-checked", "false");

    month.click();
    await expect(month).toHaveAttribute("aria-checked", "false");
    await expect(week).toHaveAttribute("aria-checked", "true");
  },
};
