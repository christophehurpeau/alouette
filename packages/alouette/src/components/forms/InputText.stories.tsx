import type { Meta, StoryObj } from "@storybook/react";
import { Story } from "../story-components/Story";
import { InputText } from "./InputText";
import { StoryGrid } from "../story-components/StoryGrid";

export default {
  title: "alouette/forms/InputText",
  component: InputText,
} satisfies Meta<unknown>;

export const InputTextStory: StoryObj = {
  name: "InputText",
  render: () => (
    <Story preview={<InputText />}>
      <Story.Section title="Variants">
        {(
          [
            "light_primary",
            "light_danger",
            "light_success",
            "dark_primary",
          ] as const
        ).map((theme) => (
          <Story.SubSection
            key={theme}
            title={theme}
            theme={theme}
            withBackground
          >
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <InputText
                    theme={theme}
                    disabled={state === "disabled"}
                    internalForcedPseudoState={
                      state === "disabled" ? undefined : state
                    }
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <InputText
                    theme={theme}
                    disabled={state === "disabled"}
                    internalForcedPseudoState={
                      state === "disabled" ? undefined : state
                    }
                    placeholder="Placeholder"
                  />
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
          </Story.SubSection>
        ))}
      </Story.Section>
    </Story>
  ),
};
