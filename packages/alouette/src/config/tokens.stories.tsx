import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Text } from "../ui/primitives/Text";
import { View } from "../ui/primitives/View";
import { VStack } from "../ui/stacks/stacks";
import { Story } from "../ui/story-components/Story";
import { StoryGrid } from "../ui/story-components/StoryGrid";

interface SpacingSwatchProps {
  name: string;
}

function SpacingSwatch({ name }: SpacingSwatchProps): ReactNode {
  return (
    <VStack className="gap-xxs">
      <View
        className="h-4 rounded-xs bg-border-muted"
        style={{ width: `var(--spacing-${name})` as `${number}%` }}
      />
      <Text className="text-xs text-muted">{name}</Text>
    </VStack>
  );
}

const radiuses = tv(
  {
    base: "w-16 h-16 border-2 border-border-sharp bg-highlight",
    variants: {
      name: {
        xs: "rounded-xs",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
  },
  { twMerge: false },
);

interface RadiusSwatchProps {
  name: "lg" | "md" | "sm" | "xs";
}

function RadiusSwatch({ name }: RadiusSwatchProps): ReactNode {
  return (
    <VStack className="gap-xxs items-center w-20">
      <View className={radiuses({ name })} />
      <Text className="text-xs text-muted">{name}</Text>
    </VStack>
  );
}

const shadows = tv(
  {
    base: "w-16 h-16 rounded-sm bg-highlight",
    variants: {
      name: {
        s: "shadow-s",
        m: "shadow-m",
        l: "shadow-l",
        lowered: "shadow-lowered",
      },
    },
  },
  { twMerge: false },
);

interface ShadowSwatchProps {
  name: "l" | "lowered" | "m" | "s";
}

function ShadowSwatch({ name }: ShadowSwatchProps): ReactNode {
  return (
    <VStack className="gap-xs items-center w-20">
      <View className={shadows({ name })} />
      <Text className="font-mono text-base text-muted">{name}</Text>
    </VStack>
  );
}

export default {
  title: "alouette/Config/Tokens",
  parameters: {
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta;

export const Tokens: StoryObj = {
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Spacing">
        <StoryGrid.Row flexWrap>
          <SpacingSwatch name="xxs" />
          <SpacingSwatch name="xs" />
          <SpacingSwatch name="sm" />
          <SpacingSwatch name="m" />
          <SpacingSwatch name="l" />
          <SpacingSwatch name="xl" />
          <SpacingSwatch name="xxl" />
          <SpacingSwatch name="3xl" />
          <SpacingSwatch name="4xl" />
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Radius">
        <StoryGrid.Row flexWrap>
          <RadiusSwatch name="xs" />
          <RadiusSwatch name="sm" />
          <RadiusSwatch name="md" />
          <RadiusSwatch name="lg" />
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section title="Shadows">
        <StoryGrid.Row flexWrap>
          <ShadowSwatch name="s" />
          <ShadowSwatch name="m" />
          <ShadowSwatch name="l" />
          <ShadowSwatch name="lowered" />
        </StoryGrid.Row>
      </Story.Section>
    </Story>
  ),
};
