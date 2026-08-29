import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { SafeAreaScope } from "../../core/SafeAreaEdgesContext";
import { Surface } from "../containers/Surface";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { ScreenScrollView } from "./ScreenScrollView";

export default {
  title: "alouette/Layout/ScreenScrollView",
  component: ScreenScrollView,
  parameters: {
    componentSubtitle:
      "A screen-filling ScrollView: bg-screen frame, growing content, safe-area insets as content padding",
    docs: {
      description: {
        component: `### Features
- \`bg-screen min-h-full\` frame and a \`grow\` content container, both extendable through \`className\` / \`contentContainerClassName\` (merged with tailwind-merge)
- Safe-area insets applied to the **content**, so the background bleeds under the system bars while the content clears them
- Edges default to everything an ancestor \`SafeAreaScope\` has not declared consumed; \`edges\` overrides them per screen
- Insets are native-only: \`useSafeAreaInsets\` is stubbed to zeros on web

### Usage
~~~tsx
<ScreenScrollView contentContainerClassName="p-m gap-m">
  <Text>Content</Text>
</ScreenScrollView>

{/* under a navigation header that already applies the top inset */}
<SafeAreaScope consumedEdges={["top"]}>
  <ScreenScrollView>…</ScreenScrollView>
</SafeAreaScope>

{/* or explicitly, ignoring the scope */}
<ScreenScrollView edges={["bottom"]}>…</ScreenScrollView>
~~~`,
      },
    },
  },
} satisfies Meta<typeof ScreenScrollView>;

interface RowsProps {
  count: number;
}

function Rows({ count }: RowsProps): ReactNode {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Surface key={index} className="p-sm">
          <Text className="text-base">{`Item ${index + 1}`}</Text>
        </Surface>
      ))}
    </>
  );
}

export const PreviewStory: StoryObj = {
  name: "ScreenScrollView Preview",
  render: () => (
    <View className="h-70">
      <ScreenScrollView contentContainerClassName="p-m gap-xxs">
        <Rows count={12} />
      </ScreenScrollView>
    </View>
  ),
};

export const VariantsStory: StoryObj = {
  name: "ScreenScrollView",
  render: () => (
    <Story>
      <Story.Section title="Default (every unconsumed edge)">
        <View className="h-50">
          <ScreenScrollView contentContainerClassName="p-m gap-xxs">
            <Rows count={8} />
          </ScreenScrollView>
        </View>
      </Story.Section>

      <Story.Section title="Explicit edges (bottom only)">
        <View className="h-50">
          <ScreenScrollView
            edges={["bottom"]}
            contentContainerClassName="p-m gap-xxs"
          >
            <Rows count={8} />
          </ScreenScrollView>
        </View>
      </Story.Section>

      <Story.Section title="Under a header — SafeAreaScope consumes the top">
        <SafeAreaScope consumedEdges={["top"]}>
          <View className="h-50">
            <ScreenScrollView contentContainerClassName="p-m gap-xxs">
              <Rows count={8} />
            </ScreenScrollView>
          </View>
        </SafeAreaScope>
      </Story.Section>

      <Story.Section title="Frame background overridden">
        <View className="h-50">
          <ScreenScrollView
            className="bg-surface"
            contentContainerClassName="p-m gap-xxs"
          >
            <Rows count={8} />
          </ScreenScrollView>
        </View>
      </Story.Section>
    </Story>
  ),
};

export const Tests: StoryObj = {
  name: "ScreenScrollView Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Composed defaults">
        <View aria-label="screen reference" className="bg-screen h-4" />
        <View aria-label="surface reference" className="bg-surface h-4" />
        <View className="h-50">
          <ScreenScrollView
            aria-label="default screen"
            contentContainerClassName="p-m gap-xxs"
          >
            <Rows count={8} />
          </ScreenScrollView>
        </View>
        <View className="h-50">
          <ScreenScrollView
            aria-label="custom background screen"
            className="bg-surface"
          >
            <Rows count={2} />
          </ScreenScrollView>
        </View>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const backgroundOf = (label: string): string =>
      getComputedStyle(canvas.getByLabelText(label)).backgroundColor;

    const frame = canvas.getByLabelText("default screen");
    const contentContainer = frame.firstElementChild;
    if (!contentContainer) {
      throw new Error("ScreenScrollView rendered no content container");
    }

    await expect(getComputedStyle(contentContainer).flexGrow).toBe("1");
    await expect(backgroundOf("default screen")).toBe(
      backgroundOf("screen reference"),
    );
    await expect(backgroundOf("custom background screen")).toBe(
      backgroundOf("surface reference"),
    );
  },
};
