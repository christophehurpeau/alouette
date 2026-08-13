import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircleRegularIcon } from "alouette-icons/phosphor-icons/CheckCircleRegularIcon";
import { StarRegularIcon } from "alouette-icons/phosphor-icons/StarRegularIcon";
import { VStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
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
  args: {
    icon: <CheckCircleRegularIcon />,
    children: "Works on web, iOS and Android",
  },
  render: (args) => <Bullet {...args} />,
};

export const BulletVariantsStory: ThisStory = {
  name: "Bullet Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="List">
        <VStack className="gap-xs">
          <Bullet icon={<CheckCircleRegularIcon />}>Consistent UI</Bullet>
          <Bullet icon={<CheckCircleRegularIcon />}>Accessible</Bullet>
          <Bullet icon={<CheckCircleRegularIcon />}>Animated</Bullet>
        </VStack>
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

      {accents.map((accent) => (
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
