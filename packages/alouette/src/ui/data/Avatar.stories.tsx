import { expect, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RobotRegularIcon } from "alouette-icons/phosphor-icons/Robot";
import { UserRegularIcon } from "alouette-icons/phosphor-icons/User";
import type { ReactNode } from "react";
import type { SVGIconElement } from "../primitives/Icon";
import { View } from "../primitives/View";
import { Story, accentsWithoutNeutral } from "../story-components/Story";
import { Avatar, type AvatarProps } from "./Avatar";

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
    variant: {
      control: "inline-radio",
      options: ["solid", "enabled"],
      table: { defaultValue: { summary: "solid" } },
    },
    accent: { control: "select", options: accentsWithoutNeutral },
  },
} satisfies Meta<typeof Avatar>;

export const PreviewAvatarStory: ThisStory = {
  name: "Avatar Preview",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  args: { name: "Camille Hurel" },
  render: (args) => <Avatar {...args} />,
};

interface SizeRowProps {
  name?: string;
  icon?: SVGIconElement;
  variant?: AvatarProps["variant"];
}

function SizeRow({ name, icon, variant }: SizeRowProps): ReactNode {
  return (
    <View className="flex-row gap-xs items-center">
      <Avatar name={name} icon={icon} variant={variant} size="sm" />
      <Avatar name={name} icon={icon} variant={variant} size="md" />
      <Avatar name={name} icon={icon} variant={variant} size="lg" />
    </View>
  );
}

interface AccentRowProps {
  variant: AvatarProps["variant"];
}

function AccentRow({ variant }: AccentRowProps): ReactNode {
  return (
    <View className="flex-row gap-xs items-center flex-wrap">
      {accentsWithoutNeutral.map((accent) => (
        <Avatar
          key={accent}
          accent={accent}
          variant={variant}
          name="Camille Hurel"
        />
      ))}
      <Avatar variant={variant} icon={<UserRegularIcon />} />
    </View>
  );
}

export const VariantsAvatarStory: ThisStory = {
  name: "Avatar Variants",
  render: () => (
    <Story>
      <Story.Section withSurface title="Sizes">
        <Story.SubSection title="variant=solid (default)">
          <SizeRow name="Camille Hurel" />
          <SizeRow icon={<UserRegularIcon />} />
        </Story.SubSection>
        <Story.SubSection title="variant=enabled">
          <SizeRow name="Camille Hurel" variant="enabled" />
          <SizeRow icon={<UserRegularIcon />} variant="enabled" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section withSurface title="Accents">
        <Story.SubSection title="variant=solid (default)">
          <AccentRow variant="solid" />
        </Story.SubSection>
        <Story.SubSection title="variant=enabled">
          <AccentRow variant="enabled" />
        </Story.SubSection>
      </Story.Section>

      <Story.Section withSurface title="Initials">
        <View className="flex-row gap-xs items-center flex-wrap">
          <Avatar name="Camille Hurel" />
          <Avatar name="Camille Anne Hurel" />
          <Avatar name="Camille" />
          <Avatar icon={<RobotRegularIcon />} />
        </View>
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

    // Trimmed to the caps, the initials center on their ink rather than on
    // ascender + descender. tailwind-merge reads `text-trim-cap` as a text
    // color unless alouette's config registers it.
    await expect(getComputedStyle(canvas.getByText("CH")).textBoxTrim).toBe(
      "trim-both",
    );
  },
};
