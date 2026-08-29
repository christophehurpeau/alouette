import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import {
  type SafeAreaEdge,
  SafeAreaScope,
} from "../../core/SafeAreaEdgesContext";
import { Surface } from "../containers/Surface";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { ScreenSectionList } from "./ScreenSectionList";

export default {
  title: "alouette/Layout/ScreenSectionList",
  component: ScreenSectionList,
  parameters: {
    componentSubtitle:
      "A screen-filling SectionList: bg-screen frame, growing content, safe-area insets as content padding",
    docs: {
      description: {
        component: `### Features
- \`bg-screen min-h-full\` frame and a \`grow\` content container, both extendable through \`className\` / \`contentContainerClassName\` (merged with tailwind-merge)
- Safe-area insets applied to the **content**, so rows scroll under the system bars but the first and last one clear them
- Edges default to everything an ancestor \`SafeAreaScope\` has not declared consumed; \`edges\` overrides them per screen
- Insets are native-only: \`useSafeAreaInsets\` is stubbed to zeros on web

### Usage
~~~tsx
<ScreenSectionList<Contact, ContactSection>
  sections={sections}
  contentContainerClassName="p-m gap-xxs"
  keyExtractor={(item) => item.name}
  renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
  renderItem={({ item }) => <ContactRow name={item.name} />}
/>
~~~`,
      },
    },
  },
} satisfies Meta<typeof ScreenSectionList>;

interface Contact {
  name: string;
}

interface ContactSection {
  title: string;
  data: Contact[];
}

function ContactRow({ name }: Contact): ReactNode {
  return (
    <Surface className="p-sm">
      <Text className="text-base">{name}</Text>
    </Surface>
  );
}

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps): ReactNode {
  return (
    <View className="bg-lowered py-xs">
      <Text className="font-body-bold text-sm text-muted">{title}</Text>
    </View>
  );
}

interface ContactScreenSectionListProps {
  edges?: readonly SafeAreaEdge[];
}

function ContactScreenSectionList({
  edges,
}: ContactScreenSectionListProps): ReactNode {
  return (
    <View className="h-50">
      <ScreenSectionList<Contact, ContactSection>
        sections={[
          {
            title: "A",
            data: [{ name: "Aaron" }, { name: "Alice" }, { name: "Avery" }],
          },
          { title: "B", data: [{ name: "Bianca" }, { name: "Bruno" }] },
          {
            title: "C",
            data: [{ name: "Cara" }, { name: "Colette" }, { name: "Cyrus" }],
          },
        ]}
        edges={edges}
        contentContainerClassName="p-m gap-xxs"
        keyExtractor={(item) => item.name}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} />
        )}
        renderItem={({ item }) => <ContactRow name={item.name} />}
      />
    </View>
  );
}

export const PreviewStory: StoryObj = {
  name: "ScreenSectionList Preview",
  render: () => <ContactScreenSectionList />,
};

export const VariantsStory: StoryObj = {
  name: "ScreenSectionList",
  render: () => (
    <Story>
      <Story.Section title="Default (every unconsumed edge)">
        <ContactScreenSectionList />
      </Story.Section>

      <Story.Section title="Explicit edges (bottom only)">
        <ContactScreenSectionList edges={["bottom"]} />
      </Story.Section>

      <Story.Section title="Under a header — SafeAreaScope consumes the top">
        <SafeAreaScope consumedEdges={["top"]}>
          <ContactScreenSectionList />
        </SafeAreaScope>
      </Story.Section>
    </Story>
  ),
};
