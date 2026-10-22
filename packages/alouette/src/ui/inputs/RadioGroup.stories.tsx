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
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
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

/** The content-box width of the first ancestor that lays `element` out. */
function getContainerWidth(element: HTMLElement): number {
  let container = element.parentElement;
  while (container && getComputedStyle(container).display === "contents") {
    container = container.parentElement;
  }
  if (!container) throw new Error("No laid-out container");
  const style = getComputedStyle(container);
  return (
    container.getBoundingClientRect().width -
    Number.parseFloat(style.borderLeftWidth) -
    Number.parseFloat(style.paddingLeft) -
    Number.parseFloat(style.paddingRight) -
    Number.parseFloat(style.borderRightWidth)
  );
}

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
      <Story.Section title="Stretched">
        <RadioGroup className="self-stretch" defaultValue="comment">
          <Radio value="comment" label="Comment" />
          <Radio value="request-changes" label="Request changes" />
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

    // Every row stretches to the group, which shrinks to its widest row: the
    // target does not depend on the label's length, and the hover ground does
    // not span the page.
    const [group, stretchedGroup] = canvas.getAllByRole("radiogroup");
    if (!group || !stretchedGroup) throw new Error("Missing radio groups");
    const groupWidth = group.getBoundingClientRect().width;
    for (const row of [day, week, month]) {
      await expect(row.getBoundingClientRect().width).toBe(groupWidth);
    }
    await expect(groupWidth).toBeLessThan(getContainerWidth(group));

    // `self-stretch` on the group makes it, and every row, fill its container.
    const stretchedWidth = stretchedGroup.getBoundingClientRect().width;
    await expect(stretchedWidth).toBe(getContainerWidth(stretchedGroup));
    for (const row of within(stretchedGroup).getAllByRole("radio")) {
      await expect(row.getBoundingClientRect().width).toBe(stretchedWidth);
    }

    // Keyboard focus (focus-visible) leaves the row's ground alone — a focus
    // ground would stay lit after a mouse click — and moves the ring to the
    // interactive hover foreground. A programmatic focus() counts as keyboard
    // input for `:focus-visible`.
    const dayRing = [...day.querySelectorAll("div")].find(
      (element) => getComputedStyle(element).borderTopWidth === "2px",
    );
    if (!dayRing) throw new Error("No radio ring in the row");
    const restRingColor = getComputedStyle(dayRing).borderTopColor;
    await expect(getComputedStyle(day).backgroundColor).toBe(
      "rgba(0, 0, 0, 0)",
    );
    day.focus();
    await expect(getComputedStyle(day).backgroundColor).toBe(
      "rgba(0, 0, 0, 0)",
    );
    await waitFor(() =>
      expect(getComputedStyle(dayRing).borderTopColor).not.toBe(restRingColor),
    );
    day.blur();

    week.click();

    await waitFor(() => expect(week).toHaveAttribute("aria-checked", "true"));
    await expect(day).toHaveAttribute("aria-checked", "false");

    month.click();
    await expect(month).toHaveAttribute("aria-checked", "false");
    await expect(week).toHaveAttribute("aria-checked", "true");
  },
};
