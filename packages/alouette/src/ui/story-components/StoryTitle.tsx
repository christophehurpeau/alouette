import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { Text } from "../primitives/Text";

export const StoryTitle = styled(Text, {
  family: "$heading",
  weight: "$extraBold",
  variants: {
    level: {
      1: { size: "$xl", marginBottom: "$2.0" },
      2: { size: "$lg", marginBottom: "$2.0" },
      3: { size: "$md", marginBottom: "$1.0" },
      4: { size: "$sm", marginBottom: "$1.0" },
    },
  } as const,

  defaultVariants: {
    level: 1,
  },
} as const);

export type StoryTitleProps = GetProps<typeof StoryTitle>;
