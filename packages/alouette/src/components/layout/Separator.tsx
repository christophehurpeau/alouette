import type { GetProps } from "@tamagui/core";
import { Stack, styled } from "@tamagui/core";

export const Separator = styled(Stack, {
  name: "Separator",
  flexGrow: 1,
  flexShrink: 0,
  height: 0,
  maxHeight: 0,
  borderColor: "$borderColor",
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
