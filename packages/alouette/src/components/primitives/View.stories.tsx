import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../typography/Typography";
import { View } from "./View";

export default {
  title: "alouette/Primitives/View",
  component: View,
} satisfies Meta<unknown>;

export const ViewStory: StoryObj = {
  name: "View",
  render: () => (
    <>
      <View>
        <Typography>This is a view</Typography>
      </View>
      <View width={50} $medium={{ width: 80 }}>
        <Typography>
          This is another view with a width of "base": 50px "medium": 80px
        </Typography>
      </View>
    </>
  ),
};
