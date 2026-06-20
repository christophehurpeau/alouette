import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Surface } from "../containers/Surface";
import { Story } from "../story-components/Story";
import { SectionList } from "./SectionList";
import { Text } from "./Text";
import { View } from "./View";

export default {
  title: "alouette/Primitives/SectionList",
  component: SectionList,
  parameters: {
    componentSubtitle:
      "A performant, sectioned list (RN SectionList) with className support for the list and its content container",
    docs: {
      description: {
        component: `### Features
- Grouped data via \`sections\`, each with a \`renderSectionHeader\`
- Virtualized rendering for long lists
- NativeWind \`className\` (maps to \`style\`) and \`contentContainerClassName\` (maps to \`contentContainerStyle\`)

### Usage
~~~tsx
<SectionList
  sections={[{ title: "A", data: ["Alice", "Aaron"] }]}
  keyExtractor={(item, index) => item + index}
  renderSectionHeader={({ section }) => <Text className="font-body-bold">{section.title}</Text>}
  renderItem={({ item }) => <Text>{item}</Text>}
/>
~~~`,
      },
    },
  },
} satisfies Meta<typeof SectionList>;

interface Contact {
  name: string;
}

interface ContactSection {
  title: string;
  data: Contact[];
}

function ContactRow({ name }: Contact): ReactNode {
  return (
    <View className="py-sm">
      <Text className="text-base">{name}</Text>
    </View>
  );
}

function SectionHeader({ title }: { title: string }): ReactNode {
  return (
    <View className="bg-lowered py-xs">
      <Text className="font-body-bold text-sm text-muted">{title}</Text>
    </View>
  );
}

interface ContactSectionListProps {
  stickySectionHeadersEnabled?: boolean;
  contentContainerClassName?: string;
}

function ContactSectionList({
  stickySectionHeadersEnabled,
  contentContainerClassName,
}: ContactSectionListProps): ReactNode {
  return (
    <View className="h-70">
      <SectionList<Contact, ContactSection>
        sections={[
          {
            title: "A",
            data: [{ name: "Aaron" }, { name: "Alice" }, { name: "Avery" }],
          },
          { title: "B", data: [{ name: "Bianca" }, { name: "Bruno" }] },
          {
            title: "C",
            data: [{ name: "Cara" }, { name: "Cyrus" }, { name: "Colette" }],
          },
        ]}
        stickySectionHeadersEnabled={stickySectionHeadersEnabled}
        contentContainerClassName={contentContainerClassName}
        keyExtractor={(item, index) => `${item.name}${index}`}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} />
        )}
        renderItem={({ item }) => <ContactRow name={item.name} />}
      />
    </View>
  );
}

export const PreviewStory: StoryObj = {
  name: "SectionList Preview",
  render: () => <ContactSectionList />,
};

export const VariantsStory: StoryObj = {
  name: "SectionList",
  render: () => (
    <Story>
      <Story.Section title="Basic">
        <ContactSectionList />
      </Story.Section>

      <Story.Section title="Sticky headers in a Surface">
        <Surface>
          <ContactSectionList
            stickySectionHeadersEnabled
            contentContainerClassName="gap-xxs"
          />
        </Surface>
      </Story.Section>
    </Story>
  ),
};
