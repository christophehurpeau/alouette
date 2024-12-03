import type { Meta, StoryObj } from "@storybook/react";
import { View } from "@tamagui/core";
import { Story } from "../story-components/Story";
import {
  Typography,
  TypographyParagraphWithContext,
  TypographyWithContext,
} from "./Typography";

type ThisStory = StoryObj<typeof Typography>;

export default {
  title: "alouette/Typography/Typography",
  component: Typography,
} satisfies Meta<typeof Typography>;

export const BodyStory: ThisStory = {
  name: "Typography",
  render: () => (
    <Story>
      <Story.Section title="Sizes">
        {(["xl", "lg", "md", "sm", "xs"] as const).flatMap((size) =>
          (["regular", "bold", "black"] as const).map((weight) => (
            <View key={`${size}-${weight}`}>
              <Typography size={size} weight={weight}>
                Body {size}/{weight}
              </Typography>
            </View>
          )),
        )}
      </Story.Section>

      <Story.Section title="Paragraph">
        <TypographyParagraphWithContext size="xl" color="black">
          The future is in{" "}
          <TypographyWithContext weight="bold">
            our{" "}
            <TypographyWithContext theme="primary">hands</TypographyWithContext>
          </TypographyWithContext>{" "}
          <TypographyWithContext theme="danger">
            to{" "}
            <TypographyWithContext weight="bold">shape</TypographyWithContext>
          </TypographyWithContext>
        </TypographyParagraphWithContext>
      </Story.Section>
    </Story>
  ),
};
