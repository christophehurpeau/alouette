import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons";
import { Box } from "../containers/Box";
import { VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Button, ExternalLinkButton } from "./Button";

type ThisStory = StoryObj<typeof Button>;

export default {
  title: "alouette/Actions/Button",
  component: Button,
  parameters: {
    componentSubtitle:
      "A versatile button component that combines text and optional icons into a unified interactive element",
    docs: {
      description: {
        component: `
### Features
- Variants affect elevation, borders, and background fills
- Sizes: sm (32px height), md (40px height)
- Automatic spacing between icon and text
- Responsive padding based on content and size
- Accessible focus and hover states
- Support for loading and disabled states

### Variants
- \`variant\`: Visual style
  - \`contained\`: Solid background with high contrast
  - \`outlined\`: Border with transparent background
  - \`elevated\`: Added shadow for depth
  - \`ghost-contained\`: Transparent with hover effect
  - \`ghost-outlined\`: Transparent with border on hover
- \`size\`: Button dimensions (sm | md)
- \`theme\`: Color theme (primary | info | success | warning | danger)
- \`disabled\`: Disables button interaction
- \`loading\`: Shows loading state

### Usage
~~~tsx
// Basic button with icon
<Button
  theme="primary"
  icon={<ArrowLeftRegularIcon />}
  text="Back"
/>

// Outlined button with custom size
<Button
  variant="outlined"
  size="sm"
  theme="info"
  text="Small Action"
/>

// Ghost button in a themed container
<Box theme="primary" withBackground>
  <Button
    variant="ghost-contained"
    icon={<ArrowLeftRegularIcon />}
    text="Ghost Action"
  />
</Box>

// Disabled state
<Button
  variant="contained"
  theme="danger"
  disabled
  text="Cannot Click"
/>
~~~`,
      },
    },
  },
  argTypes: {
    text: {
      description: "The text content of the button",
      control: "text",
    },
    icon: {
      description:
        "Optional icon from alouette-icons to display before the text",
      control: { type: "boolean" },
    },
    size: {
      description: "Controls the size of the button",
      control: "select",
      options: ["sm", "md"],
      table: {
        defaultValue: { summary: "md" },
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
      options: ["primary", "info", "success", "warning", "danger"],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      description: "Whether the button is disabled",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Button>;

export const PreviewButtonStory: ThisStory = {
  args: {
    theme: "primary",
    text: "Example",
  },
  render: (args) => <Button {...args} icon={<ArrowLeftRegularIcon />} />,
};

export const VariantsStory: ThisStory = {
  name: "Variants",
  render: () => (
    <Story>
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
        {(["primary", "info", "success", "warning", "danger"] as const).map(
          (theme) => (
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
                            forceStyle={
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
      </Story.Section>

      <Story.Section title="External Link Button">
        <ExternalLinkButton
          href="https://storybook.js.org/"
          text="Open Storybook"
        />
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
