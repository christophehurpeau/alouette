import type { Meta, StoryObj } from "@storybook/react-vite";
import { isWeb } from "@tamagui/core";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Switch } from "./Switch";

export default {
  title: "alouette/Inputs/Switch",
  component: Switch,
  parameters: {
    componentSubtitle: "A switch input for toggling between two states",
  },
  argTypes: {
    disabled: {
      description: "Whether the input is disabled",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    checked: {
      description: "The controlled checked state of the input",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Switch>;

export const PreviewSwitchStory: StoryObj<typeof Switch> = {
  render: (args) => <Switch {...args} />,
};

export const Variants: StoryObj<typeof Switch> = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        {([undefined, "brand", "danger", "success"] as const).map((theme) => (
          <Story.SubSection
            key={theme}
            withSurface
            title={theme ?? "Default"}
            theme={theme}
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
                    {...(theme ? { theme } : {})}
                    disabled={state === "disabled"}
                    {...(isWeb
                      ? ({
                          forceStyle: state === "disabled" ? undefined : state,
                        } as any)
                      : {})}
                    {...(state === "checked" ? { checked: true } : {})}
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
          </Story.SubSection>
        ))}
      </Story.Section>

      {/* <Story.Section title="Checked theme">
        <Switch value checkedTheme="success" />
      </Story.Section> */}
    </Story>
  ),
};
