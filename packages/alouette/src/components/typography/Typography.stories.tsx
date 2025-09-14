import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "@tamagui/core";
import { Story } from "../story-components/Story";
import { Typography, TypographyParagraph } from "./Typography";

type ThisStory = StoryObj<typeof Typography>;

export default {
  title: "alouette/Typography/Typography",
  component: Typography,
  parameters: {
    componentSubtitle:
      "A foundational text component that provides consistent text styling across the application",
    docs: {
      description: {
        component: `### Features
- **Sizes**: Available in 5 sizes (xs, sm, md, lg, xl) with matching line heights
- **Weights**: Supports 3 font weights (regular, bold, extraBold)
- **Font Families**: Can switch between body and heading font families
- **Contrast**: Optional high contrast mode for better visibility

### Variants
- \`size\`: Controls font size and line height (xs | sm | md | lg | xl)
- \`weight\`: Sets font weight (regular | bold | extraBold)
- \`family\`: Changes font family (body | heading)
- \`contrast\`: Toggles between normal and high contrast text color (boolean)

### Usage
~~~tsx
// Basic usage
<Typography size="md" weight="regular">Regular text</Typography>

// With inherit
<TypographyParagraph size="xl">
  Parent text
  <Typography inherit weight="bold">
    Inherits xl size from parent
  </Typography>
</TypographyParagraph>
~~~`,
      },
    },
  },
} satisfies Meta<typeof Typography>;

export const BodyStory: ThisStory = {
  name: "Typography",
  render: () => (
    <Story>
      <Story.Section title="Sizes">
        {(["$xl", "$lg", "$md", "$sm", "$xs"] as const).flatMap((size) =>
          (["$regular", "$bold", "$extraBold"] as const).map((weight) => (
            <View key={`${size}-${weight}`}>
              <Typography size={size} weight={weight}>
                Body {size}/{weight}
              </Typography>
            </View>
          )),
        )}
      </Story.Section>

      <Story.Section title="Paragraph">
        <TypographyParagraph size="$xl" color="extraBold">
          The future is in{" "}
          <Typography inherit weight="$bold">
            our{" "}
            <Typography inherit accent theme="primary">
              hands
            </Typography>
          </Typography>{" "}
          <Typography inherit accent theme="danger">
            to{" "}
            <Typography inherit accent weight="$bold">
              shape
            </Typography>
          </Typography>
        </TypographyParagraph>
      </Story.Section>
    </Story>
  ),
};
