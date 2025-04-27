import type { Meta, StoryObj } from "@storybook/react";
import { Story } from "../story-components/Story.tsx";
import { Typography } from "../typography/Typography.tsx";
import { PressableBox } from "./PressableBox.tsx";

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
    children: <Typography contrast>Pressable</Typography>,
  },
  render: (args) => <PressableBox {...args} />,
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="With Background">
        <PressableBox withBackground role="button" theme="primary" padding="$4">
          <Typography contrast>With Background</Typography>
        </PressableBox>
      </Story.Section>
    </Story>
  ),
};
