import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { HStack, VStack } from "../stacks/stacks";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { IconButton } from "./IconButton";

type ThisStory = StoryObj<typeof IconButton>;

export default {
  title: "alouette/Actions/IconButton",
  component: IconButton,
  parameters: {
    componentSubtitle:
      "A standardized way to create clickable icons with consistent touch targets, visual feedback, and accessibility",
    docs: {
      description: {
        component: `
### Implementation Details
- Flexible sizing, 40px is the standard size
- Circular shape with centered icon and equal padding
- Supports all semantic themes with appropriate contrast ratios
- Built-in state management for hover, focus, press, and disabled

### Technical Guidelines
- Required prop: icon (ReactNode from alouette-icons)
- Optional props: size (number), theme, variant, disabled
- aria-label must be provided when icon meaning isn't obvious
- Recommended minimum size of 40px for touch targets on mobile`,
      },
    },
  },
  argTypes: {
    icon: {
      description: "The icon to display (from alouette-icons)",
      control: "boolean",
    },
    size: {
      description: "Size of the button in pixels",
      control: "select",
      options: [24, 40],
      table: {
        defaultValue: { summary: "40" },
      },
    },
    variant: {
      description: "Visual style variant of the button",
      control: "select",
      options: [
        "contained",
        "outlined",
        "elevated",
        "ghost-contained",
        "ghost-outlined",
      ],
      table: {
        defaultValue: { summary: "contained" },
      },
    },
    theme: {
      description: "Theme color for the button",
      control: "select",
      options: ["brand", "info", "success", "warning", "danger"],
      table: {
        defaultValue: { summary: "brand" },
      },
    },
    disabled: {
      description: "Whether the button is disabled",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    "aria-label": {
      description: "Accessible label for the button",
      control: "text",
    },
  },
} satisfies Meta<typeof IconButton>;

export const PreviewIconButtonStory: ThisStory = {
  args: {
    theme: "brand",
    size: 40,
    "aria-label": "Go back",
  },
  render: (args) => <IconButton {...args} icon={<ArrowLeftRegularIcon />} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Size">
        <StoryGrid.Row>
          {([24, 40] as const).map((size) => (
            <StoryGrid.Col key={size} title={size.toString()}>
              <IconButton
                size={size}
                icon={<ArrowLeftRegularIcon />}
                aria-label="Go back"
              />
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Variants">
        {(
          [undefined, "brand", "info", "success", "warning", "danger"] as const
        ).map((theme) => (
          <Story.SubSection key={theme} title={theme ?? "Default"}>
            <StoryGrid.Row>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state || "default"}
                  title={state || "default"}
                >
                  <VStack gap="$0.5">
                    {(
                      [
                        "contained",
                        "outlined",
                        "ghost-contained",
                        "ghost-outlined",
                      ] as const
                    ).map((variant) => (
                      <HStack key={variant} gap="$0.5" alignItems="center">
                        <Box
                          theme={theme}
                          background={
                            variant === "ghost-contained"
                              ? "surface"
                              : undefined
                          }
                        >
                          <IconButton
                            variant={variant}
                            disabled={state === "disabled"}
                            forceStyle={
                              state === "disabled" ? undefined : state
                            }
                            icon={<ArrowLeftRegularIcon />}
                            aria-label="Go back"
                          />
                        </Box>
                        <Text size="$xs">{variant}</Text>
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
