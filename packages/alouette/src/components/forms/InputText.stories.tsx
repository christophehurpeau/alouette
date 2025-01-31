import type { Meta, StoryObj } from "@storybook/react";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { InputText } from "./InputText";

export default {
  title: "alouette/forms/InputText",
  component: InputText,
} satisfies Meta<unknown>;

export const InputTextStory: StoryObj = {
  name: "InputText",
  render: () => (
    <Story preview={<InputText />}>
      <Story.Section title="Variants">
        {(["primary", "danger", "success"] as const).map((theme) => (
          <Story.SubSection
            key={theme}
            withBackground
            title={theme}
            theme={theme}
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
