import { View, styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import type { ComponentType } from "react";
import { absoluteFillStyle } from "./utils/absoluteFillStyle";

const variants = {
  absoluteFill: {
    true: absoluteFillStyle,
  },
} as const;

export const Stack = styled(View, {
  name: "Stack",
  flexDirection: "row",
  flexWrap: "wrap",
  variants,
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

const CenterFrame = styled(View, {
  justifyContent: "center",
  alignItems: "center",
  variants,
});

export type CenterProps = Pick<
  GetProps<typeof CenterFrame>,
  "absoluteFill" | "children" | "flexGrow" | "flexShrink"
>;

export const Center: ComponentType<CenterProps> = CenterFrame;
