import type { Meta, StoryObj } from "@storybook/react";
import { Theme } from "@tamagui/core";
import * as AllPhosphorIcons from "alouette-icons/phosphor-icons";
import { Story } from "../story-components/Story";
import { Icon } from "./Icon";

export default {
  title: "alouette/Primitives/Icon",
  component: Icon,
} satisfies Meta<unknown>;

export const IconStory: StoryObj = {
  name: "Icon",
  render: () => (
    <Story
      preview={<Icon icon={<AllPhosphorIcons.ArrowUpLeftRegularIcon />} />}
    >
      <Story.Section title="Themes">
        {(["primary", "danger"] as const).map((theme) => (
          <Theme key={theme} name={theme}>
            <Icon
              color="$mainColor"
              size={42}
              icon={<AllPhosphorIcons.ArrowUpLeftRegularIcon />}
            />
          </Theme>
        ))}
      </Story.Section>
    </Story>
  ),
};
