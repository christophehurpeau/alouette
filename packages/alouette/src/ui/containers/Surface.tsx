import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ComponentType } from "react";
import { Box } from "./Box";

export const SurfaceFrame = styled(Box, {
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

    highlight: {
      true: {
        layer: "highlight",
      },
      false: {
        layer: "surface",
      },
      accent: {
        layer: "highlight-accent",
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
    highlight: false,
    size: "md",
  },
});

type SurfaceFrameProps = GetProps<typeof SurfaceFrame>;

export type SurfaceProps = Pick<
  SurfaceFrameProps,
  | "children"
  | "highlight"
  | "lowered"
  | "marginBottom"
  | "marginTop"
  | "shadow"
  | "size"
  | "theme"
>;

export const Surface: ComponentType<SurfaceProps> = SurfaceFrame;
