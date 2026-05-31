import { expect, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
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
  render: (args) => <Switch {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Variants">
        {([undefined, "brand", "danger", "success"] as const).map(
          (semanticRole) => (
            <Story.SubSection
              key={semanticRole || "default"}
              withSurface
              title={semanticRole ?? "Default"}
              semanticRole={semanticRole}
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
                  ] as const
                ).map((state) => (
                  <StoryGrid.Col
                    key={state || "default"}
                    title={state || "default"}
                  >
                    <Switch
                      disabled={state === "disabled"}
                      {...(process.env.EXPO_OS === "web"
                        ? ({
                            forceStyle:
                              state === "disabled" ? undefined : state,
                          } as any)
                        : {})}
                      {...(state === "checked" ? { checked: true } : {})}
                    />
                  </StoryGrid.Col>
                ))}
              </StoryGrid.Row>
            </Story.SubSection>
          ),
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
    await expect(uncontrolledSwitch.tagName).toBe("BUTTON");
    await expect(uncontrolledSwitch).toHaveAttribute("type", "button");
    await expect(uncontrolledSwitch).toHaveAttribute("role", "switch");
    await expect(uncontrolledSwitch).toHaveAttribute("aria-checked", "false");

    uncontrolledSwitch.click();

    await waitFor(() =>
      expect(uncontrolledSwitch).toHaveAttribute("aria-checked", "true"),
    );

    const uncheckedSwitch = canvas.getByTestId("unchecked");
    await expect(uncheckedSwitch).toBeInTheDocument();
    await expect(uncheckedSwitch.tagName).toBe("BUTTON");
    await expect(uncheckedSwitch).toHaveAttribute("type", "button");
    await expect(uncheckedSwitch).toHaveAttribute("role", "switch");
    await expect(uncheckedSwitch).toHaveAttribute("aria-checked", "false");

    uncheckedSwitch.click();

    await expect(uncheckedSwitch).toHaveAttribute("aria-checked", "false");

    const checkedSwitch = canvas.getByTestId("checked");
    await expect(checkedSwitch).toBeInTheDocument();
    await expect(checkedSwitch.tagName).toBe("BUTTON");
    await expect(checkedSwitch).toHaveAttribute("type", "button");
    await expect(checkedSwitch).toHaveAttribute("role", "switch");
    await expect(checkedSwitch).toHaveAttribute("aria-checked", "true");

    checkedSwitch.click();

    await expect(checkedSwitch).toHaveAttribute("aria-checked", "true");
  },
};
