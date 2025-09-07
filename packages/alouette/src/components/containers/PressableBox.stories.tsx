import type { Meta, StoryObj } from "@storybook/react-vite";
import { VStack } from "../primitives/stacks";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Typography } from "../typography/Typography";
import { Box } from "./Box";
import { PressableBox } from "./PressableBox";

type ThisStory = StoryObj<typeof PressableBox>;

export default {
  title: "alouette/Containers/Pressable",
  component: PressableBox,
  parameters: {
    componentSubtitle:
      "An interactive container component that provides press and hover states for custom interactive elements",
    docs: {
      description: {
        component: `
### Features
- Interactive press and hover states
- Customizable padding and spacing
- Support for keyboard interactions
- Accessible by default with proper roles
- Flexible content layout

### Variants
- \`withBackground\`: Enables background color
- \`withBorder\`: Adds border
- \`padding\`: Space around content
- \`borderRadius\`: Corner rounding
- \`role\`: ARIA role for accessibility

### Guidelines
- Always specify an appropriate ARIA role
- Use for custom interactive elements
- Consider hover and focus states
- Maintain sufficient touch target size
- Ensure proper contrast for content

### Usage
~~~tsx
<PressableBox
  role="button"
  withBackground
  padding="$4"
  onPress={handlePress}
>
  <Typography>Click Me</Typography>
</PressableBox>
~~~`,
      },
    },
  },
} satisfies Meta<typeof PressableBox>;

export const PreviewPressableBoxStory: ThisStory = {
  args: {
    role: "button",
    theme: "primary",
    withBackground: true,
    padding: "$4",
    children: <Typography>Pressable</Typography>,
  },
  render: (args) => <PressableBox {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="With Background">
        <PressableBox withBackground role="button" theme="primary" padding="$4">
          <Typography>With Background</Typography>
        </PressableBox>
      </Story.Section>

      <Story.Section title="Variants">
        {(["primary", "info", "success", "warning", "danger"] as const).map(
          (theme) => (
            <Story.SubSection key={theme} title={theme} theme={theme}>
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
                          <PressableBox
                            role="button"
                            borderRadius="$sm"
                            disabled={state === "disabled"}
                            variant={variant}
                            forceStyle={
                              state === "disabled" ? undefined : state
                            }
                          >
                            <Typography>{variant}</Typography>
                          </PressableBox>
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
    </Story>
  ),
};
