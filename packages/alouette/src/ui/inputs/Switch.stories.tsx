import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story, neutralAndAccents } from "../story-components/Story";
import { StoryGrid, stateTitle } from "../story-components/StoryGrid";
import { Switch } from "./Switch";

type ThisStory = StoryObj<typeof Switch>;

export default {
  title: "alouette/Inputs/Switch",
  component: Switch,
  parameters: {
    componentSubtitle:
      "Toggle switch with platform-native rendering on iOS/Android.",
  },
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export const PreviewSwitchStory: ThisStory = {
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  render: (args) => <Switch {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        {neutralAndAccents.map((accent) =>
          [false, true].map((onAccentSurface) => (
            <Story.SubSection
              key={accent}
              withSurface
              title={accent + (onAccentSurface ? " (on accent surface)" : "")}
              accent={onAccentSurface ? accent : undefined}
            >
              <StoryGrid.Row flexWrap>
                {(
                  [
                    undefined,
                    "hover",
                    "focus",
                    "press",
                    "disabled",
                    "checked",
                    "disabled:checked",
                  ] as const
                ).map((state) => (
                  <StoryGrid.Col key={state} title={stateTitle(state)}>
                    <Switch
                      accent={accent}
                      disabled={
                        state === "disabled" || state === "disabled:checked"
                      }
                      {...(process.env.EXPO_OS === "web"
                        ? ({
                            forceStyle:
                              state === "disabled" ||
                              state === "disabled:checked"
                                ? undefined
                                : state,
                          } as any)
                        : {})}
                      {...(state === "checked" || state === "disabled:checked"
                        ? { checked: true }
                        : {})}
                    />
                  </StoryGrid.Col>
                ))}
              </StoryGrid.Row>
            </Story.SubSection>
          )),
        )}
      </Story.Section>
    </Story>
  ),
};

export const Tests: StoryObj<typeof Switch> = {
  name: "Switch Tests",
  render() {
    return (
      <Story noDarkMode>
        <Story.Section title="Uncontrolled">
          <Switch testID="uncontrolled" />
        </Story.Section>
        <Story.Section title="State">
          <Switch checked={false} testID="unchecked" />
          <Switch checked testID="checked" />
        </Story.Section>
      </Story>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const uncontrolledSwitch = canvas.getByTestId("uncontrolled");
    await expect(uncontrolledSwitch).toBeInTheDocument();
    // react-native-web maps no element to the switch role: https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/modules/AccessibilityUtil/propsToAccessibilityComponent.js
    await expect(uncontrolledSwitch.tagName).toBe("DIV");
    await expect(uncontrolledSwitch).toHaveAttribute("role", "switch");
    await expect(uncontrolledSwitch).toHaveAttribute("aria-checked", "false");

    uncontrolledSwitch.click();

    await waitFor(() =>
      expect(uncontrolledSwitch).toHaveAttribute("aria-checked", "true"),
    );

    const uncheckedSwitch = canvas.getByTestId("unchecked");
    await expect(uncheckedSwitch).toBeInTheDocument();
    await expect(uncheckedSwitch).toHaveAttribute("role", "switch");
    await expect(uncheckedSwitch).toHaveAttribute("aria-checked", "false");

    uncheckedSwitch.click();

    await expect(uncheckedSwitch).toHaveAttribute("aria-checked", "false");

    const checkedSwitch = canvas.getByTestId("checked");
    await expect(checkedSwitch).toBeInTheDocument();
    await expect(checkedSwitch).toHaveAttribute("role", "switch");
    await expect(checkedSwitch).toHaveAttribute("aria-checked", "true");

    checkedSwitch.click();

    await expect(checkedSwitch).toHaveAttribute("aria-checked", "true");

    // Keyboard focus (focus-visible) rings the track, not the oversized
    // pressable that holds the focus. A programmatic focus() counts as
    // keyboard input for `:focus-visible`.
    const track = uncontrolledSwitch.firstElementChild;
    if (!(track instanceof HTMLElement)) throw new Error("No switch track");
    uncontrolledSwitch.focus();
    await expect(uncontrolledSwitch).toHaveFocus();
    await expect(getComputedStyle(uncontrolledSwitch).outlineWidth).toBe("0px");
    await expect(getComputedStyle(track).outlineWidth).toBe("2px");
    await expect(getComputedStyle(track).outlineOffset).toBe("2px");
  },
};
