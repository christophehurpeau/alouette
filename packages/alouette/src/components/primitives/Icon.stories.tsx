import type { Meta, StoryObj } from "@storybook/react";
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
    />
  ),
};
