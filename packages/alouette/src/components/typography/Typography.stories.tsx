import type { Meta, StoryObj } from "@storybook/react-vite";
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
  parameters: {
    componentSubtitle:
      "A foundational text component that provides consistent text styling across the application",
    docs: {
      description: {
        component: `### Features
- **Sizes**: Available in 5 sizes (xs, sm, md, lg, xl) with matching line heights
- **Weights**: Supports 3 font weights (regular, bold, black)
- **Font Families**: Can switch between body and heading font families
- **Contrast**: Optional high contrast mode for better visibility
- **Context Awareness**: Includes context-aware variants (TypographyWithContext and TypographyParagraphWithContext) that inherit size from parent

### Variants
- \`size\`: Controls font size and line height (xs | sm | md | lg | xl)
- \`weight\`: Sets font weight (regular | bold | black)
- \`family\`: Changes font family (body | heading)
- \`contrast\`: Toggles between normal and high contrast text color (boolean)

### Usage
~~~tsx
// Basic usage
<Typography size="md" weight="regular">Regular text</Typography>

// With context
<TypographyParagraphWithContext size="xl">
  Parent text
  <TypographyWithContext weight="bold">
    Inherits xl size from parent
  </TypographyWithContext>
</TypographyParagraphWithContext>
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
