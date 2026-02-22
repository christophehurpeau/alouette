import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
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
  <Text>Content</Text>
</View>

// Responsive width
<View
  width={200}
  $medium={{ width: 400 }}
  $large={{ width: 600 }}
>
  <Text>Responsive Content</Text>
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
        <Text>This is a view</Text>
      </View>
      <View width={50} $medium={{ width: 80 }}>
        <Text>
          This is another view with a width of "base": 50px "medium": 80px
        </Text>
      </View>
    </>
  ),
};
