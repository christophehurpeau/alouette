import { View, styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { fullscreenStyle } from "./createVariants.ts";

const variants = {
  fullscreen: {
    true: fullscreenStyle,
  },
} as const;

export const Stack = styled(View, {
  name: "Stack",
  variants: {
    ...variants,
    type: {
      h: { flexDirection: "row" },
      v: { flexDirection: "column" },
    },
  } as const,
});

export type StackProps = GetProps<typeof Stack>;

export const HStack = styled(View, {
  name: "HStack",
  flexDirection: "row",
  variants,
});

export type HStackProps = GetProps<typeof HStack>;

export const VStack = styled(View, {
  name: "VStack",
  flexDirection: "column",
});

export type VStackProps = GetProps<typeof VStack>;
