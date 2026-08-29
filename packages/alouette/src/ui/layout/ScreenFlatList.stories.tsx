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
import { ScreenFlatList } from "./ScreenFlatList";

export default {
  title: "alouette/Layout/ScreenFlatList",
  component: ScreenFlatList,
  parameters: {
    componentSubtitle:
      "A screen-filling FlatList: bg-screen frame, growing content, safe-area insets as content padding",
    docs: {
      description: {
        component: `### Features
- \`bg-screen min-h-full\` frame and a \`grow\` content container, both extendable through \`className\` / \`contentContainerClassName\` (merged with tailwind-merge)
- Safe-area insets applied to the **content**, so rows scroll under the system bars but the first and last one clear them
- Edges default to everything an ancestor \`SafeAreaScope\` has not declared consumed; \`edges\` overrides them per screen
- Insets are native-only: \`useSafeAreaInsets\` is stubbed to zeros on web

### Usage
~~~tsx
<ScreenFlatList<Contact>
  data={contacts}
  contentContainerClassName="p-m gap-xxs"
  keyExtractor={(item) => item.name}
  renderItem={({ item }) => <ContactRow name={item.name} />}
/>
~~~`,
      },
    },
  },
} satisfies Meta<typeof ScreenFlatList>;

interface Contact {
  name: string;
}

function ContactRow({ name }: Contact): ReactNode {
  return (
    <Surface className="p-sm">
      <Text className="text-base">{name}</Text>
    </Surface>
  );
}

interface ContactScreenListProps {
  edges?: readonly SafeAreaEdge[];
}

function ContactScreenList({ edges }: ContactScreenListProps): ReactNode {
  return (
    <View className="h-50">
      <ScreenFlatList<Contact>
        data={[
          { name: "Aaron" },
          { name: "Alice" },
          { name: "Bianca" },
          { name: "Bruno" },
          { name: "Cara" },
          { name: "Colette" },
          { name: "Cyrus" },
          { name: "Avery" },
        ]}
        edges={edges}
        contentContainerClassName="p-m gap-xxs"
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ContactRow name={item.name} />}
      />
    </View>
  );
}

export const PreviewStory: StoryObj = {
  name: "ScreenFlatList Preview",
  render: () => <ContactScreenList />,
};

export const VariantsStory: StoryObj = {
  name: "ScreenFlatList",
  render: () => (
    <Story>
      <Story.Section title="Default (every unconsumed edge)">
        <ContactScreenList />
      </Story.Section>

      <Story.Section title="Explicit edges (bottom only)">
        <ContactScreenList edges={["bottom"]} />
      </Story.Section>

      <Story.Section title="Under a header — SafeAreaScope consumes the top">
        <SafeAreaScope consumedEdges={["top"]}>
          <ContactScreenList />
        </SafeAreaScope>
      </Story.Section>
    </Story>
  ),
};
