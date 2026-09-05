import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BellDuotoneIcon } from "alouette-icons/phosphor-icons/BellDuotoneIcon";
import { BellRegularIcon } from "alouette-icons/phosphor-icons/BellRegularIcon";
import { CalendarDuotoneIcon } from "alouette-icons/phosphor-icons/CalendarDuotoneIcon";
import { CalendarRegularIcon } from "alouette-icons/phosphor-icons/CalendarRegularIcon";
import { ChartBarDuotoneIcon } from "alouette-icons/phosphor-icons/ChartBarDuotoneIcon";
import { ChartBarRegularIcon } from "alouette-icons/phosphor-icons/ChartBarRegularIcon";
import { type ReactNode, useState } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Surface } from "../containers/Surface";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { Tab, type TabProps } from "./Tab";
import { Tabs } from "./Tabs";

type ThisStory = StoryObj<typeof Tabs>;

export default {
  title: "alouette/Navigation/Tabs",
  component: Tabs,
  parameters: {
    componentSubtitle:
      "Segmented switch between views on the same screen. Tabs owns the value; Tab children read it via context and mark themselves aria-selected.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    variant: { control: "inline-radio", options: ["segmented", "icon"] },
    accent: {
      control: "select",
      options: [undefined, "brand", "danger", "info", "success", "warning"],
    },
  },
} satisfies Meta<typeof Tabs>;

export const PreviewTabsStory: ThisStory = {
  name: "Tabs Preview",
  render: (args) => (
    <Tabs aria-label="Period" defaultValue="week" {...args}>
      <Tab value="day" label="Day" />
      <Tab value="week" label="Week" />
      <Tab value="month" label="Month" />
    </Tabs>
  ),
};

function IconTabs({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Tabs variant="icon" accent={accent} aria-label="Icons" defaultValue="week">
      <Tab
        value="week"
        label="Week"
        icon={<CalendarRegularIcon />}
        activeIcon={<CalendarDuotoneIcon />}
      />
      <Tab
        value="stats"
        label="Stats"
        icon={<ChartBarRegularIcon />}
        activeIcon={<ChartBarDuotoneIcon />}
      />
      <Tab
        disabled
        value="alerts"
        label="Alerts"
        icon={<BellRegularIcon />}
        activeIcon={<BellDuotoneIcon />}
      />
    </Tabs>
  );
}

interface RangeTabsProps {
  label: string;
  accent?: Accent;
  activeAccent?: TabProps["activeAccent"];
  /** Renders `icon` alone, so the glyph keeps one weight throughout. */
  withoutActiveIcon?: boolean;
}

function RangeTabs({
  label,
  accent,
  activeAccent,
  withoutActiveIcon,
}: RangeTabsProps): ReactNode {
  return (
    <Tabs aria-label={label} accent={accent} defaultValue="week">
      <Tab
        value="week"
        label="Week"
        icon={<CalendarRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <CalendarDuotoneIcon />}
        activeAccent={activeAccent}
      />
      <Tab
        value="stats"
        label="Stats"
        icon={<ChartBarRegularIcon />}
        activeIcon={withoutActiveIcon ? undefined : <ChartBarDuotoneIcon />}
        activeAccent={activeAccent}
      />
    </Tabs>
  );
}

function TabsVariant({ accent }: { accent?: Accent }): ReactNode {
  return (
    <Story.SubSection withSurface title={accent ?? "Default"}>
      <RangeTabs accent={accent} label="With icons" />
      <Tabs aria-label="Labels only" accent={accent} defaultValue="week">
        <Tab value="day" label="Day" />
        <Tab value="week" label="Week" />
        <Tab disabled value="month" label="Month" />
      </Tabs>
      <Tabs disabled aria-label="Disabled" accent={accent} defaultValue="week">
        <Tab value="day" label="Day" />
        <Tab value="week" label="Week" />
      </Tabs>
      <IconTabs accent={accent} />
      <RangeTabs activeAccent={accent} label="Active accent" />
    </Story.SubSection>
  );
}

export const VariantsTabsStory: ThisStory = {
  name: "Tabs Variants",
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <Text className="text-sm text-muted">
          Each accent is shown on the bar itself, then — in the last row — on
          the glyph alone: no accent on the group, `activeAccent` on the tabs.
        </Text>
        <TabsVariant />
        <TabsVariant accent="brand" />
        <TabsVariant accent="danger" />
        <TabsVariant accent="success" />
      </Story.Section>

      <Story.Section withSurface title="Without activeIcon">
        <Text className="text-sm text-muted">
          The duotone twin is optional. Drop `activeIcon` and the glyph keeps
          one weight throughout, the chip carrying the whole affordance.
        </Text>
        <RangeTabs withoutActiveIcon label="Single weight" />
      </Story.Section>
    </Story>
  ),
};

function TabPanel({ value }: { value: string }): ReactNode {
  if (value === "week") {
    return <Text>Seven days of activity.</Text>;
  }
  return <Text>Twelve weeks of activity.</Text>;
}

function TabsWithPanels(): ReactNode {
  const [value, setValue] = useState("week");

  return (
    <VStack className="gap-m items-start">
      <Tabs aria-label="Ranges" value={value} onValueChange={setValue}>
        <Tab
          id="tab-week"
          aria-controls="panel-week"
          value="week"
          label="Week"
        />
        <Tab
          id="tab-quarter"
          aria-controls="panel-quarter"
          value="quarter"
          label="Quarter"
        />
      </Tabs>
      <Surface
        role="tabpanel"
        id={value === "week" ? "panel-week" : "panel-quarter"}
        aria-labelledby={value === "week" ? "tab-week" : "tab-quarter"}
      >
        <TabPanel value={value} />
      </Surface>
    </VStack>
  );
}

export const TestsTabsStory: ThisStory = {
  name: "Tabs Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Uncontrolled">
        <Tabs aria-label="Period" defaultValue="day">
          <Tab
            value="day"
            label="Day"
            icon={<CalendarRegularIcon />}
            activeIcon={<CalendarDuotoneIcon />}
          />
          <Tab value="week" label="Week" />
          <Tab disabled value="month" label="Month" />
        </Tabs>
      </Story.Section>
      <Story.Section title="With panels">
        <TabsWithPanels />
      </Story.Section>
      <Story.Section title="Icon">
        <IconTabs />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tablist = canvas.getByRole("tablist", { name: "Period" });
    const tablistCanvas = within(tablist);
    const day = tablistCanvas.getByRole("tab", { name: "Day" });
    const week = tablistCanvas.getByRole("tab", { name: "Week" });
    const month = tablistCanvas.getByRole("tab", { name: "Month" });

    await expect(day).toHaveAttribute("aria-selected", "true");
    await expect(week).toHaveAttribute("aria-selected", "false");
    await expect(month).toHaveAttribute("aria-disabled", "true");

    await expect(tablist.getBoundingClientRect().height).toBe(44);
    for (const tab of [day, week, month]) {
      await expect(tab.getBoundingClientRect().height).toBeGreaterThanOrEqual(
        44,
      );
    }

    week.click();

    await waitFor(() => expect(week).toHaveAttribute("aria-selected", "true"));
    await expect(day).toHaveAttribute("aria-selected", "false");

    month.click();
    await expect(month).toHaveAttribute("aria-selected", "false");
    await expect(week).toHaveAttribute("aria-selected", "true");

    const ranges = within(canvas.getByRole("tablist", { name: "Ranges" }));
    const quarter = ranges.getByRole("tab", { name: "Quarter" });

    await expect(quarter).toHaveAttribute("aria-controls", "panel-quarter");

    quarter.click();

    await waitFor(() =>
      expect(canvas.getByRole("tabpanel")).toHaveAttribute(
        "id",
        "panel-quarter",
      ),
    );
    await expect(canvas.getByText("Twelve weeks of activity.")).toBeTruthy();

    // Icon tabs: the label names the tab without being rendered, and the square
    // chip still sits in a 44x44 tap target.
    const iconTablist = canvas.getByRole("tablist", { name: "Icons" });
    const iconCanvas = within(iconTablist);
    const iconWeek = iconCanvas.getByRole("tab", { name: "Week" });
    const iconStats = iconCanvas.getByRole("tab", { name: "Stats" });
    const iconAlerts = iconCanvas.getByRole("tab", { name: "Alerts" });

    await expect(iconCanvas.queryByText("Stats")).toBeNull();
    await expect(iconTablist.getBoundingClientRect().height).toBe(44);
    for (const tab of [iconWeek, iconStats, iconAlerts]) {
      const rect = tab.getBoundingClientRect();
      await expect(rect.height).toBeGreaterThanOrEqual(44);
      await expect(rect.width).toBeGreaterThanOrEqual(44);
    }

    await expect(iconWeek).toHaveAttribute("aria-selected", "true");
    await expect(iconAlerts).toHaveAttribute("aria-disabled", "true");

    iconStats.click();

    await waitFor(() =>
      expect(iconStats).toHaveAttribute("aria-selected", "true"),
    );
    await expect(iconWeek).toHaveAttribute("aria-selected", "false");
  },
};
