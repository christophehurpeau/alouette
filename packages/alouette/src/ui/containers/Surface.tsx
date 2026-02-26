import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ComponentType } from "react";
import { Box } from "./Box";

export const SurfaceFrame = styled(Box, {
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

type SurfaceFrameProps = GetProps<typeof SurfaceFrame>;

export type SurfaceProps = Pick<
  SurfaceFrameProps,
  | "children"
  | "layer"
  | "lowered"
  | "marginBottom"
  | "marginTop"
  | "shadow"
  | "size"
  | "theme"
>;

export const Surface: ComponentType<SurfaceProps> = SurfaceFrame;
