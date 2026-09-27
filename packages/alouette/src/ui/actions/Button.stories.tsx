import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftDuotoneIcon } from "alouette-icons/phosphor-icons/ArrowLeftDuotoneIcon";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";
import type { ReactNode } from "react";
import { AccentScope } from "../containers/AccentScope";
import { View } from "../primitives/View";
import { Story, neutralAndAccents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Button, type ButtonProps, ExternalLinkButton } from "./Button";

type ThisStory = StoryObj<typeof Button>;

export default {
  title: "alouette/Actions/Button",
  component: Button,
  parameters: {
    componentSubtitle:
      "A versatile button component that combines text and optional icons into a unified interactive element",
    docs: {
      description: {
        component: `### Variants
- \`variant\`: tonal | filled | outlined | soft
- \`size\`: sm (38px) | md (44px)
- \`accent\`: brand | danger | info | success | warning | neutral — unset, the accent of the nearest accent scope, brand outside one

\`tonal\` (default) is a ground lighter than the page, lifted by a shadow, whose ink carries the accent. \`filled\` is the accent's own flat fill under white ink, for the one action that must dominate.

Differentiate a button by its \`accent\`, not by dropping to a lighter \`variant\`: \`accent="neutral"\` is the secondary action beside an accented one — the same material, on the neutral tokens.

### Usage
~~~tsx
<Button text="Save" icon={<CheckIcon />} />

{/* the secondary action of a confirmation */}
<Button accent="neutral" text="Cancel" />
~~~

### Active icon
\`activeIcon\` replaces \`icon\` while the button is hovered, focused or pressed — a duotone twin is the usual pick. It is optional: with \`icon\` alone the glyph keeps one weight in every state.
~~~tsx
<Button
  text="Back"
  icon={<ArrowLeftRegularIcon />}
  activeIcon={<ArrowLeftDuotoneIcon />}
/>
~~~`,
      },
    },
  },
} satisfies Meta<typeof Button>;

export const PreviewButtonStory: ThisStory = {
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: {
    text: "Example",
  },
  render: (args) => (
    <Button
      {...args}
      icon={<ArrowLeftRegularIcon />}
      activeIcon={<ArrowLeftDuotoneIcon />}
    />
  ),
};

interface BackButtonProps {
  forceStyle?: ButtonProps["forceStyle"];
  /** Renders `icon` alone, so the glyph keeps one weight in every state. */
  withoutActiveIcon?: boolean;
}

function BackButton({
  forceStyle,
  withoutActiveIcon,
}: BackButtonProps): ReactNode {
  return (
    <Button
      forceStyle={forceStyle}
      icon={<ArrowLeftRegularIcon />}
      activeIcon={withoutActiveIcon ? undefined : <ArrowLeftDuotoneIcon />}
      text="Back"
    />
  );
}

function IconWeightRow({
  withoutActiveIcon,
}: Pick<BackButtonProps, "withoutActiveIcon">): ReactNode {
  return (
    <StoryGrid.Row flexWrap>
      <StoryGrid.Col title="Default">
        <BackButton withoutActiveIcon={withoutActiveIcon} />
      </StoryGrid.Col>
      <StoryGrid.Col title="hover">
        <BackButton forceStyle="hover" withoutActiveIcon={withoutActiveIcon} />
      </StoryGrid.Col>
      <StoryGrid.Col title="focus">
        <BackButton forceStyle="focus" withoutActiveIcon={withoutActiveIcon} />
      </StoryGrid.Col>
      <StoryGrid.Col title="press">
        <BackButton forceStyle="press" withoutActiveIcon={withoutActiveIcon} />
      </StoryGrid.Col>
    </StoryGrid.Row>
  );
}

function InheritedAccentRow(): ReactNode {
  return (
    <StoryGrid.Row flexWrap>
      <StoryGrid.Col title="No scope">
        <Button text="Default" />
      </StoryGrid.Col>
      <StoryGrid.Col title="accent=danger">
        <Button accent="danger" text="Explicit danger" />
      </StoryGrid.Col>
      <StoryGrid.Col title="AccentScope danger">
        <AccentScope accent="danger">
          <Button text="Inherited danger" />
        </AccentScope>
      </StoryGrid.Col>
      <StoryGrid.Col title="AccentScope danger, accent=info">
        <AccentScope accent="danger">
          <Button accent="info" text="Overridden info" />
        </AccentScope>
      </StoryGrid.Col>
    </StoryGrid.Row>
  );
}

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section withSurface title="Sizes">
        <StoryGrid.Row flexWrap>
          {(["sm", "md"] as const).map((size) => (
            <StoryGrid.Col key={size} title={size}>
              <Button
                variant="tonal"
                size={size}
                icon={<ArrowLeftRegularIcon />}
                activeIcon={<ArrowLeftDuotoneIcon />}
                text={size}
              />
            </StoryGrid.Col>
          ))}
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface title="Variants">
        {neutralAndAccents.map((accent) => (
          <Story.SubSection key={accent} title={accent}>
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state ?? "default"}
                  title={state ?? "Default"}
                >
                  <View className="gap-xs p-xxs">
                    {(["tonal", "filled", "outlined", "soft"] as const).map(
                      (variant) => (
                        <Button
                          key={variant}
                          accent={accent}
                          disabled={state === "disabled"}
                          variant={variant}
                          forceStyle={state === "disabled" ? undefined : state}
                          icon={<ArrowLeftRegularIcon />}
                          activeIcon={<ArrowLeftDuotoneIcon />}
                          text={variant}
                          className="justify-between"
                        />
                      ),
                    )}
                  </View>
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
          </Story.SubSection>
        ))}
      </Story.Section>

      <Story.Section withSurface title="Inherited accent">
        <InheritedAccentRow />
      </Story.Section>

      <Story.Section withSurface title="Icon weight">
        <Story.SubSection title="activeIcon">
          <IconWeightRow />
        </Story.SubSection>
        <Story.SubSection title="Without activeIcon">
          <IconWeightRow withoutActiveIcon />
        </Story.SubSection>
      </Story.Section>

      <Story.Section title="External Link Button">
        <ExternalLinkButton
          href="https://storybook.js.org/"
          text="Open Storybook"
        />
      </Story.Section>

      <Story.Section title="States">
        <Story.SubSection title="Loading">
          <StoryGrid.Row flexWrap>
            {(["tonal", "filled", "outlined", "soft"] as const).map(
              (variant) => (
                <Button
                  key={variant}
                  state="loading"
                  variant={variant}
                  icon={<ArrowLeftRegularIcon />}
                  text={variant}
                />
              ),
            )}
          </StoryGrid.Row>
        </Story.SubSection>

        <Story.SubSection title="Failed">
          <StoryGrid.Row flexWrap>
            {(["tonal", "filled", "outlined", "soft"] as const).map(
              (variant) => (
                <Button
                  key={variant}
                  state="failed"
                  variant={variant}
                  icon={<ArrowLeftRegularIcon />}
                  text={variant}
                />
              ),
            )}
          </StoryGrid.Row>
        </Story.SubSection>

        <Story.SubSection title="Success">
          <StoryGrid.Row flexWrap>
            {(["tonal", "filled", "outlined", "soft"] as const).map(
              (variant) => (
                <Button
                  key={variant}
                  state="success"
                  variant={variant}
                  icon={<ArrowLeftRegularIcon />}
                  text={variant}
                />
              ),
            )}
          </StoryGrid.Row>
        </Story.SubSection>

        <Story.SubSection title="No Icon">
          <Button text="Example" />
        </Story.SubSection>

        <Story.SubSection title="Very long text">
          <StoryGrid.Row flexWrap>
            {(["sm", "md"] as const).map((size) => (
              <StoryGrid.Col key={size} title={size}>
                <View className="gap-xs">
                  <Button
                    size={size}
                    icon={<ArrowLeftRegularIcon />}
                    text="Very very very very very very very very very very very very very very very very very very long text with icon"
                  />
                  <Button
                    size={size}
                    text="Very very very very very very very very very very very very very very very very very very long text without icon"
                  />
                </View>
              </StoryGrid.Col>
            ))}
          </StoryGrid.Row>
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};

interface ButtonColors {
  ground: string;
  ink: string;
}

const buttonColorsOf = (button: HTMLElement, text: string): ButtonColors => ({
  ground: getComputedStyle(button).backgroundColor,
  ink: getComputedStyle(within(button).getByText(text)).color,
});

export const InheritedAccent: ThisStory = {
  render: () => (
    <Story noDarkMode>
      <Story.Section withSurface title="Inherited accent">
        <InheritedAccentRow />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const colorsOf = (name: string): ButtonColors =>
      buttonColorsOf(canvas.getByRole("button", { name }), name);

    const brand = colorsOf("Default");
    const danger = colorsOf("Explicit danger");
    await expect(danger.ink).not.toBe(brand.ink);
    await expect(colorsOf("Inherited danger")).toEqual(danger);

    const overridden = colorsOf("Overridden info");
    await expect(overridden.ink).not.toBe(danger.ink);
    await expect(overridden.ink).not.toBe(brand.ink);
  },
};

interface ConfirmationFooterProps {
  forceStyle?: ButtonProps["forceStyle"];
  disabled?: boolean;
}

function ConfirmationFooter({
  forceStyle,
  disabled,
}: ConfirmationFooterProps): ReactNode {
  return (
    <StoryGrid.Row flexWrap>
      <Button
        accent="neutral"
        disabled={disabled}
        forceStyle={forceStyle}
        text="Cancel"
      />
      <Button disabled={disabled} forceStyle={forceStyle} text="Save" />
    </StoryGrid.Row>
  );
}

const isAchromatic = (color: string): boolean =>
  new Set([...color.matchAll(/[\d.]+/g)].slice(0, 3).map(Number)).size === 1;

interface TonalGrounds {
  rest: string;
  hover: string;
  press: string;
  surface: string;
  screen: string;
}

const tonalGroundsOf = (element: HTMLElement): TonalGrounds => {
  const style = getComputedStyle(element);
  const token = (name: string): string => style.getPropertyValue(name).trim();
  return {
    rest: token("--color-interactive-tonal-pressable"),
    hover: token("--color-interactive-tonal-hover"),
    press: token("--color-interactive-tonal-active"),
    surface: token("--color-surface"),
    screen: token("--color-screen"),
  };
};

/**
 * `accent="neutral"` renders the tonal material on the grayscale palette:
 * the same ground, shadow and states a colored accent gets, with the sharp ink
 * where an accented button carries its hue. It is never an `outlined` button,
 * which trades the material away.
 */
export const NeutralAccent: ThisStory = {
  render: () => (
    <Story noDarkMode>
      <Story.Section withSurface title="Confirmation footer">
        <ConfirmationFooter />
      </Story.Section>

      <Story.Section withSurface title="States">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="Default">
            <ConfirmationFooter />
          </StoryGrid.Col>
          <StoryGrid.Col title="hover">
            <ConfirmationFooter forceStyle="hover" />
          </StoryGrid.Col>
          <StoryGrid.Col title="focus">
            <ConfirmationFooter forceStyle="focus" />
          </StoryGrid.Col>
          <StoryGrid.Col title="press">
            <ConfirmationFooter forceStyle="press" />
          </StoryGrid.Col>
          <StoryGrid.Col title="disabled">
            <ConfirmationFooter disabled />
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>

      <Story.Section withSurface modeTheme="dark" title="Dark mode">
        <ConfirmationFooter />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The story repeats the footer: first in light mode, last in dark mode.
    const neutrals = canvas.getAllByRole("button", { name: "Cancel" });
    const neutral = neutrals[0]!;
    const darkNeutral = neutrals.at(-1)!;
    const accented = canvas.getAllByRole("button", { name: "Save" })[0]!;
    const neutralStyle = getComputedStyle(neutral);
    const accentedStyle = getComputedStyle(accented);

    // Same tonal material — a ground and the raised shadow, not the
    // borrowed page background an outlined button sits on.
    await expect(neutralStyle.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    await expect(neutralStyle.boxShadow).toBe(accentedStyle.boxShadow);
    await expect(neutralStyle.boxShadow).not.toBe("none");

    // The accent is the only difference, carried by the ground and the ink:
    // the neutral ones are achromatic, the accented ones are not.
    await expect(isAchromatic(neutralStyle.backgroundColor)).toBe(true);
    await expect(isAchromatic(accentedStyle.backgroundColor)).toBe(false);
    await expect(
      isAchromatic(getComputedStyle(within(neutral).getByText("Cancel")).color),
    ).toBe(true);
    await expect(
      isAchromatic(getComputedStyle(within(accented).getByText("Save")).color),
    ).toBe(false);

    // The ground a neutral button rests on must differ from the two surfaces
    // it is placed on, or it dissolves into them. Light hovers onto the
    // surface step itself, the shadow keeping it lifted there; dark has no
    // step above hover (the scale runs into its text tones), so its press
    // holds at hover's value.
    for (const element of [neutral, darkNeutral]) {
      const { rest, hover, surface, screen } = tonalGroundsOf(element);
      await expect(rest).not.toBe(hover);
      await expect(rest).not.toBe(surface);
      await expect(rest).not.toBe(screen);
    }
    const dark = tonalGroundsOf(darkNeutral);
    await expect(dark.hover).not.toBe(dark.surface);
    await expect(dark.hover).not.toBe(dark.screen);
    const light = tonalGroundsOf(neutral);
    await expect(light.press).not.toBe(light.hover);
  },
};
