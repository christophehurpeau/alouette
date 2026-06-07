import type { Meta, StoryObj } from "@storybook/react-vite";
import { StarRegularIcon } from "alouette-icons/phosphor-icons/StarRegularIcon";
import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { HStack, VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Icon } from "./Icon";
import { Text } from "./Text";

type ThisStory = StoryObj<typeof Icon>;

export default {
  title: "alouette/Primitives/Icon",
  component: Icon,
  parameters: {
    componentSubtitle:
      "Renders an SVG icon, tinted via a text-colour className and sized in px",
    docs: {
      description: {
        component: `### Usage
- **icon**: an SVG element, e.g. \`<StarRegularIcon />\` from \`alouette-icons/phosphor-icons/*\`
- **size**: square size in px (defaults to 20)
- **className**: text-colour token driving the tint (defaults to \`text-sharp\`)

~~~tsx
<Icon icon={<StarRegularIcon />} className="text-accent" size={24} />
~~~`,
      },
    },
  },
} satisfies Meta<typeof Icon>;

export const PreviewStory: ThisStory = {
  name: "Icon Preview",
  args: {
    icon: <StarRegularIcon />,
  },
};

interface TintRowProps {
  className: string;
}

function TintRow({ className }: TintRowProps): ReactNode {
  return (
    <HStack className="gap-sm items-center">
      <Icon icon={<StarRegularIcon />} className={className} size={24} />
      <Text className={`font-mono text-xs ${className}`}>{className}</Text>
    </HStack>
  );
}

function AccentColumn({ accent }: { accent?: Accent }): ReactNode {
  return (
    <StoryGrid.Col title={accent ?? "default"}>
      <AccentScope accent={accent}>
        <VStack className="gap-xs rounded-sm bg-surface p-xs">
          <TintRow className="text-sharp" />
          <TintRow className="text-muted" />
          <TintRow className="text-accent" />
          <TintRow className="text-disabled-sharp" />
          <TintRow className="text-disabled-muted" />
        </VStack>
        <VStack className="gap-xs rounded-sm bg-highlight-accent p-xs mt-xs">
          <TintRow className="text-on-accent" />
          <TintRow className="text-on-accent-muted" />
        </VStack>
      </AccentScope>
    </StoryGrid.Col>
  );
}

export const VariantsStory: ThisStory = {
  name: "Icon Variants",
  render: () => (
    <Story>
      <Story.Section title="Tints across accents">
        <StoryGrid.Row flexWrap>
          {[undefined, ...accents].map((accent) => (
            <AccentColumn key={accent ?? "default"} accent={accent} />
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Sizes">
        <HStack className="gap-m items-end">
          {([16, 20, 24, 32, 48] as const).map((size) => (
            <VStack key={size} className="gap-xs items-center">
              <Icon icon={<StarRegularIcon />} size={size} />
              <Text className="font-mono text-xs text-muted">{size}</Text>
            </VStack>
          ))}
        </HStack>
      </Story.Section>
    </Story>
  ),
};
