import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesktopDuotoneIcon } from "alouette-icons/phosphor-icons/DesktopDuotoneIcon";
import { DesktopRegularIcon } from "alouette-icons/phosphor-icons/DesktopRegularIcon";
import { MoonDuotoneIcon } from "alouette-icons/phosphor-icons/MoonDuotoneIcon";
import { MoonRegularIcon } from "alouette-icons/phosphor-icons/MoonRegularIcon";
import { SunDuotoneIcon } from "alouette-icons/phosphor-icons/SunDuotoneIcon";
import { SunRegularIcon } from "alouette-icons/phosphor-icons/SunRegularIcon";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Text } from "../primitives/Text";
import type { SegmentedVariant } from "../selection/SelectionContext";
import { Story } from "../story-components/Story";
import { RadioButton, type RadioButtonProps } from "./RadioButton";
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
    variant: { control: "inline-radio", options: ["segmented", "icon"] },
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

interface ColorModeGroupProps {
  label: string;
  variant?: SegmentedVariant;
  activeAccent?: RadioButtonProps["activeAccent"];
  /** Renders `icon` alone, so the glyph keeps one weight throughout. */
  withoutActiveIcon?: boolean;
  /** Badges the light chip, the state its own label would spell out. */
  withIndicator?: boolean;
}

/**
 * A light/dark/system picker: the canonical icon group, and — as `variant`
 * `icon` — square chips whose `label` is their accessible name only. The
 * ready-made control is `ColorModePicker`, built on this.
 */
function ColorModeGroup({
  label,
  variant,
  activeAccent,
  withoutActiveIcon,
  withIndicator,
}: ColorModeGroupProps): ReactNode {
  return (
    <RadioButtonGroup
      variant={variant}
      aria-label={label}
      defaultValue="system"
    >
      <RadioButton
        value="light"
        label="Light"
        icon={<SunRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <SunDuotoneIcon />}
        activeAccent={activeAccent}
        indicator={withIndicator ? <DesktopRegularIcon /> : undefined}
      />
      <RadioButton
        value="dark"
        label="Dark"
        icon={<MoonRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <MoonDuotoneIcon />}
        activeAccent={activeAccent}
      />
      <RadioButton
        value="system"
        label="System"
        icon={<DesktopRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <DesktopDuotoneIcon />}
        activeAccent={activeAccent}
      />
    </RadioButtonGroup>
  );
}

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
      <ColorModeGroup activeAccent={accent} label="Active accent" />
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
        <Text className="text-sm text-muted">
          Each accent is shown on the bar itself, then — in the last row — on
          the glyph alone: no accent on the group, `activeAccent` on the
          buttons.
        </Text>
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
      <Story.Section title="Icon">
        <Story.SubSection withSurface title="Icon chips">
          <ColorModeGroup variant="icon" label="Color mode" />
        </Story.SubSection>
        <Story.SubSection withSurface title="Accent and disabled">
          <RadioButtonGroup variant="icon" accent="brand" defaultValue="dark">
            <RadioButton
              value="light"
              label="Light"
              icon={<SunRegularIcon />}
              activeIcon={<SunDuotoneIcon />}
            />
            <RadioButton
              value="dark"
              label="Dark"
              icon={<MoonRegularIcon />}
              activeIcon={<MoonDuotoneIcon />}
            />
            <RadioButton
              disabled
              value="system"
              label="System"
              icon={<DesktopRegularIcon />}
              activeIcon={<DesktopDuotoneIcon />}
            />
          </RadioButtonGroup>
          <RadioButtonGroup disabled variant="icon" defaultValue="light">
            <RadioButton
              value="light"
              label="Light"
              icon={<SunRegularIcon />}
              activeIcon={<SunDuotoneIcon />}
            />
            <RadioButton
              value="dark"
              label="Dark"
              icon={<MoonRegularIcon />}
              activeIcon={<MoonDuotoneIcon />}
            />
          </RadioButtonGroup>
        </Story.SubSection>
        <Story.SubSection withSurface title="Without activeIcon">
          <Text className="text-sm text-muted">
            The duotone twin is optional. Drop `activeIcon` and the glyph keeps
            one weight throughout, the chip carrying the whole affordance.
          </Text>
          <ColorModeGroup
            withoutActiveIcon
            variant="icon"
            label="Single weight"
          />
        </Story.SubSection>
        <Story.SubSection withSurface title="Indicator">
          <Text className="text-sm text-muted">
            `indicator` badges a chip for a secondary state its label spells out
            — here the light chip. It sits over the glyph's top-right in a halo
            of the chip's own fill, adding to the icon and never replacing it,
            and only the icon variant renders it.
          </Text>
          <ColorModeGroup withIndicator variant="icon" label="With indicator" />
          <ColorModeGroup withIndicator label="Segmented ignores it" />
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
      <Story.Section title="Icon">
        <ColorModeGroup variant="icon" label="Color mode" />
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

    // Icon group: the label is the accessible name only — it is not rendered —
    // and the square chip still sits in a 44x44 tap target.
    const iconGroup = canvas.getByRole("radiogroup", { name: "Color mode" });
    const iconCanvas = within(iconGroup);
    const light = iconCanvas.getByRole("radio", { name: "Light" });
    const dark = iconCanvas.getByRole("radio", { name: "Dark" });
    const system = iconCanvas.getByRole("radio", { name: "System" });

    await expect(iconCanvas.queryByText("Light")).toBeNull();
    await expect(iconGroup.getBoundingClientRect().height).toBe(44);
    for (const option of [light, dark, system]) {
      const rect = option.getBoundingClientRect();
      await expect(rect.height).toBeGreaterThanOrEqual(44);
      await expect(rect.width).toBeGreaterThanOrEqual(44);
    }

    await expect(system).toHaveAttribute("aria-checked", "true");

    dark.click();

    await waitFor(() => expect(dark).toHaveAttribute("aria-checked", "true"));
    await expect(system).toHaveAttribute("aria-checked", "false");
  },
};
