import { expect, fn, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { InputPassword, type InputPasswordProps } from "./InputPassword";

type ThisStory = StoryObj<typeof InputPassword>;

type ForcedState = NonNullable<InputPasswordProps["forceStyle"]>;
type InputState = ForcedState | "disabled" | "invalid";

function StateCol({
  state,
  ...props
}: Pick<InputPasswordProps, "defaultVisible" | "value"> & {
  state: InputState | undefined;
}): ReactNode {
  if (state === "disabled") {
    return (
      <StoryGrid.Col title="disabled">
        <InputPassword disabled {...props} />
      </StoryGrid.Col>
    );
  }
  if (state === "invalid") {
    return (
      <StoryGrid.Col title="invalid">
        <InputPassword invalid {...props} />
      </StoryGrid.Col>
    );
  }
  return (
    <StoryGrid.Col title={state ?? "Default"}>
      <InputPassword forceStyle={state} {...props} />
    </StoryGrid.Col>
  );
}

function StateRow(
  props: Pick<InputPasswordProps, "defaultVisible" | "value">,
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
  title: "alouette/Inputs/InputPassword",
  component: InputPassword,
  parameters: {
    componentSubtitle:
      "Password field with an eye toggle in its end slot to show what was typed.",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    defaultVisible: { control: "boolean" },
    toggleLabel: { control: "text" },
  },
} satisfies Meta<typeof InputPassword>;

export const InputPasswordPreviewStory: ThisStory = {
  name: "InputPassword Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: { placeholder: "Password" },
  render: (args) => <InputPassword {...args} />,
};

export const InputPasswordVariantsStory: ThisStory = {
  name: "InputPassword Variants",
  render: () => (
    <Story>
      <Story.Section title="Hidden">
        <StateRow value="hunter2hunter2" />
      </Story.Section>
      <Story.Section title="Shown">
        <StateRow defaultVisible value="hunter2hunter2" />
      </Story.Section>
      <Story.Section title="Empty">
        <Story.SubSection title="Placeholder">
          <InputPassword placeholder="Password" />
        </Story.SubSection>
        <Story.SubSection title="Sign-up: a new password">
          <InputPassword autoComplete="new-password" />
        </Story.SubSection>
        <Story.SubSection title="Translated toggle">
          <InputPassword toggleLabel="Afficher le mot de passe" />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

function ControlledDemo({
  onVisibleChange,
}: Pick<InputPasswordProps, "onVisibleChange">): ReactNode {
  return (
    <InputPassword
      aria-label="Controlled"
      toggleLabel="Show controlled password"
      visible={false}
      onVisibleChange={onVisibleChange}
    />
  );
}

export const InputPasswordTestsStory: ThisStory = {
  name: "InputPassword Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Toggle">
        <InputPassword aria-label="Password" defaultValue="hunter2" />
      </Story.Section>
      <Story.Section title="Disabled">
        <InputPassword
          disabled
          aria-label="Disabled password"
          toggleLabel="Show disabled password"
          defaultValue="hunter2"
        />
      </Story.Section>
      <Story.Section title="Controlled">
        <ControlledDemo onVisibleChange={fn()} />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Password");
    const toggle = canvas.getByRole("button", { name: "Show password" });
    await expect(input).toHaveAttribute("type", "password");
    await expect(input).toHaveAttribute("autocomplete", "current-password");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    // react-native-web emits `type` only for a secure or typed entry: a plain
    // text input has none.
    await userEvent.click(toggle);
    await expect(input).not.toHaveAttribute("type");
    await expect(input).toHaveValue("hunter2");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute("type", "password");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    // Disabled: the toggle is disabled with the field.
    const disabledToggle = canvas.getByRole("button", {
      name: "Show disabled password",
    });
    await expect(disabledToggle).toHaveAttribute("aria-disabled", "true");
    await expect(canvas.getByLabelText("Disabled password")).toBeDisabled();

    // Controlled: the press only reports, the field stays hidden.
    const controlled = canvas.getByLabelText("Controlled");
    const controlledToggle = canvas.getByRole("button", {
      name: "Show controlled password",
    });
    await userEvent.click(controlledToggle);
    await expect(controlled).toHaveAttribute("type", "password");
    await expect(controlledToggle).toHaveAttribute("aria-pressed", "false");
  },
};
