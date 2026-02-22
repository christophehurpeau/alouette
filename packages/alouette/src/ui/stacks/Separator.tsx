import type { GetProps } from "@tamagui/core";
import { View, styled } from "@tamagui/core";

export const Separator = styled(View, {
  flexGrow: 1,
  flexShrink: 0,
  height: 0,
  maxHeight: 0,
  borderColor: "$border-sharp",
  borderWidth: 0,
  borderBottomWidth: 1,
  y: -0.5,

  variants: {
    vertical: {
      true: {
        height: "auto",
        maxHeight: "auto",
        width: 0,
        maxWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 1,
        y: 0,
        x: -0.5,
      },
    },
  } as const,
} as const);

export type SeparatorProps = GetProps<typeof Separator>;
