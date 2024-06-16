import type { GetProps } from "@tamagui/core";
import { View, styled } from "@tamagui/core";
import * as variants from "./variants";

/** View with alouette variants */
export const Frame = styled(View, {
  name: "Frame",
  variants,
  animation: "fast",
} as const);

export type FrameProps = GetProps<typeof Frame>;
