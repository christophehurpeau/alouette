import { expect, mocked, spyOn, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../containers/Box";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { Story, neutralAndAccents } from "../story-components/Story";
import { PressableBox } from "./PressableBox";

type ThisStory = StoryObj<typeof PressableBox>;

const VARIANTS = ["tonal", "filled", "outlined", "soft"] as const;

function inkOf(variant: (typeof VARIANTS)[number]): string {
  if (variant === "tonal") return "text-on-tonal";
  if (variant === "filled") return "text-on-accent";
  return "text-sharp";
}

export default {
  title: "alouette/Actions/PressableBox",
  component: PressableBox,
  parameters: {
    componentSubtitle:
      "Foundation pressable container that drives all alouette button-like components.",
  },
} satisfies Meta<typeof PressableBox>;

export const PreviewStory: ThisStory = {
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  render: () => (
    <PressableBox className="px-m py-xs rounded-sm">
      <Text className="text-on-tonal">Press me</Text>
    </PressableBox>
  ),
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <View className="flex-row gap-m flex-wrap">
          {VARIANTS.map((variant) => (
            <PressableBox
              key={variant}
              variant={variant}
              className="px-m py-xs rounded-sm"
            >
              <Text className={inkOf(variant)}>{variant}</Text>
            </PressableBox>
          ))}
        </View>
      </Story.Section>

      <Story.Section title="Accent themes">
        {neutralAndAccents.map((accent) => (
          <Story.SubSection key={accent} withSurface title={accent}>
            <View className="gap-xs">
              {VARIANTS.map((variant) => (
                <PressableBox
                  key={variant}
                  accent={accent}
                  variant={variant}
                  className="px-m py-xs rounded-sm self-start"
                >
                  <Text className={inkOf(variant)}>{variant}</Text>
                </PressableBox>
              ))}
            </View>
          </Story.SubSection>
        ))}
      </Story.Section>
    </Story>
  ),
};

export const Tests: ThisStory = {
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Roles">
        <PressableBox className="px-m py-xs rounded-sm self-start">
          <Text className="text-on-tonal">Plain</Text>
        </PressableBox>
        <PressableBox
          href="/destination"
          className="px-m py-xs rounded-sm self-start"
        >
          <Text className="text-on-tonal">Linked</Text>
        </PressableBox>
        <PressableBox
          href="/destination"
          role="menuitem"
          className="px-m py-xs rounded-sm self-start"
        >
          <Text className="text-on-tonal">Menu row</Text>
        </PressableBox>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("button", { name: "Plain" }),
    ).not.toHaveAttribute("href");

    const link = canvas.getByRole("link", { name: "Linked" });
    await expect(link.tagName).toBe("A");
    await expect(link).toHaveAttribute("href", "/destination");

    // A caller's own role still wins over the href-derived one, as MenuItem
    // needs on a row that keeps announcing itself as a menu item.
    await expect(
      canvas.getByRole("menuitem", { name: "Menu row" }),
    ).toHaveAttribute("href", "/destination");
  },
};

// `outlineColor` is reported as `rgb(...)`; a token is hex (or oklch), so it
// is resolved through a probe element.
function toRgb(color: string, root: HTMLElement): string {
  const probe = document.createElement("span");
  probe.style.color = color;
  root.append(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved;
}

export const FocusRing: ThisStory = {
  render: () => (
    <Story noDarkMode>
      <Story.Section title="focus-visible rings in the accent ink">
        <View className="flex-row gap-m flex-wrap">
          {VARIANTS.map((variant) => (
            <PressableBox
              key={variant}
              variant={variant}
              className="px-m py-xs rounded-sm"
            >
              <Text className={inkOf(variant)}>{variant}</Text>
            </PressableBox>
          ))}
          <PressableBox
            variant="filled"
            withFocusVisibleOutline="inset"
            className="px-m py-xs rounded-sm"
          >
            <Text className="text-on-accent">inset</Text>
          </PressableBox>
        </View>
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tonal = canvas.getByRole("button", { name: "tonal" });
    const accent = toRgb(
      getComputedStyle(tonal).getPropertyValue("--color-accent"),
      canvasElement,
    );
    const restGround = getComputedStyle(tonal).backgroundColor;

    // A mouse click leaves the focus behind, never a changed ground. (The ring
    // cannot be asserted here: the synthetic click counts as keyboard input
    // for `:focus-visible`.)
    await userEvent.click(tonal);
    await expect(tonal).toHaveFocus();
    await userEvent.unhover(tonal);
    await expect(getComputedStyle(tonal).backgroundColor).toBe(restGround);

    // Tab brings the ring: inset on tonal and soft, 2px outside on filled and
    // outlined, in the accent ink everywhere.
    await userEvent.tab({ shift: true });
    await userEvent.tab();
    await expect(tonal).toHaveFocus();
    await expect(getComputedStyle(tonal).outlineWidth).toBe("2px");
    await expect(getComputedStyle(tonal).outlineOffset).toBe("-2px");
    await expect(getComputedStyle(tonal).outlineColor).toBe(accent);
    await expect(getComputedStyle(tonal).backgroundColor).toBe(restGround);

    for (const [name, offset] of [
      ["filled", "2px"],
      ["outlined", "2px"],
      ["soft", "-2px"],
    ]) {
      await userEvent.tab();
      const button = canvas.getByRole("button", { name });
      await expect(button).toHaveFocus();
      await expect(getComputedStyle(button).outlineWidth).toBe("2px");
      await expect(getComputedStyle(button).outlineOffset).toBe(offset);
      await expect(getComputedStyle(button).outlineColor).toBe(accent);
    }

    // An explicit `inset` for a pressable whose parent clips.
    await userEvent.tab();
    const inset = canvas.getByRole("button", { name: "inset" });
    await expect(inset).toHaveFocus();
    await expect(getComputedStyle(inset).outlineOffset).toBe("-2px");
  },
};

export const TonalGroundWarning: ThisStory = {
  // The warning fires as the pressable mounts, before `play` could spy on it.
  beforeEach: () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    return () => {
      warn.mockRestore();
    };
  },
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Accented surface">
        <Box accent="brand" className="surface gap-xs">
          <PressableBox className="px-m py-xs rounded-sm self-start">
            <Text className="text-on-tonal">Dissolves</Text>
          </PressableBox>
          <PressableBox
            accent="neutral"
            className="px-m py-xs rounded-sm self-start"
          >
            <Text className="text-on-tonal">Neutral</Text>
          </PressableBox>
        </Box>
      </Story.Section>
      <Story.Section title="Neutral ground in an accented theme">
        <Box accent="brand" className="bg-highlight p-m rounded-sm">
          <PressableBox className="px-m py-xs rounded-sm self-start">
            <Text className="text-on-tonal">On highlight</Text>
          </PressableBox>
        </Box>
      </Story.Section>
      <Story.Section title="Neutral on a white panel">
        <Box className="bg-highlight p-m rounded-sm gap-xs">
          <PressableBox
            accent="neutral"
            className="px-m py-xs rounded-sm self-start"
          >
            <Text className="text-on-tonal">Dissolves too</Text>
          </PressableBox>
          <PressableBox
            accent="neutral"
            variant="soft"
            className="px-m py-xs rounded-sm self-start"
          >
            <Text className="text-sharp">Soft</Text>
          </PressableBox>
        </Box>
      </Story.Section>
    </Story>
  ),
  play: async () => {
    const warnings = mocked(console.warn).mock.calls.filter(([message]) =>
      String(message).includes("tonal pressable rests on its own ground"),
    );
    // "Dissolves" and "Dissolves too"; never the neutral pressable on an
    // accented surface, the accented one on a white panel, or a soft one.
    // A production build (`storybook build`, as Chromatic runs) drops the check.
    await expect(warnings).toHaveLength(
      process.env.NODE_ENV === "production" ? 0 : 2,
    );
  },
};
