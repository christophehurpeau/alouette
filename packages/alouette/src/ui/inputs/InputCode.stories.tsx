import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import { Form } from "../forms/Form";
import { FormField } from "../forms/FormField";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story, neutralAndAccents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { InputCode, type InputCodeProps } from "./InputCode";

type ThisStory = StoryObj<typeof InputCode>;

type ForcedState = NonNullable<InputCodeProps["forceStyle"]>;
type InputState = ForcedState | "disabled" | "invalid";

function StateCol({
  state,
  ...props
}: Pick<InputCodeProps, "value"> & {
  state: InputState | undefined;
}): ReactNode {
  if (state === "disabled") {
    return (
      <StoryGrid.Col title="disabled">
        <InputCode disabled aria-label="disabled" {...props} />
      </StoryGrid.Col>
    );
  }
  if (state === "invalid") {
    return (
      <StoryGrid.Col title="invalid">
        <InputCode invalid aria-label="invalid" {...props} />
      </StoryGrid.Col>
    );
  }
  const title = state ?? "Default";
  return (
    <StoryGrid.Col title={title}>
      <InputCode forceStyle={state} aria-label={title} {...props} />
    </StoryGrid.Col>
  );
}

function StateRow(props: Pick<InputCodeProps, "value">): ReactNode {
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

function ControlledInputCode(): ReactNode {
  const [code, setCode] = useState("12");
  return (
    <View className="gap-xs">
      <InputCode
        aria-label="Controlled code"
        value={code}
        onValueChange={setCode}
        onComplete={fn()}
      />
      <Text className="font-mono text-xs text-muted">value: {code}</Text>
    </View>
  );
}

interface VerifyValues {
  code: string;
}

function validateCode(code: string): string | undefined {
  return code.length === 6 ? undefined : "The code has 6 digits.";
}

// What an app wires: `FormField` labels the field and the input takes its
// render params, exactly like an `InputText`.
function InputCodeFormDemo(): ReactNode {
  return (
    <Form<VerifyValues>
      defaultValues={{ code: "" }}
      render={({ control }) => (
        <FormField
          control={control}
          name="code"
          label="Verification code"
          required="Enter the 6-digit code."
          validate={validateCode}
          render={({ field, labelId, describedBy, invalid, required }) => (
            <InputCode
              ref={field.ref}
              value={field.value}
              aria-labelledby={labelId}
              aria-describedby={describedBy}
              aria-required={required}
              invalid={invalid}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      )}
      onSubmit={() => {}}
    />
  );
}

export default {
  title: "alouette/Inputs/InputCode",
  component: InputCode,
  parameters: {
    componentSubtitle:
      "Fixed-length one-time code: one input behind a row of cells, with paste, SMS autofill, auto-advance and backspace handled from the value itself.",
  },
  argTypes: {
    length: { control: "number" },
    mode: { control: "inline-radio", options: ["numeric", "alphanumeric"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
} satisfies Meta<typeof InputCode>;

export const PreviewInputCodeStory: ThisStory = {
  name: "InputCode Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: { "aria-label": "Code", length: 6, mode: "numeric" },
  render: (args) => <InputCode {...args} />,
};

export const VariantsInputCodeStory: ThisStory = {
  name: "InputCode Variants",
  render: () => (
    <Story>
      <Story.Section title="States">
        {neutralAndAccents.map((accent) => (
          <Story.SubSection
            key={accent}
            withSurface
            title={accent}
            accent={accent}
          >
            <StateRow />
            <StateRow value="12" />
            <StateRow value="123456" />
          </Story.SubSection>
        ))}
      </Story.Section>

      <Story.Section title="Lengths">
        <Story.SubSection title="4">
          <InputCode aria-label="4 digits" length={4} defaultValue="12" />
        </Story.SubSection>
        <Story.SubSection title="6 (default)">
          <InputCode aria-label="6 digits" defaultValue="123" />
        </Story.SubSection>
        <Story.SubSection title="8">
          <InputCode aria-label="8 digits" length={8} defaultValue="1234" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Modes">
        <Story.SubSection title="numeric (default)">
          <InputCode aria-label="Numeric" defaultValue="0192" />
        </Story.SubSection>
        <Story.SubSection title="alphanumeric">
          <InputCode
            aria-label="Alphanumeric"
            mode="alphanumeric"
            defaultValue="A1B2"
          />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="Controlled">
        <ControlledInputCode />
      </Story.Section>

      <Story.Section title="In a form">
        <InputCodeFormDemo />
      </Story.Section>
    </Story>
  ),
};

function cellsOf(input: HTMLElement): HTMLElement {
  const cells = input.parentElement?.querySelector('[aria-hidden="true"]');
  if (!(cells instanceof HTMLElement)) throw new Error("cells row not found");
  return cells;
}

// The drawn caret is the one element running the `caret-blink` animation.
function caretOf(cells: HTMLElement): Element | undefined {
  return [...cells.querySelectorAll("div")].find(
    (element) => getComputedStyle(element).animationName === "caret-blink",
  );
}

export const TestsInputCodeStory: ThisStory = {
  name: "InputCode Tests",
  args: { onValueChange: fn(), onComplete: fn() },
  render: (args) => (
    <Story noDarkMode>
      <Story.Section title="Numeric">
        <InputCode aria-label="Code" {...args} />
      </Story.Section>
      <Story.Section title="Alphanumeric">
        <InputCode aria-label="Alpha code" mode="alphanumeric" length={4} />
      </Story.Section>
      <Story.Section title="Invalid">
        <InputCode invalid aria-label="Invalid code" defaultValue="12" />
      </Story.Section>
      <Story.Section title="Disabled">
        <InputCode disabled aria-label="Disabled code" defaultValue="12" />
      </Story.Section>
      <Story.Section title="Form">
        <InputCodeFormDemo />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // One accessible textbox, set up for the OS to autofill the SMS code; the
    // cells only display it and are hidden from assistive tech.
    const input = canvas.getByLabelText("Code");
    await expect(input).toHaveAttribute("autocomplete", "one-time-code");
    await expect(input).toHaveAttribute("inputmode", "numeric");
    await expect(input).toHaveAttribute("aria-invalid", "false");
    const cells = cellsOf(input);
    await expect(cells.children).toHaveLength(6);

    // The input covers the row: a tap on any cell lands on it.
    const firstCellRect = cells.children[0]!.getBoundingClientRect();
    await expect(
      document.elementFromPoint(
        firstCellRect.left + 10,
        firstCellRect.top + 10,
      ),
    ).toBe(input);

    // Typing keeps the alphabet only and fills the cells in order.
    await userEvent.type(input, "12a3");
    await expect(input).toHaveValue("123");
    await expect(cells.children[2]).toHaveTextContent("3");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("123");
    await expect(args.onComplete).not.toHaveBeenCalled();

    // The caret sits in the next empty cell while the input holds the focus.
    await expect(input).toHaveFocus();
    const caret = caretOf(cells);
    await expect(caret).toBeDefined();
    await expect(cells.children[3]!.contains(caret!)).toBe(true);

    // Backspace clears the last cell and the caret steps back.
    await userEvent.keyboard("{Backspace}");
    await expect(input).toHaveValue("12");
    await expect(cells.children[2]).toHaveTextContent("");
    await expect(cells.children[2]!.contains(caretOf(cells)!)).toBe(true);

    // No caret once the focus leaves; back when it returns.
    await userEvent.tab();
    await expect(input).not.toHaveFocus();
    await expect(caretOf(cells)).toBeUndefined();
    await userEvent.click(input);
    await expect(caretOf(cells)).toBeDefined();

    // A pasted code is cleaned of separators and cut to the length, and the
    // last cell filled reports the full code once.
    await userEvent.paste("34 56-78");
    await expect(input).toHaveValue("123456");
    await expect(args.onComplete).toHaveBeenCalledTimes(1);
    await expect(args.onComplete).toHaveBeenCalledWith("123456");
    await expect(caretOf(cells)).toBeUndefined();

    // The caret is pinned to the end: a move into the middle is undone, so the
    // next character still goes to the last cell — and completes again.
    await userEvent.keyboard("{Backspace}");
    await expect(input).toHaveValue("12345");
    (input as HTMLInputElement).setSelectionRange(1, 1);
    await waitFor(async () => {
      await expect((input as HTMLInputElement).selectionStart).toBe(5);
    });
    await userEvent.keyboard("6");
    await expect(input).toHaveValue("123456");
    await expect(args.onComplete).toHaveBeenCalledTimes(2);

    // Alphanumeric uppercases and drops anything outside [0-9A-Z].
    const alpha = canvas.getByLabelText("Alpha code");
    await userEvent.type(alpha, "a1-b2c");
    await expect(alpha).toHaveValue("A1B2");

    // An invalid code says so, and its cells leave the neutral border for the
    // danger one.
    const invalidInput = canvas.getByLabelText("Invalid code");
    await expect(invalidInput).toHaveAttribute("aria-invalid", "true");
    await expect(
      getComputedStyle(cellsOf(invalidInput).children[0]!).borderTopColor,
    ).not.toBe(getComputedStyle(cells.children[0]!).borderTopColor);

    const disabledInput = canvas.getByLabelText("Disabled code");
    await expect(disabledInput).toHaveAttribute("aria-disabled", "true");
    await expect(disabledInput).toHaveAttribute("readonly");

    // In a form: FormItem's state reaches the input, and the label focuses it.
    const formInput = canvas.getByLabelText("Verification code");
    await expect(formInput).toHaveAttribute("aria-required", "true");
    await userEvent.click(formInput);
    await userEvent.tab();
    await expect(canvas.getByText("Enter the 6-digit code.")).toBeVisible();
    await expect(formInput).toHaveAttribute("aria-invalid", "true");
    await userEvent.click(canvas.getByText("Verification code"));
    await expect(formInput).toHaveFocus();
    await userEvent.keyboard("123456");
    await expect(formInput).toHaveValue("123456");
    await expect(formInput).toHaveAttribute("aria-invalid", "false");
  },
};
