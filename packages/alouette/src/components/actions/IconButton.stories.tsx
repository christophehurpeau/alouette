import type { Meta, StoryObj } from "@storybook/react";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { IconButton } from "./IconButton";

type ThisStory = StoryObj<typeof IconButton>;

export default {
  title: "alouette/Actions/IconButton",
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export const IconButtonStory: ThisStory = {
  name: "IconButton",
  render: () => (
    <Story
      preview={<IconButton theme="dark" icon={<ArrowLeftRegularIcon />} />}
    >
      <Story.Section title="Size">
        <StoryGrid.Row>
          {([24, 40] as const).map((size) => (
            <StoryGrid.Col key={size} title={size.toString()}>
              <IconButton size={size} icon={<ArrowLeftRegularIcon />} />
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Variants">
        {(
          [
            "dark",
            "light",
            "primary",
            "info",
            "success",
            "warning",
            "danger",
          ] as const
        ).map((theme) => (
          <Story.SubSection
            key={theme}
            withBackground
            title={theme}
            theme={theme}
          >
            <StoryGrid.Row>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <IconButton
                    theme={theme}
                    disabled={state === "disabled"}
                    internalForcedPseudoState={
                      state === "disabled" ? undefined : state
                    }
                    icon={<ArrowLeftRegularIcon />}
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
