import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Surface } from "../containers/Surface";
import { Story } from "../story-components/Story";
import { ScrollView } from "./ScrollView";
import { Text } from "./Text";
import { View } from "./View";

export default {
  title: "alouette/Primitives/ScrollView",
  component: ScrollView,
  parameters: {
    componentSubtitle:
      "A scrollable container (RN ScrollView) with className support for the scroll view and its content container",
    docs: {
      description: {
        component: `### Features
- Vertical (default) or horizontal scrolling via \`horizontal\`
- NativeWind \`className\` maps to \`style\` (the scroll view frame: size, border, background)
- NativeWind \`contentContainerClassName\` maps to \`contentContainerStyle\` (the scrolled content: padding, gap, alignment)

### Usage
~~~tsx
<ScrollView className="h-70" contentContainerClassName="p-md gap-sm">
  <Text>Content</Text>
</ScrollView>
~~~`,
      },
    },
  },
} satisfies Meta<typeof ScrollView>;

interface RowProps {
  label: string;
}

function Row({ label }: RowProps): ReactNode {
  return (
    <Surface className="p-sm">
      <Text className="text-base">{label}</Text>
    </Surface>
  );
}

interface RowsProps {
  count: number;
}

function Rows({ count }: RowsProps): ReactNode {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Row key={index} label={`Item ${index + 1}`} />
      ))}
    </>
  );
}

export const PreviewStory: StoryObj = {
  name: "ScrollView Preview",
  render: () => (
    <ScrollView className="h-70" contentContainerClassName="gap-xxs">
      <Rows count={12} />
    </ScrollView>
  ),
};

export const VariantsStory: StoryObj = {
  name: "ScrollView",
  render: () => (
    <Story>
      <Story.Section title="Vertical (className sizes the frame)">
        <ScrollView
          className="h-50 border"
          contentContainerClassName="p-xs gap-xxs"
        >
          <Rows count={12} />
        </ScrollView>
      </Story.Section>

      <Story.Section title="Horizontal">
        <ScrollView horizontal contentContainerClassName="p-xs gap-xxs">
          {Array.from({ length: 12 }, (_, index) => (
            <View key={index} className="w-30">
              <Row label={`Item ${index + 1}`} />
            </View>
          ))}
        </ScrollView>
      </Story.Section>
    </Story>
  ),
};
