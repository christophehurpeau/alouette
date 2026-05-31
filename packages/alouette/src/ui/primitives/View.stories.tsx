import type { Meta, StoryObj } from "@storybook/react-vite";
import { Story } from "../story-components/Story";
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
        component: `### Features
- Responsive layout via Tailwind breakpoint prefixes (sm:, md:, lg:, xl:)
- Flexible sizing and positioning via className
- Platform-agnostic container (RN View)

### Usage
~~~tsx
// Basic container
<View className="p-xs">
  <Text>Content</Text>
</View>

// Responsive width
<View className="w-[200px] md:w-[400px] lg:w-[600px]">
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
    <Story>
      <Story.Section title="Basic">
        <View>
          <Text>This is a view</Text>
        </View>
      </Story.Section>

      <Story.Section title="Responsive width">
        <View className="w-[50px] md:w-[80px] lg:w-[120px]">
          <Text>Width: 50px (base), 80px (md), 120px (lg)</Text>
        </View>
      </Story.Section>
    </Story>
  ),
};
