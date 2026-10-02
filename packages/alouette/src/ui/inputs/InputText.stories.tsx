import { expect, fn, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarBlankRegularIcon } from "alouette-icons/phosphor-icons/CalendarBlank";
import { MagnifyingGlassRegularIcon } from "alouette-icons/phosphor-icons/MagnifyingGlass";
import type { ReactNode } from "react";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../primitives/Icon";
import { Story, neutralAndAccents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { InputText, type InputTextProps } from "./InputText";
import { TextArea } from "./TextArea";

type ThisStory = StoryObj<typeof InputText>;

interface SearchGlyphProps {
  disabled?: boolean;
}

// A slot glyph carries its own ink: `Icon` reads only its `text-*` class on
// native, so the field's disabled color never reaches it.
function SearchGlyph({ disabled }: SearchGlyphProps): ReactNode {
  return (
    <Icon
      icon={<MagnifyingGlassRegularIcon />}
      className={disabled ? "text-form-disabled-text" : "text-muted"}
    />
  );
}

type ForcedState = NonNullable<InputTextProps["forceStyle"]>;
type InputState = ForcedState | "disabled" | "invalid";

function StateCol({
  state,
  ...props
}: Pick<InputTextProps, "placeholder" | "value"> & {
  state: InputState | undefined;
}): ReactNode {
  if (state === "disabled") {
    return (
      <StoryGrid.Col title="disabled">
        <InputText disabled {...props} />
      </StoryGrid.Col>
    );
  }
  if (state === "invalid") {
    return (
      <StoryGrid.Col title="invalid">
        <InputText invalid {...props} />
      </StoryGrid.Col>
    );
  }
  return (
    <StoryGrid.Col title={state ?? "Default"}>
      <InputText forceStyle={state} {...props} />
    </StoryGrid.Col>
  );
}

function StateRow(
  props: Pick<InputTextProps, "placeholder" | "value">,
): ReactNode {
  return (
    <StoryGrid.Row flexWrap>
      <StateCol state={undefined} {...props} />
      <StateCol state="hover" {...props} />
      <StateCol state="focus" {...props} />
      <StateCol state="press" {...props} />
      <StateCol state="disabled" {...props} />
      <StateCol state="invalid" {...props} />
    </StoryGrid.Row>
  );
}

export default {
  title: "alouette/Inputs/InputText",
  component: InputText,
  parameters: {
    componentSubtitle:
      "Single-line text input with theme support, modes, and platform-aware keyboards.",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: "text" },
    maxLength: { control: "number" },
  },
} satisfies Meta<typeof InputText>;

export const PreviewInputTextStory: ThisStory = {
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: { placeholder: "Enter text..." },
  render: (args) => <InputText {...args} />,
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
            <StateRow />
            <StateRow placeholder="Placeholder" />
            <StateRow value="Value" />
          </Story.SubSection>
        ))}
      </Story.Section>

      <Story.Section title="Modes">
        <Story.SubSection title="Password">
          <InputText mode="password" />
        </Story.SubSection>
        <Story.SubSection title="Email">
          <InputText mode="email" />
        </Story.SubSection>
        <Story.SubSection title="Tel">
          <InputText mode="tel" />
        </Story.SubSection>
        <Story.SubSection title="Number">
          <InputText mode="number" />
        </Story.SubSection>
        <Story.SubSection title="URL">
          <InputText mode="url" />
        </Story.SubSection>
        <Story.SubSection title="Search">
          <InputText mode="search" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Slots">
        <Story.SubSection title="Start slot: a glyph">
          <InputText placeholder="Search" startSlot={<SearchGlyph />} />
        </Story.SubSection>
        <Story.SubSection title="End slot: an icon button">
          <InputText
            placeholder="Date"
            endSlot={
              <IconButton
                variant="soft"
                size="sm"
                icon={<CalendarBlankRegularIcon />}
                aria-label="Pick a date"
                onPress={fn()}
              />
            }
          />
        </Story.SubSection>
        <Story.SubSection title="Both">
          <InputText
            placeholder="Search"
            startSlot={<SearchGlyph />}
            endSlot={
              <IconButton
                variant="soft"
                size="sm"
                icon={<CalendarBlankRegularIcon />}
                aria-label="Pick a date"
                onPress={fn()}
              />
            }
          />
        </Story.SubSection>
        <Story.SubSection title="Disabled">
          <InputText
            disabled
            value="Search"
            startSlot={<SearchGlyph disabled />}
            endSlot={
              <IconButton
                disabled
                variant="soft"
                size="sm"
                icon={<CalendarBlankRegularIcon />}
                aria-label="Pick a date"
                onPress={fn()}
              />
            }
          />
        </Story.SubSection>
        <Story.SubSection title="Multiline: the slot pins to the first line">
          <TextArea
            defaultValue={"First line\nSecond line\nThird line"}
            startSlot={<SearchGlyph />}
          />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Other Props">
        <Story.SubSection title="Auto correct">
          <InputText autoCorrect />
        </Story.SubSection>
        <Story.SubSection title="Auto capitalize">
          <InputText autoCapitalize="none" placeholder="None" />
          <InputText autoCapitalize="words" placeholder="Words" />
          <InputText autoCapitalize="sentences" placeholder="Sentences" />
          <InputText autoCapitalize="characters" placeholder="Characters" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Edge Cases">
        <Story.SubSection title="Very long text">
          <InputText defaultValue="Very very very very very very very very very very very very very very very very very very very very very long value" />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

export const Tests: StoryObj<typeof InputText> = {
  name: "InputText Tests",

  render: () => (
    <Story noDarkMode>
      <Story.Section title="Modes">
        <InputText testID="password-input" mode="password" />
      </Story.Section>
      <Story.Section title="Accessibility">
        <InputText
          placeholder="Accessible input"
          aria-label="Accessible input"
        />
        <InputText invalid aria-label="Invalid input" value="not-an-email" />
      </Story.Section>
      <Story.Section title="Max Length">
        <InputText
          testID="maxlength-input"
          placeholder="Max length"
          maxLength={5}
        />
      </Story.Section>
      <Story.Section title="Slots">
        <InputText
          aria-label="Search"
          className="w-[240px]"
          startSlot={<SearchGlyph />}
          endSlot={
            <IconButton
              variant="soft"
              size="sm"
              icon={<CalendarBlankRegularIcon />}
              aria-label="Pick a date"
              onPress={fn()}
            />
          }
        />
      </Story.Section>
    </Story>
  ),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Slots: the text is padded past each 44px slot box, the frame — not the
    // input — takes `className`, and a tap on the glyph still lands in the
    // input while the button keeps its own press.
    const slotted = canvas.getByLabelText("Search");
    await expect(getComputedStyle(slotted).paddingLeft).toBe("44px");
    await expect(getComputedStyle(slotted).paddingRight).toBe("44px");
    await expect(slotted.parentElement?.getBoundingClientRect().width).toBe(
      240,
    );
    await expect(slotted.getBoundingClientRect().width).toBe(240);
    // The slot box is `pointer-events: none`, so a hit test at the glyph's
    // center falls through to the input, while the button is hit on its own.
    const pickDate = canvas.getByRole("button", { name: "Pick a date" });
    const slottedRect = slotted.getBoundingClientRect();
    const underGlyph = document.elementFromPoint(
      slottedRect.left + 22,
      slottedRect.top + 22,
    );
    await expect(underGlyph).toBe(slotted);
    const underButton = document.elementFromPoint(
      slottedRect.right - 22,
      slottedRect.top + 22,
    );
    await expect(pickDate.contains(underButton)).toBe(true);
    await userEvent.click(pickDate);
    await expect(pickDate).toHaveFocus();

    // Modes
    const passwordInput = canvas.getByTestId("password-input");
    await expect(passwordInput.tagName).toBe("INPUT");
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Accessibility
    const input = canvas.getByPlaceholderText("Accessible input");
    await expect(input).toHaveAttribute("aria-label", "Accessible input");
    await expect(input).toHaveAttribute("aria-invalid", "false");

    // An invalid input says so, and its border leaves the neutral token for
    // the danger one.
    const invalidInput = canvas.getByLabelText("Invalid input");
    await expect(invalidInput).toHaveAttribute("aria-invalid", "true");
    await expect(getComputedStyle(invalidInput).borderTopColor).not.toBe(
      getComputedStyle(input).borderTopColor,
    );

    // Max length
    const maxlengthInput = canvas.getByTestId("maxlength-input");
    await expect(maxlengthInput).toBeInTheDocument();
    await expect(maxlengthInput).toHaveAttribute("maxlength", "5");
  },
};
