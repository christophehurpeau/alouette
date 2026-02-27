import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { Box } from "./Box";

export const Surface = styled(Box, {
  layer: "surface",
  shadow: "s",

  overflow: "hidden", // make sure the boxshadow respects the borderRadius.

  variants: {
    size: {
      sm: {
        padding: "$1.0",
        borderRadius: "$sm",
      },
      md: {
        padding: "$2.0",
        borderRadius: "$md",
      },
      lg: {
        padding: "$3.0",
        borderRadius: "$lg",
      },
    },

    lowered: {
      true: {
        layer: "lowered",
        shadow: "lowered",
      },
    },
  } as const,

  defaultVariants: {
    size: "md",
  },
});

export type SurfaceProps = GetProps<typeof Surface>;
