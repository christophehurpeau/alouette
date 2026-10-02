import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MapPinRegularIcon } from "alouette-icons/phosphor-icons/MapPin";
import type { ReactNode } from "react";
import { Story, neutralAndAccents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Select } from "./Select";
import type { SelectProps } from "./Select.shared";

type ThisStory = StoryObj<typeof Select>;

// Presentational wrapper holding the demo options inline, so stories stay
// markup-driven and forward only the props under test.
function FruitSelect(props: Omit<SelectProps, "options">): ReactNode {
  return (
    <Select
      options={[
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
        { label: "Durian (sold out)", value: "durian", disabled: true },
        { label: "Elderberry", value: "elderberry" },
      ]}
      {...props}
    />
  );
}

export default {
  title: "alouette/Inputs/Select",
  component: Select,
  parameters: {
    componentSubtitle:
      "Accessible select: a select-only combobox opening a listbox panel, anchored under it on web and an overlay on iOS/Android.",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export const PreviewSelectStory: ThisStory = {
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: { placeholder: "Pick a fruit..." },
  render: (args) => <FruitSelect onValueChange={fn()} {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        {neutralAndAccents.map((accent) => (
          <Story.SubSection
            key={accent}
            withSurface
            title={accent}
            accent={accent}
          >
            <StoryGrid.Row flexWrap>
              <StoryGrid.Col title="placeholder">
                <FruitSelect
                  accent={accent}
                  placeholder="Pick a fruit..."
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="value">
                <FruitSelect
                  accent={accent}
                  defaultValue="banana"
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="disabled (placeholder)">
                <FruitSelect
                  disabled
                  accent={accent}
                  placeholder="Pick a fruit..."
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="disabled (value)">
                <FruitSelect
                  disabled
                  accent={accent}
                  defaultValue="banana"
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
            </StoryGrid.Row>
          </Story.SubSection>
        ))}
      </Story.Section>

      <Story.Section title="Tonal">
        {neutralAndAccents.map((accent) => (
          <Story.SubSection key={accent} title={accent}>
            <StoryGrid.Row flexWrap>
              <StoryGrid.Col title="placeholder">
                <FruitSelect
                  accent={accent}
                  variant="tonal"
                  placeholder="Pick a fruit..."
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="value">
                <FruitSelect
                  accent={accent}
                  variant="tonal"
                  defaultValue="banana"
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="icon">
                <FruitSelect
                  accent={accent}
                  variant="tonal"
                  icon={<MapPinRegularIcon />}
                  defaultValue="banana"
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="disabled">
                <FruitSelect
                  disabled
                  accent={accent}
                  variant="tonal"
                  defaultValue="banana"
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
            </StoryGrid.Row>
          </Story.SubSection>
        ))}
      </Story.Section>

      <Story.Section title="Leading icon">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="placeholder">
            <FruitSelect
              icon={<MapPinRegularIcon />}
              placeholder="Pick a fruit..."
              onValueChange={fn()}
            />
          </StoryGrid.Col>
          <StoryGrid.Col title="value">
            <FruitSelect
              icon={<MapPinRegularIcon />}
              defaultValue="banana"
              onValueChange={fn()}
            />
          </StoryGrid.Col>
          <StoryGrid.Col title="disabled">
            <FruitSelect
              disabled
              icon={<MapPinRegularIcon />}
              defaultValue="banana"
              onValueChange={fn()}
            />
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Edge Cases">
        <Story.SubSection title="Long label">
          <FruitSelect
            defaultValue="durian"
            placeholder="Pick a fruit with a very very very long placeholder label"
            onValueChange={fn()}
          />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

export const Tests: StoryObj<typeof Select> = {
  name: "Select Tests",

  render: () => (
    <Story noDarkMode>
      <Story.Section title="Accessibility">
        <FruitSelect
          aria-label="Fruit"
          defaultValue="banana"
          onValueChange={fn()}
        />
      </Story.Section>
      <Story.Section title="Disabled">
        <FruitSelect
          disabled
          aria-label="Disabled fruit"
          defaultValue="banana"
          onValueChange={fn()}
        />
      </Story.Section>
      <Story.Section title="Tonal">
        <FruitSelect
          aria-label="Tonal fruit"
          variant="tonal"
          icon={<MapPinRegularIcon />}
          defaultValue="banana"
          onValueChange={fn()}
        />
      </Story.Section>
    </Story>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const body = within(canvasElement.ownerDocument.body);

    // A select-only combobox showing its current choice.
    const select = canvas.getByRole("combobox", { name: "Fruit" });
    await expect(select).toHaveTextContent("Banana");
    await expect(select).toHaveAttribute("aria-expanded", "false");

    // Pressing it opens the listbox in a panel under it, as wide as it is.
    await userEvent.click(select);
    const listbox = await body.findByRole("listbox");
    await expect(select).toHaveAttribute("aria-expanded", "true");
    await expect(
      within(listbox).getByRole("option", { name: "Banana" }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      within(listbox).getByRole("option", { name: "Durian (sold out)" }),
    ).toHaveAttribute("aria-disabled", "true");
    await expect(listbox.getBoundingClientRect().top).toBeGreaterThan(
      select.getBoundingClientRect().bottom,
    );

    // Picking an option closes the panel and hands the focus back.
    await userEvent.click(
      within(listbox).getByRole("option", { name: "Cherry" }),
    );
    await waitFor(async () => {
      await expect(body.queryByRole("listbox")).toBe(null);
    });
    await expect(select).toHaveTextContent("Cherry");
    await expect(select).toHaveFocus();

    // The keyboard drives it all: Enter opens, End moves to the last enabled
    // option, Enter picks it.
    await userEvent.keyboard("{Enter}");
    await body.findByRole("listbox");
    await userEvent.keyboard("{End}{Enter}");
    await waitFor(async () => {
      await expect(body.queryByRole("listbox")).toBe(null);
    });
    await expect(select).toHaveTextContent("Elderberry");

    // An outlined select is a field: ringed like InputText while focused.
    await expect(getComputedStyle(select).outlineWidth).toBe("1px");

    // A disabled select is out of the tab order and does not open.
    const disabledSelect = canvas.getByRole("combobox", {
      name: "Disabled fruit",
    });
    await expect(disabledSelect).toHaveAttribute("tabindex", "-1");
    await expect(disabledSelect).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(disabledSelect, { pointerEventsCheck: 0 });
    await expect(body.queryByRole("listbox")).toBe(null);

    // A tonal one is a pill, ringed on keyboard focus like a tonal button.
    const tonal = canvas.getByRole("combobox", { name: "Tonal fruit" });
    await expect(getComputedStyle(tonal).borderTopWidth).toBe("0px");
    await expect(getComputedStyle(tonal).boxShadow).not.toBe("none");
    await userEvent.tab();
    await expect(tonal).toHaveFocus();
    await expect(getComputedStyle(tonal).outlineWidth).toBe("2px");
    await expect(getComputedStyle(tonal).outlineOffset).toBe("2px");
  },
};
