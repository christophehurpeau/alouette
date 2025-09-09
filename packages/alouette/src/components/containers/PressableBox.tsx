import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { Box } from "./Box";

export const PressableBox = styled(Box, {
  interactive: true,

  variants: {
    variant: {
      contained: {
        withBackground: true,
      },
      outlined: {
        withBackground: true,
        withBorder: 2,
      },
      elevated: {
        withBackground: true,
        withElevation: true,
        withBorder: true,
        borderColor: "$contrastBorderColor",
      },
      "ghost-contained": {
        withBackground: true,
      },
      "ghost-outlined": {
        withBorder: 2,
        withBackground: true,
      },
    },
  },

  defaultVariants: {
    variant: "contained",
  },
} as const);

export type PressableBoxProps = GetProps<typeof PressableBox>;
