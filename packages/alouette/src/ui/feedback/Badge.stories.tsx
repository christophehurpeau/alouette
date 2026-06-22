import type { Meta, StoryObj } from "@storybook/react-vite";
import { StarRegularIcon } from "alouette-icons/phosphor-icons/StarRegularIcon";
import { HStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { Badge } from "./Badge";

type ThisStory = StoryObj<typeof Badge>;

const VARIANTS = ["solid", "solid.enabled", "outlined"] as const;
const SIZES = ["sm", "md"] as const;

export default {
  title: "alouette/Feedback/Badge",
  component: Badge,
  parameters: {
    componentSubtitle: "A small label for status, counts, or categories",
  },
  argTypes: {
    accent: {
      description: "The accent of the badge",
      control: "select",
      options: accents,
      table: { defaultValue: { summary: "brand" } },
    },
    variant: {
      description: "The visual style of the badge",
      control: "select",
      options: VARIANTS,
      table: { defaultValue: { summary: "solid" } },
    },
    size: {
      description: "The size of the badge",
      control: "select",
      options: SIZES,
      table: { defaultValue: { summary: "md" } },
    },
    children: { description: "The content of the badge", control: "text" },
  },
} satisfies Meta<typeof Badge>;

export const BadgePreviewStory: ThisStory = {
  name: "Badge Preview",
  args: { accent: "brand", children: "New" },
  render: (args) => <Badge {...args} />,
};

export const BadgeVariantsStory: ThisStory = {
  name: "Badge Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="Variants">
        {VARIANTS.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </Story.Section>

      <Story.Section withSurface title="Accents">
        {VARIANTS.map((variant) => (
          <HStack key={variant} className="gap-xs flex-wrap">
            {accents.map((accent) => (
              <Badge key={accent} accent={accent} variant={variant}>
                {accent}
              </Badge>
            ))}
          </HStack>
        ))}
      </Story.Section>

      <Story.Section withSurface title="Sizes">
        {SIZES.map((size) => (
          <HStack key={size} className="gap-xs items-center">
            <Badge size={size}>{size}</Badge>
            <Badge size={size} icon={<StarRegularIcon />}>
              {size} with icon
            </Badge>
          </HStack>
        ))}
      </Story.Section>
    </Story>
  ),
};
