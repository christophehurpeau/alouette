import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../typography/Typography";
import { View } from "./View";

export default {
  title: "alouette/Primitives/View",
  component: View,
  parameters: {
    componentSubtitle:
      "A foundational layout component that provides a flexible container with responsive capabilities",
    docs: {
      description: {
        component: `
### Features
- Responsive layout support
- Flexible sizing and positioning
- Platform-agnostic container
- Style prop support
- Media query breakpoints

### Variants
- \`width\`: Container width
- \`height\`: Container height
- \`flex\`: Flex properties
- \`$breakpoint\`: Responsive styles for different screen sizes

### Guidelines
- Use for basic layout containers
- Prefer semantic components when available
- Keep nesting levels minimal
- Consider responsive breakpoints
- Use semantic HTML when possible

### Usage
~~~tsx
// Basic container
<View padding={10}>
  <Typography>Content</Typography>
</View>

// Responsive width
<View
  width={200}
  $medium={{ width: 400 }}
  $large={{ width: 600 }}
>
  <Typography>Responsive Content</Typography>
</View>
~~~`,
      },
    },
  },
} satisfies Meta<typeof View>;

export const ViewStory: StoryObj = {
  name: "View",
  render: () => (
    <>
      <View>
        <Typography>This is a view</Typography>
      </View>
      <View width={50} $medium={{ width: 80 }}>
        <Typography>
          This is another view with a width of "base": 50px "medium": 80px
        </Typography>
      </View>
    </>
  ),
};
