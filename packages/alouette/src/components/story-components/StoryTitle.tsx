import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { Typography } from "../typography/Typography.tsx";

export const StoryTitle = styled(Typography, {
  family: "heading",
  weight: "black",
  variants: {
    level: {
      1: { size: "xl", marginBottom: "$8" },
      2: { size: "lg", marginBottom: "$8" },
      3: { size: "md", marginBottom: "$3" },
      4: { size: "sm", marginBottom: "$3" },
    },
  } as const,

  defaultVariants: {
    level: 1,
  },
} as const);

export type StoryTitleProps = GetProps<typeof StoryTitle>;
