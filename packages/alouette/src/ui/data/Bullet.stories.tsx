import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircleRegularIcon } from "alouette-icons/phosphor-icons/CheckCircleRegularIcon";
import { StarRegularIcon } from "alouette-icons/phosphor-icons/StarRegularIcon";
import { View } from "../primitives/View";
import { Story, accentsWithoutNeutral } from "../story-components/Story";
import { Bullet } from "./Bullet";

type ThisStory = StoryObj<typeof Bullet>;

export default {
  title: "alouette/Data/Bullet",
  component: Bullet,
  parameters: {
    componentSubtitle: "A list item pairing an accent icon with text",
  },
  argTypes: {
    icon: { description: "The leading icon", control: false },
    children: { description: "The content of the bullet", control: "text" },
  },
} satisfies Meta<typeof Bullet>;

export const BulletPreviewStory: ThisStory = {
  name: "Bullet Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: {
    icon: <CheckCircleRegularIcon />,
    children: "Works on web, iOS and Android",
  },
  render: (args) => <Bullet {...args} />,
  play: async ({ canvasElement }) => {
    const text = within(canvasElement).getByText(
      "Works on web, iOS and Android",
    );
    const svg = canvasElement.querySelector("svg");
    if (!svg) throw new Error("Bullet icon not rendered");
    const icon: SVGSVGElement = svg;

    function measure(): {
      iconRect: DOMRect;
      lineTop: number;
      lineHeight: number;
    } {
      return {
        iconRect: icon.getBoundingClientRect(),
        lineTop: text.getBoundingClientRect().top,
        lineHeight: Number.parseFloat(getComputedStyle(text).lineHeight),
      };
    }

    const root = document.documentElement;
    try {
      root.style.fontSize = "16px";
      const fits = measure();
      await expect(
        Math.abs(
          fits.iconRect.top +
            fits.iconRect.height / 2 -
            (fits.lineTop + fits.lineHeight / 2),
        ),
      ).toBeLessThan(0.1);

      root.style.fontSize = "14px";
      const overflows = measure();
      await expect(
        Math.abs(
          overflows.iconRect.bottom -
            (overflows.lineTop + overflows.lineHeight),
        ),
      ).toBeLessThan(0.1);
    } finally {
      root.style.fontSize = "";
    }
  },
};

export const BulletVariantsStory: ThisStory = {
  name: "Bullet Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="List">
        <View className="gap-xs">
          <Bullet icon={<CheckCircleRegularIcon />}>Consistent UI</Bullet>
          <Bullet icon={<CheckCircleRegularIcon />}>Accessible</Bullet>
          <Bullet icon={<CheckCircleRegularIcon />}>Animated</Bullet>
        </View>
      </Story.Section>

      <Story.Section withSurface title="Icons">
        <Bullet icon={<CheckCircleRegularIcon />}>Check circle</Bullet>
        <Bullet icon={<StarRegularIcon />}>Star</Bullet>
      </Story.Section>

      <Story.Section withSurface title="Wrapping text">
        <Bullet icon={<CheckCircleRegularIcon />}>
          A long bullet whose text wraps onto several lines, so the icon stays
          aligned with the first line while the text shrinks to the available
          width.
        </Bullet>
      </Story.Section>

      <Story.Section withSurface title="Without children">
        <Bullet icon={<CheckCircleRegularIcon />} />
      </Story.Section>

      {accentsWithoutNeutral.map((accent) => (
        <Story.Section
          key={accent}
          withSurface
          accent={accent}
          title={`Accent: ${accent}`}
        >
          <Bullet icon={<CheckCircleRegularIcon />}>{accent}</Bullet>
        </Story.Section>
      ))}
    </Story>
  ),
};
