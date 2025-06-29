import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { Box } from "./Box";

export const PressableBox = styled(Box, {
  interactive: true,
} as const);

export type PressableBoxProps = GetProps<typeof PressableBox>;
