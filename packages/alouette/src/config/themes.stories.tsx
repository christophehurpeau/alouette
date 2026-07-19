import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import type { Accent } from "../core/AlouetteConfig";
import { useThemeToken } from "../core/useThemeToken";
import { Text } from "../ui/primitives/Text";
import { View } from "../ui/primitives/View";
import { VStack } from "../ui/stacks/stacks";
import { Story, accents } from "../ui/story-components/Story";
import { StoryGrid } from "../ui/story-components/StoryGrid";

interface TokenSwatchProps {
  token: string;
}

function TokenSwatch({ token }: TokenSwatchProps): ReactNode {
  const color = useThemeToken(`--color-${token}`);
  return (
    <VStack className="min-w-20 gap-0.5">
      <Text className="text-xs text-muted leading-tight">{token}</Text>
      <View className="h-3" style={{ backgroundColor: color }} />
    </VStack>
  );
}

interface TokenGroupProps {
  group: string;
  children: NonNullable<ReactNode>;
}

function TokenGroup({ group, children }: TokenGroupProps): ReactNode {
  return (
    <VStack className="gap-xxs">
      <Text className="font-body-bold text-xs text-muted">{group}</Text>
      <StoryGrid.Row flexWrap loose>
        {children}
      </StoryGrid.Row>
    </VStack>
  );
}

interface AccentTokensProps {
  accent?: Accent;
}

function AccentTokens({ accent }: AccentTokensProps): ReactNode {
  return (
    <Story.SubSection
      withSurface
      title={accent ? `Accent: ${accent}` : "Default"}
      accent={accent}
    >
      <TokenGroup group="Backgrounds">
        <TokenSwatch token="screen" />
        <TokenSwatch token="surface" />
        <TokenSwatch token="highlight" />
        <TokenSwatch token="highlight-accent" />
        <TokenSwatch token="lowered" />
        <TokenSwatch token="screen-gradient-start" />
        <TokenSwatch token="screen-gradient-middle" />
        <TokenSwatch token="screen-gradient-end" />
      </TokenGroup>
      <TokenGroup group="Texts">
        <TokenSwatch token="sharp" />
        <TokenSwatch token="accent" />
        <TokenSwatch token="on-accent" />
        <TokenSwatch token="on-accent-muted" />
      </TokenGroup>
      <TokenGroup group="Borders">
        <TokenSwatch token="border-sharp" />
        <TokenSwatch token="border-muted" />
      </TokenGroup>
      <TokenGroup group="Specials">
        <TokenSwatch token="selection" />
      </TokenGroup>
      <TokenGroup group="Interactive">
        <TokenSwatch token="interactive-contained-pressable" />
        <TokenSwatch token="interactive-contained-hover" />
        <TokenSwatch token="interactive-contained-focus" />
        <TokenSwatch token="interactive-contained-active" />
        <TokenSwatch token="interactive-outlined-pressable" />
        <TokenSwatch token="interactive-outlined-hover" />
        <TokenSwatch token="interactive-outlined-focus" />
        <TokenSwatch token="interactive-outlined-active" />
        <TokenSwatch token="interactive-outlined-outline-focus" />
        <TokenSwatch token="interactive-active" />
        <TokenSwatch token="interactive-pressable" />
        <TokenSwatch token="interactive-hover" />
      </TokenGroup>
    </Story.SubSection>
  );
}

interface ThemeTokensProps {
  themeMode: "dark" | "light";
}

function ThemeTokens({ themeMode }: ThemeTokensProps): ReactNode {
  return (
    <Story.Section title={themeMode} modeTheme={themeMode}>
      <Story.SubSection withSurface title="Shared tokens">
        <TokenGroup group="Backgrounds">
          <TokenSwatch token="translucent" />
        </TokenGroup>
        <TokenGroup group="Texts">
          <TokenSwatch token="disabled-sharp" />
          <TokenSwatch token="disabled-muted" />
          <TokenSwatch token="muted" />
        </TokenGroup>
        <TokenGroup group="Form">
          <TokenSwatch token="form-border-disabled" />
          <TokenSwatch token="form-placeholder" />
          <TokenSwatch token="form-disabled-text" />
        </TokenGroup>
        <TokenGroup group="Interactive">
          <TokenSwatch token="interactive-link-disabled" />
          <TokenSwatch token="interactive-contained-disabled" />
          <TokenSwatch token="interactive-outlined-disabled" />
          <TokenSwatch token="interactive-accent-outlined-border-disabled" />
        </TokenGroup>
      </Story.SubSection>
      <AccentTokens />
      {accents.map((accent) => (
        <AccentTokens key={accent} accent={accent} />
      ))}
    </Story.Section>
  );
}

export default {
  title: "alouette/Config/Themes",
  parameters: {
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta;

export const Themes: StoryObj = {
  render: () => (
    <Story noDarkMode>
      <ThemeTokens themeMode="light" />
      <ThemeTokens themeMode="dark" />
    </Story>
  ),
};
