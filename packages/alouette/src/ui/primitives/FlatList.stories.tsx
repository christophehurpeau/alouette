import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Surface } from "../containers/Surface";
import { Story } from "../story-components/Story";
import { FlatList } from "./FlatList";
import { Text } from "./Text";
import { View } from "./View";

export default {
  title: "alouette/Primitives/FlatList",
  component: FlatList,
  parameters: {
    componentSubtitle:
      "A performant, virtualized list (RN FlatList) with className support for the list, its content container, and column wrappers",
    docs: {
      description: {
        component: `### Features
- Virtualized rendering for long lists via \`data\` + \`renderItem\`
- Multi-column layouts with \`numColumns\` + \`columnWrapperClassName\`
- NativeWind \`className\` (maps to \`style\`), \`contentContainerClassName\` (maps to \`contentContainerStyle\`), and \`columnWrapperClassName\` (maps to \`columnWrapperStyle\`)

### Usage
~~~tsx
<FlatList
  data={["Alice", "Aaron", "Bruno"]}
  keyExtractor={(item, index) => item + index}
  renderItem={({ item }) => <Text>{item}</Text>}
/>
~~~`,
      },
    },
  },
} satisfies Meta<typeof FlatList>;

interface Contact {
  name: string;
}

function ContactRow({ name }: Contact): ReactNode {
  return (
    <View className="py-sm">
      <Text className="text-base">{name}</Text>
    </View>
  );
}

function ContactCard({ name }: Contact): ReactNode {
  return (
    <Surface className="flex-1">
      <Text className="text-base">{name}</Text>
    </Surface>
  );
}

interface ContactListProps {
  numColumns?: number;
  columnWrapperClassName?: string;
}

function ContactList({
  numColumns,
  columnWrapperClassName,
}: ContactListProps): ReactNode {
  const multiColumn = numColumns !== undefined && numColumns > 1;
  return (
    <View className="h-70">
      <FlatList<Contact>
        data={[
          { name: "Aaron" },
          { name: "Alice" },
          { name: "Avery" },
          { name: "Bianca" },
          { name: "Bruno" },
          { name: "Cara" },
          { name: "Cyrus" },
          { name: "Colette" },
        ]}
        numColumns={numColumns}
        columnWrapperClassName={columnWrapperClassName}
        contentContainerClassName="gap-xxs"
        keyExtractor={(item, index) => `${item.name}${index}`}
        renderItem={({ item }) =>
          multiColumn ? (
            <ContactCard name={item.name} />
          ) : (
            <ContactRow name={item.name} />
          )
        }
      />
    </View>
  );
}

export const PreviewStory: StoryObj = {
  name: "FlatList Preview",
  render: () => <ContactList />,
};

export const VariantsStory: StoryObj = {
  name: "FlatList",
  render: () => (
    <Story>
      <Story.Section title="Basic">
        <ContactList />
      </Story.Section>

      <Story.Section title="Two columns">
        <ContactList numColumns={2} columnWrapperClassName="gap-xxs" />
      </Story.Section>
    </Story>
  ),
};
