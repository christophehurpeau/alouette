import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { Frame } from "./Frame";

export const Pressable = styled(Frame, {
  interactive: true,
} as const);

export type PressableProps = GetProps<typeof Pressable>;
