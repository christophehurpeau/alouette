import type { GetProps } from "@tamagui/core";
import { View, styled } from "@tamagui/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as variants from "./variants";

/** View with alouette variants */
export const Box = styled(View, {
  name: "Box",
  variants,
  animation: "fast",
} as const);

export type BoxProps = GetProps<typeof Box>;

export const SafeAreaBox = Box.styleable<{
  padding?: never;
  paddingTop?: never;
  paddingBottom?: never;
  paddingLeft?: never;
  paddingRight?: never;
}>((props) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      {...props}
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    />
  );
});

export type SafeAreaBoxProps = GetProps<typeof SafeAreaBox>;
