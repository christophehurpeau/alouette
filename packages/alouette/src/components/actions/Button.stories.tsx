import type { Meta, StoryObj } from "@storybook/react";
import { ArrowLeftRegularIcon } from "../../phosphor-icons";
import { StoryGrid } from "../story-components/StoryGrid";
import { Story } from "../story-components/Story";
import { Button } from "./Button";

type ThisStory = StoryObj<typeof Button>;

export default {
  title: "alouette/Actions/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export const ButtonStory: ThisStory = {
  name: "Button",
  render: () => (
    <Story
      preview={
        <Button
          theme="light_primary"
          icon={<ArrowLeftRegularIcon />}
          text="Example"
        />
      }
    >
      <Story.Section title="Variants">
        {(
          [
            "light_primary",
            "light_info",
            "light_success",
            "light_warning",
            "light_danger",
            "dark_primary",
            "dark_info",
            "dark_success",
            "dark_warning",
            "dark_danger",
          ] as const
        ).map((theme) => (
          <Story.SubSection
            key={theme}
            title={theme}
            theme={theme}
            withBackground
          >
            {(["contained", "outlined"] as const).map((variant) => (
              <StoryGrid.Row flexWrap>
                {(
                  [undefined, "hover", "focus", "press", "disabled"] as const
                ).map((state) => (
                  <StoryGrid.Col
                    key={state || "default"}
                    title={state || "default"}
                  >
                    <Button
                      theme={theme}
                      disabled={state === "disabled"}
                      variant={variant}
                      internalForcedPseudoState={
                        state === "disabled" ? undefined : state
                      }
                      icon={<ArrowLeftRegularIcon />}
                      text={variant}
                    />
                  </StoryGrid.Col>
                ))}
              </StoryGrid.Row>
            ))}
          </Story.SubSection>
        ))}
      </Story.Section>

      <Story.Section title="Edge Cases">
        <Story.SubSection title="No Icon">
          <Button theme="dark" text="Example" />
        </Story.SubSection>
        <Story.SubSection title="Very Long text">
          <Button
            theme="dark"
            icon={<ArrowLeftRegularIcon />}
            text="Very very very very very very very very very very very very very very very very very very very very very very very very very very very long text Example"
          />
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};
