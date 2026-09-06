import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../primitives/Text";
import { HStack, VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { PressableBox } from "./PressableBox";

type ThisStory = StoryObj<typeof PressableBox>;

const VARIANTS = ["contained", "outlined", "soft"] as const;

export default {
  title: "alouette/Actions/PressableBox",
  component: PressableBox,
  parameters: {
    componentSubtitle:
      "Foundation pressable container that drives all alouette button-like components.",
  },
} satisfies Meta<typeof PressableBox>;

export const PreviewStory: ThisStory = {
  render: () => (
    <PressableBox className="px-m py-xs rounded-sm">
      <Text className="text-on-accent">Press me</Text>
    </PressableBox>
  ),
};

export const Variants: ThisStory = {
  render: () => (
    <Story>
      <Story.Section title="Variants">
        <HStack className="gap-m flex-wrap">
          {VARIANTS.map((variant) => (
            <PressableBox
              key={variant}
              variant={variant}
              className="px-m py-xs rounded-sm"
            >
              <Text
                className={
                  variant === "contained" ? "text-on-accent" : "text-sharp"
                }
              >
                {variant}
              </Text>
            </PressableBox>
          ))}
        </HStack>
      </Story.Section>

      <Story.Section title="Accent themes">
        {accents.map((accent) => (
          <Story.SubSection
            key={accent}
            withSurface
            title={accent}
            accent={accent}
          >
            <VStack className="gap-xs">
              {VARIANTS.map((variant) => (
                <PressableBox
                  key={variant}
                  variant={variant}
                  className="px-m py-xs rounded-sm self-start"
                >
                  <Text
                    className={
                      variant === "contained" ? "text-on-accent" : "text-sharp"
                    }
                  >
                    {variant}
                  </Text>
                </PressableBox>
              ))}
            </VStack>
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
          <Text className="text-on-accent">Plain</Text>
        </PressableBox>
        <PressableBox
          href="/destination"
          className="px-m py-xs rounded-sm self-start"
        >
          <Text className="text-on-accent">Linked</Text>
        </PressableBox>
        <PressableBox
          href="/destination"
          role="menuitem"
          className="px-m py-xs rounded-sm self-start"
        >
          <Text className="text-on-accent">Menu row</Text>
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
