import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";

export default {
  title: "alouette/Feedback/Skeleton",
  parameters: {
    componentSubtitle:
      "The `skeleton` utility: a pulsing placeholder standing in for content still loading.",
    docs: {
      description: {
        component: `### Usage
~~~tsx
<View role="status" aria-label="Loading" className="gap-xs">
  <View className="skeleton h-[54px]" />
  <View className="skeleton h-[54px]" />
</View>
~~~

- \`skeleton\` is \`animate-pulse rounded-sm bg-lowered\`: size it with \`w-*\` / \`h-*\`, round it differently with a \`rounded-*\` written after it
- A bar announces nothing: the region it stands in for carries \`role="status"\` and an \`aria-label\`
- The pulse stops under reduced motion, like every alouette animation`,
      },
    },
  },
} satisfies Meta;

function SkeletonList() {
  return (
    <View className="gap-xs" role="status" aria-label="Loading list">
      <View className="skeleton h-[54px]" />
      <View className="skeleton h-[54px]" />
      <View className="skeleton h-[54px]" />
    </View>
  );
}

function SkeletonCard() {
  return (
    <Box
      className="surface surface-md gap-m"
      role="status"
      aria-label="Loading card"
    >
      <View className="skeleton h-[22px] w-2/5" />
      <View className="skeleton h-[16px] w-4/5" />
      <View className="skeleton h-[16px] w-3/5" />
    </Box>
  );
}

export const PreviewSkeletonStory: StoryObj = {
  name: "Skeleton Preview",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <SkeletonList />,
};

export const VariantsSkeletonStory: StoryObj = {
  name: "Skeleton Variants",
  render: () => (
    <Story>
      <Story.Section title="List rows">
        <SkeletonList />
      </Story.Section>
      <Story.Section title="Lines in a card">
        <SkeletonCard />
      </Story.Section>
      <Story.Section title="Avatar and lines">
        <View
          className="flex-row items-center gap-m"
          role="status"
          aria-label="Loading profile"
        >
          <View className="skeleton size-[48px] rounded-full" />
          <View className="flex-1 gap-xs">
            <View className="skeleton h-[16px] w-1/3" />
            <View className="skeleton h-[14px] w-1/2" />
          </View>
        </View>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [list] = canvas.getAllByRole("status", { name: "Loading list" });
    const bar = list?.firstElementChild;
    if (!bar) throw new Error("expected a skeleton bar");
    const style = getComputedStyle(bar);

    await expect(style.animationName).toBe("pulse");
    await expect(style.animationIterationCount).toBe("infinite");
    await expect(style.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");

    // A rounded-* written after it overrides its radius.
    const [profile] = canvas.getAllByRole("status", {
      name: "Loading profile",
    });
    const avatar = profile?.firstElementChild;
    if (!avatar) throw new Error("expected an avatar placeholder");
    await expect(getComputedStyle(avatar).borderRadius).not.toBe(
      style.borderRadius,
    );
  },
};
