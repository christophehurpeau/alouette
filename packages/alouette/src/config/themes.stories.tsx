import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { Accent } from "../core/AlouetteConfig";
import { AccentScope } from "../ui/containers/AccentScope";
import { Text } from "../ui/primitives/Text";
import { View } from "../ui/primitives/View";
import { VStack } from "../ui/stacks/stacks";
import { Story, accents } from "../ui/story-components/Story";
import { StoryGrid } from "../ui/story-components/StoryGrid";

const tokenSwatchVariants = tv({
  base: "h-3",
  variants: {
    token: {
      screen: "bg-(--color-screen)",
      surface: "bg-(--color-surface)",
      highlight: "bg-(--color-highlight)",
      "highlight-accent": "bg-(--color-highlight-accent)",
      lowered: "bg-(--color-lowered)",
      "screen-gradient-start": "bg-(--color-screen-gradient-start)",
      "screen-gradient-middle": "bg-(--color-screen-gradient-middle)",
      "screen-gradient-end": "bg-(--color-screen-gradient-end)",
      sharp: "bg-(--color-sharp)",
      accent: "bg-(--color-accent)",
      "on-accent": "bg-(--color-on-accent)",
      "on-accent-muted": "bg-(--color-on-accent-muted)",
      "border-sharp": "bg-(--color-border-sharp)",
      "border-muted": "bg-(--color-border-muted)",
      selection: "bg-(--color-selection)",
      "interactive-contained-pressable":
        "bg-(--color-interactive-contained-pressable)",
      "interactive-contained-hover": "bg-(--color-interactive-contained-hover)",
      "interactive-contained-focus": "bg-(--color-interactive-contained-focus)",
      "interactive-contained-active":
        "bg-(--color-interactive-contained-active)",
      "interactive-outlined-pressable":
        "bg-(--color-interactive-outlined-pressable)",
      "interactive-outlined-hover": "bg-(--color-interactive-outlined-hover)",
      "interactive-outlined-focus": "bg-(--color-interactive-outlined-focus)",
      "interactive-outlined-active": "bg-(--color-interactive-outlined-active)",
      "interactive-outlined-outline-focus":
        "bg-(--color-interactive-outlined-outline-focus)",
      "interactive-active": "bg-(--color-interactive-active)",
      "interactive-pressable": "bg-(--color-interactive-pressable)",
      "interactive-hover": "bg-(--color-interactive-hover)",
      translucent: "bg-(--color-translucent)",
      "disabled-sharp": "bg-(--color-disabled-sharp)",
      "disabled-muted": "bg-(--color-disabled-muted)",
      muted: "bg-(--color-muted)",
      "form-border-disabled": "bg-(--color-form-border-disabled)",
      "form-placeholder": "bg-(--color-form-placeholder)",
      "form-disabled-text": "bg-(--color-form-disabled-text)",
      "interactive-link-disabled": "bg-(--color-interactive-link-disabled)",
      "interactive-contained-disabled":
        "bg-(--color-interactive-contained-disabled)",
      "interactive-outlined-disabled":
        "bg-(--color-interactive-outlined-disabled)",
      "interactive-accent-outlined-border-disabled":
        "bg-(--color-interactive-accent-outlined-border-disabled)",
    },
  },
});

interface TokenSwatchProps {
  token:
    | "accent"
    | "border-muted"
    | "border-sharp"
    | "disabled-muted"
    | "disabled-sharp"
    | "form-border-disabled"
    | "form-disabled-text"
    | "form-placeholder"
    | "highlight-accent"
    | "highlight"
    | "interactive-accent-outlined-border-disabled"
    | "interactive-active"
    | "interactive-contained-active"
    | "interactive-contained-disabled"
    | "interactive-contained-focus"
    | "interactive-contained-hover"
    | "interactive-contained-pressable"
    | "interactive-hover"
    | "interactive-link-disabled"
    | "interactive-outlined-active"
    | "interactive-outlined-disabled"
    | "interactive-outlined-focus"
    | "interactive-outlined-hover"
    | "interactive-outlined-outline-focus"
    | "interactive-outlined-pressable"
    | "interactive-pressable"
    | "lowered"
    | "muted"
    | "on-accent-muted"
    | "on-accent"
    | "screen-gradient-end"
    | "screen-gradient-middle"
    | "screen-gradient-start"
    | "screen"
    | "selection"
    | "sharp"
    | "surface"
    | "translucent";
}

function TokenSwatch({ token }: TokenSwatchProps): ReactNode {
  return (
    <VStack className="min-w-20 gap-0.5">
      <Text className="text-xs text-muted leading-tight">{token}</Text>
      <View className={tokenSwatchVariants({ token })} />
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

interface ThemeProbeProps {
  label: string;
}

function ThemeProbe({ label }: ThemeProbeProps): ReactNode {
  return (
    <VStack className="min-w-20 gap-0.5">
      <Text className="text-xs text-muted leading-tight">{label}</Text>
      <View aria-label={label} className="h-3 bg-(--color-accent)" />
    </VStack>
  );
}

/**
 * On web a theme is a className and tokens resolve by CSS custom-property
 * inheritance, so the closest theme class must win whatever the order of the
 * generated blocks. `play` asserts it: a probe nested two accent scopes deep
 * resolves to the inner accent, not the outer one and not the file's last block.
 */
export const NestedThemes: StoryObj = {
  render: () => (
    <Story noDarkMode>
      <Story.Section modeTheme="light" title="Closest theme wins">
        <Story.SubSection withSurface title="Nested accent scopes">
          <StoryGrid.Row flexWrap loose>
            <ThemeProbe label="base" />
            <AccentScope accent="danger">
              <ThemeProbe label="danger" />
              <AccentScope accent="info">
                <ThemeProbe label="danger then info" />
              </AccentScope>
            </AccentScope>
            <AccentScope accent="info">
              <ThemeProbe label="info" />
            </AccentScope>
          </StoryGrid.Row>
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const accentOf = (label: string): string =>
      getComputedStyle(canvas.getByLabelText(label)).backgroundColor;

    await expect(accentOf("danger then info")).toBe(accentOf("info"));
    await expect(accentOf("danger")).not.toBe(accentOf("info"));
    await expect(accentOf("danger")).not.toBe(accentOf("base"));
  },
};

function ColorFormatProbes(): ReactNode {
  return (
    <Story noDarkMode>
      <Story.Section modeTheme="light" title="Color format">
        <Story.SubSection withSurface title="Accent in the active palette">
          <StoryGrid.Row flexWrap loose>
            <ThemeProbe label="base accent" />
            <AccentScope accent="info">
              <ThemeProbe label="info accent" />
            </AccentScope>
          </StoryGrid.Row>
        </Story.SubSection>
      </Story.Section>
    </Story>
  );
}

const accentFormatOf = (canvasElement: HTMLElement, label: string): string => {
  const { backgroundColor } = getComputedStyle(
    within(canvasElement).getByLabelText(label),
  );
  return backgroundColor.slice(0, backgroundColor.indexOf("("));
};

/**
 * The `colorFormat` toolbar global drives which palette CSS the web preview
 * loads (`.storybook/preview.tsx` toggles the wide-gamut overlay stylesheet).
 * It defaults to sRGB, so tokens must resolve to hex-derived `rgb()`.
 */
export const ColorFormatSrgb: StoryObj = {
  render: () => <ColorFormatProbes />,
  play: async ({ canvasElement }) => {
    await expect(accentFormatOf(canvasElement, "base accent")).toBe("rgb");
    await expect(accentFormatOf(canvasElement, "info accent")).toBe("rgb");
  },
};

/** Same probes with the toolbar on OKLCH: the overlay stylesheet is enabled. */
export const ColorFormatOklch: StoryObj = {
  globals: { colorFormat: "oklch" },
  render: () => <ColorFormatProbes />,
  play: async ({ canvasElement }) => {
    await expect(accentFormatOf(canvasElement, "base accent")).toBe("oklch");
    await expect(accentFormatOf(canvasElement, "info accent")).toBe("oklch");
  },
};
