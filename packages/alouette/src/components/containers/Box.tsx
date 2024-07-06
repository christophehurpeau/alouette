import type { GetProps } from "@tamagui/core";
import { View, styled } from "@tamagui/core";
import * as variants from "./variants";

/** View with alouette variants */
export const Box = styled(View, {
  name: "Box",
  variants,
  animation: "fast",
} as const);

export type BoxProps = GetProps<typeof Box>;
