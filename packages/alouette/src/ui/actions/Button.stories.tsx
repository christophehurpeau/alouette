import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftDuotoneIcon } from "alouette-icons/phosphor-icons/ArrowLeftDuotoneIcon";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";
import type { ReactNode } from "react";
import { VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
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
- \`variant\`: contained | outlined | ghost | soft
- \`size\`: sm (38px) | md (44px)
- Wrap in \`<AccentTheme accent="brand"/>\` (or any accent: brand|info|success|warning|danger) to switch the interactive token set; it composes with the current light/dark mode automatically.

### Usage
~~~tsx
<Button text="Save" icon={<CheckIcon />} />

<AccentTheme accent="brand">
  <Button variant="outlined" text="Cancel" />
</AccentTheme>
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

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section withSurface title="Sizes">
        <StoryGrid.Row flexWrap>
          {(["sm", "md"] as const).map((size) => (
            <StoryGrid.Col key={size} title={size}>
              <Button
                variant="contained"
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
        {accents.map((accent) => (
          <Story.SubSection key={accent} title={accent}>
            <StoryGrid.Row flexWrap>
              {(
                [undefined, "hover", "focus", "press", "disabled"] as const
              ).map((state) => (
                <StoryGrid.Col
                  key={state ?? "default"}
                  title={state ?? "Default"}
                >
                  <VStack className="gap-xs p-xxs">
                    {(["contained", "outlined", "ghost", "soft"] as const).map(
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
                        />
                      ),
                    )}
                  </VStack>
                </StoryGrid.Col>
              ))}
            </StoryGrid.Row>
          </Story.SubSection>
        ))}
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
            {(["contained", "outlined", "ghost", "soft"] as const).map(
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
            {(["contained", "outlined", "ghost", "soft"] as const).map(
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
            {(["contained", "outlined", "ghost", "soft"] as const).map(
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
                <VStack className="gap-xs">
                  <Button
                    size={size}
                    icon={<ArrowLeftRegularIcon />}
                    text="Very very very very very very very very very very very very very very very very very very long text with icon"
                  />
                  <Button
                    size={size}
                    text="Very very very very very very very very very very very very very very very very very very long text without icon"
                  />
                </VStack>
              </StoryGrid.Col>
            ))}
          </StoryGrid.Row>
        </Story.SubSection>
      </Story.Section>
    </Story>
  ),
};
