import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";
import { VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Button, ExternalLinkButton } from "./Button";

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
- \`variant\`: contained | outlined | ghost-contained | ghost-outlined
- \`size\`: sm (38px) | md (44px)
- Wrap in \`<AccentTheme accent="brand"/>\` (or any accent: brand|info|success|warning|danger) to switch the interactive token set; it composes with the current light/dark mode automatically.

### Usage
~~~tsx
<Button text="Save" icon={<CheckIcon />} />

<AccentTheme accent="brand">
  <Button variant="outlined" text="Cancel" />
</AccentTheme>
~~~`,
      },
    },
  },
} satisfies Meta<typeof Button>;

export const PreviewButtonStory: ThisStory = {
  args: {
    text: "Example",
  },
  render: (args) => <Button {...args} icon={<ArrowLeftRegularIcon />} />,
};

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
                    {(["contained", "outlined", "ghost"] as const).map(
                      (variant) => (
                        <Button
                          key={variant}
                          accent={accent}
                          disabled={state === "disabled"}
                          variant={variant}
                          forceStyle={state === "disabled" ? undefined : state}
                          icon={<ArrowLeftRegularIcon />}
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

      <Story.Section title="External Link Button">
        <ExternalLinkButton
          href="https://storybook.js.org/"
          text="Open Storybook"
        />
      </Story.Section>

      <Story.Section title="Edge Cases">
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
