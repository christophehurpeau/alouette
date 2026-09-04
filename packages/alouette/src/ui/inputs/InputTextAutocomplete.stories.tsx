import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import { Text } from "../primitives/Text";
import { VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { InputTextAutocomplete } from "./InputTextAutocomplete";
import type { InputTextAutocompleteProps } from "./InputTextAutocomplete.shared";

type ThisStory = StoryObj<typeof InputTextAutocomplete>;

function FruitAutocomplete(
  props: Omit<InputTextAutocompleteProps, "options">,
): ReactNode {
  return (
    <InputTextAutocomplete
      options={[
        { label: "Apple", value: "apple" },
        { label: "Apricot", value: "apricot" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
        { label: "Durian (sold out)", value: "durian", disabled: true },
        { label: "Elderberry", value: "elderberry" },
      ]}
      {...props}
    />
  );
}

function ControlledFruitAutocomplete(): ReactNode {
  const [value, setValue] = useState("banana");
  return (
    <VStack className="gap-xs">
      <FruitAutocomplete
        aria-label="Controlled fruit"
        value={value}
        onValueChange={setValue}
      />
      <Text className="font-mono text-xs text-muted">value: {value}</Text>
    </VStack>
  );
}

export default {
  title: "alouette/Inputs/InputTextAutocomplete",
  component: InputTextAutocomplete,
  parameters: {
    componentSubtitle:
      "Text input with a filtered listbox, built on downshift.",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    emptyLabel: { control: "text" },
  },
} satisfies Meta<typeof InputTextAutocomplete>;

export const PreviewInputTextAutocompleteStory: ThisStory = {
  args: { placeholder: "Search a fruit..." },
  render: (args) => <FruitAutocomplete onValueChange={fn()} {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        {([undefined, ...accents] as const).map((accent) => (
          <Story.SubSection
            key={accent || "default"}
            withSurface
            title={accent ?? "Default"}
            accent={accent}
          >
            <StoryGrid.Row flexWrap>
              <StoryGrid.Col title="placeholder">
                <FruitAutocomplete
                  accent={accent}
                  placeholder="Search a fruit..."
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="value">
                <FruitAutocomplete
                  accent={accent}
                  defaultValue="banana"
                  onValueChange={fn()}
                />
              </StoryGrid.Col>
              <StoryGrid.Col title="disabled">
                <FruitAutocomplete
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

      <Story.Section title="Controlled">
        <Story.SubSection title="value + onValueChange">
          <ControlledFruitAutocomplete />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Filtering">
        <Story.SubSection title="Custom filter (prefix match)">
          <FruitAutocomplete
            placeholder="Type “ap”..."
            filterOption={(option, inputValue) =>
              option.label.toLowerCase().startsWith(inputValue.toLowerCase())
            }
            onValueChange={fn()}
          />
        </Story.SubSection>
        <Story.SubSection title="Empty label">
          <FruitAutocomplete
            emptyLabel="No fruit matches"
            placeholder="Type “zzz”..."
            onValueChange={fn()}
          />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

export const Tests: StoryObj<typeof InputTextAutocomplete> = {
  name: "InputTextAutocomplete Tests",

  render: () => (
    <Story noDarkMode>
      <Story.Section title="Accessibility">
        <FruitAutocomplete
          aria-label="Fruit"
          placeholder="Search a fruit..."
          emptyLabel="No fruit matches"
          onValueChange={fn()}
        />
        <ControlledFruitAutocomplete />
      </Story.Section>
    </Story>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The menu is portaled out of the canvas, so it is queried from `screen`.
    const input = canvas.getByLabelText("Fruit");

    // A controlled `value` starts the field on the selected label, not empty.
    await expect(canvas.getByLabelText("Controlled fruit")).toHaveValue(
      "Banana",
    );

    await expect(input).toHaveAttribute("role", "combobox");
    await expect(input).toHaveAttribute("aria-expanded", "false");

    await userEvent.type(input, "ap");
    await expect(input).toHaveAttribute("aria-expanded", "true");

    const listbox = screen.getByRole("listbox");
    await expect(within(listbox).getAllByRole("option")).toHaveLength(2);
    await expect(input).toHaveAttribute(
      "aria-controls",
      listbox.getAttribute("id"),
    );

    await userEvent.keyboard("{ArrowDown}");
    await expect(input).toHaveAttribute(
      "aria-activedescendant",
      within(listbox).getByRole("option", { name: "Apple" }).getAttribute("id"),
    );
    await userEvent.keyboard("{Enter}");
    await expect(input).toHaveValue("Apple");
    await expect(input).toHaveAttribute("aria-expanded", "false");
    await expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // The press path, not the keyboard one.
    await userEvent.clear(input);
    await userEvent.type(input, "cher");
    await userEvent.click(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: "Cherry",
      }),
    );
    await expect(input).toHaveValue("Cherry");
    await expect(input).toHaveAttribute("aria-expanded", "false");

    // Clicking the input reopens the menu, unfiltered by the selected label.
    await userEvent.click(input);
    const reopened = screen.getByRole("listbox");
    await expect(within(reopened).getAllByRole("option")).toHaveLength(6);

    // `aria-selected` reports the selection, not downshift's keyboard cursor —
    // that one is carried by `aria-activedescendant`.
    await userEvent.keyboard("{ArrowDown}");
    await expect(
      within(reopened).getByRole("option", { name: "Cherry" }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      within(reopened).getByRole("option", { name: "Apple" }),
    ).toHaveAttribute("aria-selected", "false");

    // The pointer moves that cursor as well, so the hovered row is the only
    // highlighted one: downshift's `onMouseMove` is a DOM handler a
    // react-native-web Pressable drops, hence the row's `onHoverIn`.
    const banana = within(reopened).getByRole("option", { name: "Banana" });
    await userEvent.hover(banana);
    await waitFor(async () => {
      await expect(input).toHaveAttribute(
        "aria-activedescendant",
        banana.getAttribute("id"),
      );
    });

    await userEvent.clear(input);
    await userEvent.type(input, "durian");
    await expect(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: "Durian (sold out)",
      }),
    ).toHaveAttribute("aria-disabled", "true");

    await userEvent.clear(input);
    await userEvent.type(input, "zzz");
    await expect(screen.getByText("No fruit matches")).toBeInTheDocument();
    await expect(
      within(screen.getByRole("listbox")).queryAllByRole("option"),
    ).toHaveLength(0);
    // The message is a sibling of the listbox, never a child of it.
    await expect(
      within(screen.getByRole("listbox")).queryByText("No fruit matches"),
    ).not.toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    await expect(input).toHaveAttribute("aria-expanded", "false");
    await expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  },
};
