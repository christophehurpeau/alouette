import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "@tamagui/core";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons";
import { Box } from "../containers/Box";
import { VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
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
          theme="primary"
          icon={<ArrowLeftRegularIcon />}
          text="Example"
        />
      }
    >
      <Story.Section title="Sizes">
        <StoryGrid.Row flexWrap>
          {(["sm", "md"] as const).map((size) => (
            <StoryGrid.Col key={size}>
              <Button
                variant="contained"
                size={size}
                icon={<ArrowLeftRegularIcon />}
                text={size}
              />
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Variants">
        {(["light", "dark"] as const).map((mainTheme) => (
          <Theme key={mainTheme} name={mainTheme}>
            {(["primary", "info", "success", "warning", "danger"] as const).map(
              (theme) => (
                <Story.SubSection
                  key={theme}
                  withBackground
                  title={`${mainTheme}_${theme}`}
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
                      ] as const
                    ).map((state) => (
                      <StoryGrid.Col
                        key={state || "default"}
                        title={state || "default"}
                      >
                        <VStack gap="$2" padding="$1">
                          {(
                            [
                              "contained",
                              "outlined",
                              "elevated",
                              "ghost-contained",
                              "ghost-outlined",
                            ] as const
                          ).map((variant) => (
                            <Box
                              key={variant}
                              theme={theme}
                              withBackground={variant === "ghost-contained"}
                            >
                              <Button
                                disabled={state === "disabled"}
                                variant={variant}
                                internalForcedPseudoState={
                                  state === "disabled" ? undefined : state
                                }
                                icon={<ArrowLeftRegularIcon />}
                                text={variant}
                              />
                            </Box>
                          ))}
                        </VStack>
                      </StoryGrid.Col>
                    ))}
                  </StoryGrid.Row>
                </Story.SubSection>
              ),
            )}
          </Theme>
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
