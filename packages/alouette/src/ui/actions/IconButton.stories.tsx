import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftDuotoneIcon } from "alouette-icons/phosphor-icons/ArrowLeftDuotoneIcon";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";
import type { ReactNode } from "react";
import { Text } from "../primitives/Text";
import { HStack, VStack } from "../stacks/stacks";
import { Story, neutralAndAccents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { IconButton, type IconButtonProps } from "./IconButton";

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
- \`variant\`: contained | outlined | ghost | soft
- \`activeIcon\`: replaces \`icon\` while the button is hovered, focused or pressed — usually the duotone twin
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
  render: (args) => (
    <IconButton
      {...args}
      icon={<ArrowLeftRegularIcon />}
      activeIcon={<ArrowLeftDuotoneIcon />}
    />
  ),
};

interface BackIconButtonProps {
  forceStyle?: IconButtonProps["forceStyle"];
  /** Renders `icon` alone, so the glyph keeps one weight in every state. */
  withoutActiveIcon?: boolean;
}

function BackIconButton({
  forceStyle,
  withoutActiveIcon,
}: BackIconButtonProps): ReactNode {
  return (
    <IconButton
      forceStyle={forceStyle}
      icon={<ArrowLeftRegularIcon />}
      activeIcon={withoutActiveIcon ? undefined : <ArrowLeftDuotoneIcon />}
      aria-label="Go back"
    />
  );
}

function IconWeightRow({
  withoutActiveIcon,
}: Pick<BackIconButtonProps, "withoutActiveIcon">): ReactNode {
  return (
    <StoryGrid.Row>
      <StoryGrid.Col title="default">
        <BackIconButton withoutActiveIcon={withoutActiveIcon} />
      </StoryGrid.Col>
      <StoryGrid.Col title="hover">
        <BackIconButton
          forceStyle="hover"
          withoutActiveIcon={withoutActiveIcon}
        />
      </StoryGrid.Col>
      <StoryGrid.Col title="focus">
        <BackIconButton
          forceStyle="focus"
          withoutActiveIcon={withoutActiveIcon}
        />
      </StoryGrid.Col>
      <StoryGrid.Col title="press">
        <BackIconButton
          forceStyle="press"
          withoutActiveIcon={withoutActiveIcon}
        />
      </StoryGrid.Col>
    </StoryGrid.Row>
  );
}

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
                activeIcon={<ArrowLeftDuotoneIcon />}
                aria-label="Go back"
              />
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Icon weight">
        <Story.SubSection title="activeIcon">
          <IconWeightRow />
        </Story.SubSection>
        <Story.SubSection title="Without activeIcon">
          <IconWeightRow withoutActiveIcon />
        </Story.SubSection>
      </Story.Section>

      <Story.Section withSurface title="Variants">
        {neutralAndAccents.map((accent) => (
          <Story.SubSection key={accent} title={accent} accent={accent}>
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
                <StoryGrid.Col key={state} title={state}>
                  <VStack className="gap-xs">
                    {(["contained", "outlined", "ghost", "soft"] as const).map(
                      (variant) => (
                        <HStack key={variant} className="gap-xs items-center">
                          <IconButton
                            variant={variant}
                            disabled={state === "disabled"}
                            forceStyle={
                              state === "disabled" || state === "ghost"
                                ? undefined
                                : state
                            }
                            icon={<ArrowLeftRegularIcon />}
                            activeIcon={<ArrowLeftDuotoneIcon />}
                            aria-label="Go back"
                          />
                          <Text className="text-xs">
                            {variant} {state === "ghost" ? "ghost" : ""}
                          </Text>
                        </HStack>
                      ),
                    )}
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
