import { expect, userEvent, waitFor, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { Button } from "../actions/Button";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story } from "../story-components/Story";
import { StoryGrid } from "../story-components/StoryGrid";
import { Box } from "./Box";

type ThisStory = StoryObj<typeof Box>;

/** A surface whose accent a button switches, to watch its ground fade. */
function AccentChangeSurface(): ReactNode {
  const [accent, setAccent] = useState<Accent>("info");

  return (
    <View className="items-start gap-m">
      <Button
        text="Change accent"
        onPress={() => {
          setAccent(accent === "info" ? "danger" : "info");
        }}
      />
      <Box accent={accent} aria-label="Accent surface" className="surface">
        <Text className="text-accent">{`accent="${accent}"`}</Text>
      </Box>
    </View>
  );
}

export default {
  title: "alouette/Containers/Surface",
  component: Box,
  parameters: {
    componentSubtitle:
      "The `surface` utility on a Box: a raised card with a ground, a shadow, padding and rounded corners.",
    docs: {
      description: {
        component: `### Features
- \`surface\` is \`overflow-hidden bg-surface shadow-s surface-md\` with a background-color transition, on a \`Box\` (which carries \`accent\`): the ground fades when the accent or the mode changes
- Any class after it overrides its own part, and every class takes a breakpoint prefix (\`surface-sm md:surface-lg\`)
- Sizes (padding + radius as one class): \`surface-xxs\` · \`surface-xs\` · \`surface-sm\` · \`surface-md\` · \`surface-lg\`
- Grounds: \`bg-surface\` · \`bg-highlight\` · \`bg-highlight-accent\` · \`bg-translucent\` · \`lowered\` (the recessed ground with its inset shadow)
- Elevation: \`shadow-s\` · \`shadow-m\` · \`shadow-l\`
- Roles: \`surface-popover\` (the panel of Menu, Select and InputTextAutocomplete), used instead of \`surface\`
- The \`Surface\` component is deprecated: \`<Surface size="sm" variant="lowered">\` is \`<Box className="surface surface-sm lowered">\`

### Usage
~~~tsx
<Box className="surface">Primary content</Box>
<Box className="surface shadow-m surface-sm md:surface-lg">Larger surface</Box>
<Box className="surface lowered">Sunken surface</Box>
~~~`,
      },
    },
  },
} satisfies Meta<typeof Box>;

export const PreviewSurfaceStory: ThisStory = {
  name: "Surface Preview",
  parameters: {
    layout: "padded",
  },
  args: {
    className: "surface",
    children: <Text>Surface content</Text>,
  },
};

export const VariantsSurfaceStory: ThisStory = {
  name: "Surface Variants",
  render: () => (
    <Story>
      <Story.Section title="Grounds">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="Default">
            <Box className="surface" aria-label="Default surface">
              <Text>bg-surface</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Highlight">
            <Box className="surface bg-highlight">
              <Text>bg-highlight</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Highlight accent">
            <Box accent="brand" className="surface bg-highlight-accent">
              <Text>bg-highlight-accent</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Translucent">
            <Box className="surface bg-translucent">
              <Text>bg-translucent</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Lowered">
            <Box aria-label="Lowered class" className="surface lowered">
              <Text>lowered</Text>
            </Box>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Accent change">
        <AccentChangeSurface />
      </Story.Section>
      <Story.Section title="Elevation">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="Small">
            <Box className="surface shadow-s">
              <Text>shadow-s</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Medium">
            <Box className="surface shadow-m">
              <Text>shadow-m</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Large">
            <Box className="surface shadow-l">
              <Text>shadow-l</Text>
            </Box>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Sizes">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="xxs">
            <Box aria-label="Surface xxs" className="surface surface-xxs">
              <Text>surface-xxs</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="xs">
            <Box aria-label="Surface xs" className="surface surface-xs">
              <Text>surface-xs</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="sm">
            <Box aria-label="Surface sm" className="surface surface-sm">
              <Text>surface-sm</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="md (default)">
            <Box className="surface" aria-label="Surface md">
              <Text>surface-md</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="lg">
            <Box aria-label="Surface lg" className="surface surface-lg">
              <Text>surface-lg</Text>
            </Box>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Size with one side overridden">
        <Box
          aria-label="Overridden surface"
          className="surface surface-sm py-xs"
        >
          <Text>surface-sm py-xs</Text>
        </Box>
      </Story.Section>
      <Story.Section title="Responsive size">
        <Box
          aria-label="Responsive surface"
          className="surface surface-sm md:surface-lg"
        >
          <Text>surface-sm md:surface-lg</Text>
        </Box>
      </Story.Section>
      <Story.Section title="Popover panel">
        <StoryGrid.Row flexWrap>
          <StoryGrid.Col title="surface-popover">
            <Box aria-label="Popover surface" className="surface-popover">
              <Text>surface-popover</Text>
            </Box>
          </StoryGrid.Col>
          <StoryGrid.Col title="Same classes written out">
            <Box
              aria-label="Popover classes"
              className="surface bg-highlight shadow-l rounded-sm p-xs"
            >
              <Text>bg-highlight shadow-l rounded-sm p-xs</Text>
            </Box>
          </StoryGrid.Col>
        </StoryGrid.Row>
      </Story.Section>
      <Story.Section title="Lowered as separate classes">
        <Box
          aria-label="Lowered pair"
          className="surface bg-lowered shadow-lowered"
        >
          <Text>bg-lowered shadow-lowered</Text>
        </Box>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Story renders the light and the dark copy; the light one is enough.
    const style = (label: string): CSSStyleDeclaration => {
      const [element] = canvas.getAllByLabelText(label);
      if (!element) throw new Error(`expected "${label}" to render`);
      return getComputedStyle(element);
    };

    async function expectSize(
      label: string,
      padding: string,
      radius: string,
    ): Promise<void> {
      const computed = style(label);
      await expect(computed.paddingTop).toBe(padding);
      await expect(computed.paddingLeft).toBe(padding);
      await expect(computed.borderTopLeftRadius).toBe(radius);
    }

    // Each size is one padding + radius pair, and it wins over the surface-md
    // inside `surface`: the utilities sort ahead of the size classes.
    await expectSize("Surface xxs", "8px", "8px");
    await expectSize("Surface xs", "12px", "8px");
    await expectSize("Surface sm", "16px", "16px");
    await expectSize("Surface md", "32px", "16px");
    await expectSize("Surface lg", "48px", "32px");

    // A single class after the size overrides only its own side.
    const overridden = style("Overridden surface");
    await expect(overridden.paddingTop).toBe("8px");
    await expect(overridden.paddingLeft).toBe("16px");
    await expect(overridden.borderTopLeftRadius).toBe("16px");

    if (window.innerWidth >= 768) {
      await expectSize("Responsive surface", "48px", "32px");
    } else {
      await expectSize("Responsive surface", "16px", "16px");
    }

    // The popover role is exactly its classes, replacing every Surface default.
    const popover = style("Popover surface");
    const popoverClasses = style("Popover classes");
    await expectSize("Popover surface", "8px", "16px");
    await expect(popover.backgroundColor).toBe(popoverClasses.backgroundColor);
    await expect(popover.boxShadow).toBe(popoverClasses.boxShadow);

    // The utility is the ground and the inset shadow together, and it replaces
    // the default bg-surface / shadow-s rather than losing to them.
    const loweredClass = style("Lowered class");
    const loweredPair = style("Lowered pair");
    await expect(loweredClass.backgroundColor).toBe(
      loweredPair.backgroundColor,
    );
    await expect(loweredClass.boxShadow).toBe(loweredPair.boxShadow);
    await expect(loweredClass.backgroundColor).not.toBe(
      style("Default surface").backgroundColor,
    );

    // Switching the accent swaps the theme variables under the ground, and the
    // surface fades to the new color instead of jumping to it.
    const [accentSurface] = canvas.getAllByLabelText("Accent surface");
    const [changeAccent] = canvas.getAllByRole("button", {
      name: "Change accent",
    });
    if (!accentSurface || !changeAccent) {
      throw new Error("expected the accent change section to render");
    }
    const before = getComputedStyle(accentSurface);
    await expect(before.transitionProperty).toBe("background-color");
    await expect(before.transitionDuration).toBe("0.2s");
    const initialBackground = before.backgroundColor;

    await userEvent.click(changeAccent);
    await waitFor(async () => {
      await expect(
        accentSurface
          .getAnimations()
          .some(
            (animation) =>
              animation instanceof CSSTransition &&
              animation.transitionProperty === "background-color",
          ),
      ).toBe(true);
    });
    await waitFor(async () => {
      await expect(getComputedStyle(accentSurface).backgroundColor).not.toBe(
        initialBackground,
      );
    });
  },
};
