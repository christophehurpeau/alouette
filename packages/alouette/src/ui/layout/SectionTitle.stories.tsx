import { expect, fn, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClockRegularIcon } from "alouette-icons/phosphor-icons/Clock";
import { EyeRegularIcon } from "alouette-icons/phosphor-icons/Eye";
import { PressableListItem } from "../actions/PressableListItem";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { SectionTitle } from "./SectionTitle";

type ThisStory = StoryObj<typeof SectionTitle>;

export default {
  title: "alouette/Layout/SectionTitle",
  component: SectionTitle,
  parameters: {
    componentSubtitle:
      "The heading of a section of the screen, with no material of its own.",
    docs: {
      description: {
        component: `### Composition
~~~tsx
<View className="gap-xs">
  <SectionTitle icon={<EyeRegularIcon />} accent="info">
    Waiting for your review
  </SectionTitle>
  <PressableListItem onPress={open}>…</PressableListItem>
</View>
~~~

- A heading (\`role="heading"\`, \`level\` 2 by default — an \`<h2>\` on web)
- \`accent\` tints the icon and the title; without one the icon is muted and the title sharp
- It stands on the screen ground: a list of \`PressableListItem\` rows is raised on its own, so the section is never wrapped in a \`surface\``,
      },
    },
  },
} satisfies Meta<typeof SectionTitle>;

function Rows() {
  return (
    <View className="gap-xs">
      <PressableListItem onPress={fn()}>
        <Text>feat: add SectionTitle</Text>
      </PressableListItem>
      <PressableListItem onPress={fn()}>
        <Text>fix: align the header</Text>
      </PressableListItem>
    </View>
  );
}

export const PreviewSectionTitleStory: ThisStory = {
  name: "SectionTitle Preview",
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    children: "Waiting for your review",
    accent: "info",
  },
  render: (args) => (
    <View className="gap-xs">
      <SectionTitle {...args} icon={<EyeRegularIcon />} />
      <Rows />
    </View>
  ),
};

export const VariantsSectionTitleStory: ThisStory = {
  name: "SectionTitle Variants",
  render: () => (
    <Story>
      <Story.Section title="Plain">
        <SectionTitle>Repositories</SectionTitle>
      </Story.Section>
      <Story.Section title="With icon">
        <SectionTitle icon={<ClockRegularIcon />}>In progress</SectionTitle>
      </Story.Section>
      <Story.Section title="Accent">
        <SectionTitle icon={<EyeRegularIcon />} accent="info">
          Waiting for your review
        </SectionTitle>
      </Story.Section>
      <Story.Section title="Above a list of rows">
        <View className="gap-xs">
          <SectionTitle icon={<EyeRegularIcon />} accent="info" level={3}>
            Waiting for your review
          </SectionTitle>
          <Rows />
        </View>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Each section renders once per color mode.
    const plainHeadings = canvas.getAllByRole("heading", {
      name: "Repositories",
      level: 2,
    });
    const [plain] = plainHeadings;
    const [accented] = canvas.getAllByRole("heading", {
      name: "Waiting for your review",
      level: 2,
    });
    if (!plain || !accented) throw new Error("expected both headings");
    await expect(
      canvas.getAllByRole("heading", {
        name: "Waiting for your review",
        level: 3,
      }),
    ).toHaveLength(plainHeadings.length);

    // The accent tints the title away from the plain sharp ink.
    await expect(getComputedStyle(accented).color).not.toBe(
      getComputedStyle(plain).color,
    );
  },
};
