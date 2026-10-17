import { expect, fn, screen, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DotsThreeVerticalRegularIcon } from "alouette-icons/phosphor-icons/DotsThreeVertical";
import { MagnifyingGlassRegularIcon } from "alouette-icons/phosphor-icons/MagnifyingGlass";
import { PlusRegularIcon } from "alouette-icons/phosphor-icons/Plus";
import { RowsRegularIcon } from "alouette-icons/phosphor-icons/Rows";
import { SquaresFourRegularIcon } from "alouette-icons/phosphor-icons/SquaresFour";
import type { ReactNode } from "react";
import type { Density } from "../../controlSizes";
import { Button } from "../actions/Button";
import { IconButton } from "../actions/IconButton";
import { Menu } from "../actions/Menu";
import { MenuItem } from "../actions/MenuItem";
import { SplitButton } from "../actions/SplitButton";
import { SplitButtonOption } from "../actions/SplitButtonOption";
import { Checkbox } from "../inputs/Checkbox";
import { InputText } from "../inputs/InputText";
import { RadioButton } from "../inputs/RadioButton";
import { RadioButtonGroup } from "../inputs/RadioButtonGroup";
import { Select } from "../inputs/Select";
import { Tab } from "../navigation/Tab";
import { Tabs } from "../navigation/Tabs";
import { Icon } from "../primitives/Icon";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { DensityScope } from "./DensityScope";

type ThisStory = StoryObj<typeof DensityScope>;

export default {
  title: "alouette/Containers/DensityScope",
  component: DensityScope,
  parameters: {
    componentSubtitle:
      "Sets the size of every control in its subtree: comfortable for touch, compact for an interface driven by a mouse",
    docs: {
      description: {
        component: `### Densities
- \`comfortable\` (default, outside any scope): every control keeps the 44px touch target — \`Button\` sizes 38 / 44 / 52px
- \`compact\`: 36px controls — \`Button\` sizes 32 / 36 / 44px — for a desktop-only interface (WCAG 2.5.8 asks 24px for a pointer target)

The scope swaps the \`--spacing-control-*\` tokens, so a control written with \`min-h-control-md\` follows it; type sizes do not change. \`useDensity()\` reads it for a size set from JS, and \`controlHeightsPx\` gives the heights in px. Scopes nest, and a \`Popover\`, \`Menu\` or \`Modal\` keeps the density of the element that opened it.

### Usage
~~~tsx
<AlouetteProvider themeVariables={themeVariables}>
  <DensityScope density="compact">
    <App />
  </DensityScope>
</AlouetteProvider>
~~~`,
      },
    },
  },
} satisfies Meta<typeof DensityScope>;

function Toolbar(): ReactNode {
  return (
    <View className="flex-row flex-wrap items-center gap-xs">
      <View className="w-[220px]">
        <InputText
          aria-label="Search"
          placeholder="Search"
          startSlot={
            <Icon
              icon={<MagnifyingGlassRegularIcon />}
              className="text-muted"
            />
          }
        />
      </View>
      <Select
        aria-label="Status"
        defaultValue="open"
        options={[
          { label: "Open", value: "open" },
          { label: "Closed", value: "closed" },
        ]}
      />
      <RadioButtonGroup aria-label="Layout" variant="icon" defaultValue="rows">
        <RadioButton value="rows" label="Rows" icon={<RowsRegularIcon />} />
        <RadioButton
          value="grid"
          label="Grid"
          icon={<SquaresFourRegularIcon />}
        />
      </RadioButtonGroup>
      <Button icon={<PlusRegularIcon />} text="New issue" />
      <SplitButton
        menuLabel="Merge method"
        defaultValue="squash"
        onPress={fn()}
      >
        <SplitButtonOption value="squash" label="Squash and merge" />
        <SplitButtonOption value="rebase" label="Rebase and merge" />
      </SplitButton>
      <Menu
        label="More actions"
        render={(trigger) => (
          <IconButton
            aria-label="More actions"
            icon={<DotsThreeVerticalRegularIcon />}
            variant="soft"
            {...trigger}
          />
        )}
      >
        <MenuItem label="Duplicate" onPress={fn()} />
        <MenuItem label="Archive" onPress={fn()} />
      </Menu>
    </View>
  );
}

function SettingsRow(): ReactNode {
  return (
    <View className="flex-row flex-wrap items-center gap-m">
      <Tabs aria-label="Period" defaultValue="week">
        <Tab value="day" label="Day" />
        <Tab value="week" label="Week" />
        <Tab value="month" label="Month" />
      </Tabs>
      <Checkbox label="Show archived" />
    </View>
  );
}

interface ControlsProps {
  density: Density;
}

function Controls({ density }: ControlsProps): ReactNode {
  return (
    <DensityScope density={density}>
      <View role="group" aria-label={density} className="gap-m">
        <Toolbar />
        <SettingsRow />
      </View>
    </DensityScope>
  );
}

export const DensityScopePreviewStory: ThisStory = {
  name: "DensityScope Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: { density: "compact" },
  render: (args) => (
    <DensityScope {...args}>
      <View className="gap-m">
        <Toolbar />
        <SettingsRow />
      </View>
    </DensityScope>
  ),
};

export const DensityScopeVariantsStory: ThisStory = {
  name: "DensityScope Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="comfortable">
        <Controls density="comfortable" />
      </Story.Section>
      <Story.Section withSurface title="compact">
        <Controls density="compact" />
      </Story.Section>
      <Story.Section withSurface title="comfortable nested in compact">
        <DensityScope density="compact">
          <Controls density="comfortable" />
        </DensityScope>
      </Story.Section>
    </Story>
  ),
};

const heightOf = (element: HTMLElement): number =>
  element.getBoundingClientRect().height;

interface ExpectControlHeightsParams {
  group: HTMLElement;
  height: number;
}

async function expectControlHeights({
  group,
  height,
}: ExpectControlHeightsParams): Promise<void> {
  const controls = within(group);
  await expect(
    heightOf(controls.getByRole("textbox", { name: "Search" })),
  ).toBe(height);
  await expect(
    heightOf(controls.getByRole("combobox", { name: "Status" })),
  ).toBe(height);
  await expect(
    heightOf(controls.getByRole("radiogroup", { name: "Layout" })),
  ).toBe(height);
  await expect(
    heightOf(controls.getByRole("button", { name: "New issue" })),
  ).toBe(height);
  await expect(
    heightOf(controls.getByRole("button", { name: "More actions" })),
  ).toBe(height);
  await expect(
    heightOf(controls.getByRole("tablist", { name: "Period" })),
  ).toBe(height);
  await expect(
    heightOf(controls.getByRole("checkbox", { name: "Show archived" })),
  ).toBe(height);
}

/**
 * A field, a select, a segmented bar and the buttons beside them share one
 * height in each density, so a toolbar lines up whichever it renders in — and
 * the menu a compact trigger opens is compact too, although it is portaled out
 * of the scope.
 */
export const ControlHeights: ThisStory = {
  render: () => (
    <Story noDarkMode>
      <Story.Section withSurface title="comfortable">
        <Controls density="comfortable" />
      </Story.Section>
      <Story.Section withSurface title="compact">
        <Controls density="compact" />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expectControlHeights({
      group: canvas.getByRole("group", { name: "comfortable" }),
      height: 44,
    });
    const compact = canvas.getByRole("group", { name: "compact" });
    await expectControlHeights({ group: compact, height: 36 });

    await userEvent.click(
      within(compact).getByRole("button", { name: "More actions" }),
    );
    const menu = await screen.findByRole("menu", { name: "More actions" });
    for (const item of within(menu).getAllByRole("menuitem")) {
      await expect(heightOf(item)).toBe(36);
    }
  },
};
