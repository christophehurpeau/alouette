import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";
import { Text } from "../primitives/Text";
import { HStack, VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { IconButton } from "./IconButton";

type ThisStory = StoryObj<typeof IconButton>;

export default {
  title: "alouette/Actions/IconButton",
  component: IconButton,
  parameters: {
    componentSubtitle:
      "A standardized circular icon button with consistent touch targets, visual feedback, and accessibility",
    docs: {
      description: {
        component: `### Variants
- \`size\`: \`sm\` | \`md\` | any number (custom diameter px)
- \`iconSize\`: \`"fill"\` makes the icon fill 80% of the button (default 50%)
- \`variant\`: contained | outlined | ghost-contained | ghost-outlined
- Wrap in \`<AccentTheme accent="brand"/>\` (or any accent: brand|info|success|warning|danger) to switch the interactive token set; it composes with current light/dark mode`,
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export const PreviewIconButtonStory: ThisStory = {
  args: {
    size: "md",
    "aria-label": "Go back",
  },
  render: (args) => <IconButton {...args} icon={<ArrowLeftRegularIcon />} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Sizes">
        <StoryGrid.Row>
          {([24, 40] as const).map((size) => (
            <StoryGrid.Col key={size} title={String(size)}>
              <IconButton
                size={size}
                icon={<ArrowLeftRegularIcon />}
                aria-label="Go back"
              />
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface title="Variants">
        {[undefined, ...accents].map((accent) => (
          <Story.SubSection
            key={accent || "default"}
            title={accent ?? "default"}
            accent={accent}
          >
            <StoryGrid.Row>
              {(
                [
                  undefined,
                  "ghost",
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
                  <VStack className="gap-xs">
                    {(["contained", "outlined"] as const).map((variant) => (
                      <HStack key={variant} className="gap-xs items-center">
                        <IconButton
                          ghost={state === "ghost"}
                          variant={variant}
                          disabled={state === "disabled"}
                          forceStyle={
                            state === "disabled" || state === "ghost"
                              ? undefined
                              : state
                          }
                          icon={<ArrowLeftRegularIcon />}
                          aria-label="Go back"
                        />
                        <Text className="text-xs">
                          {variant} {state === "ghost" ? "ghost" : ""}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
          </Story.SubSection>
        ))}
      </Story.Section>
    </Story>
  ),
};
