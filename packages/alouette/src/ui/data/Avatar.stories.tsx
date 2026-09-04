import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RobotRegularIcon } from "alouette-icons/phosphor-icons/RobotRegularIcon";
import { UserRegularIcon } from "alouette-icons/phosphor-icons/UserRegularIcon";
import type { ReactNode } from "react";
import type { SVGIconElement } from "../primitives/Icon";
import { HStack } from "../stacks/stacks";
import { Story, accents } from "../story-components/Story";
import { Avatar } from "./Avatar";

type ThisStory = StoryObj<typeof Avatar>;

export default {
  title: "alouette/Data/Avatar",
  component: Avatar,
  parameters: {
    componentSubtitle:
      "Accent disc standing for a person or an account: their initials, or an icon.",
  },
  argTypes: {
    name: { control: "text" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    accent: { control: "select", options: accents },
  },
} satisfies Meta<typeof Avatar>;

export const PreviewAvatarStory: ThisStory = {
  name: "Avatar Preview",
  args: { name: "Camille Hurel" },
  render: (args) => <Avatar {...args} />,
};

interface SizeRowProps {
  name?: string;
  icon?: SVGIconElement;
}

function SizeRow({ name, icon }: SizeRowProps): ReactNode {
  return (
    <HStack className="gap-xs items-center">
      <Avatar name={name} icon={icon} size="sm" />
      <Avatar name={name} icon={icon} size="md" />
      <Avatar name={name} icon={icon} size="lg" />
    </HStack>
  );
}

export const VariantsAvatarStory: ThisStory = {
  name: "Avatar Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="Sizes">
        <SizeRow name="Camille Hurel" />
        <SizeRow icon={<UserRegularIcon />} />
      </Story.Section>

      <Story.Section withSurface title="Accents">
        <HStack className="gap-xs items-center flex-wrap">
          {accents.map((accent) => (
            <Avatar key={accent} accent={accent} name="Camille Hurel" />
          ))}
        </HStack>
      </Story.Section>

      <Story.Section withSurface title="Initials">
        <HStack className="gap-xs items-center flex-wrap">
          <Avatar name="Camille Hurel" />
          <Avatar name="Camille Anne Hurel" />
          <Avatar name="Camille" />
          <Avatar icon={<RobotRegularIcon />} />
        </HStack>
      </Story.Section>
    </Story>
  ),
};

export const TestsAvatarStory: ThisStory = {
  name: "Avatar Tests",
  render: () => (
    <Story noDarkMode>
      <Story.Section title="Initials">
        <Avatar name="Camille Hurel" />
        <Avatar name="Camille Anne Hurel" />
        <Avatar name="camille" />
      </Story.Section>
    </Story>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Two initials at most, whatever the name holds.
    await expect(canvas.getByText("CH")).toBeTruthy();
    await expect(canvas.getByText("CA")).toBeTruthy();
    await expect(canvas.getByText("C")).toBeTruthy();
  },
};
