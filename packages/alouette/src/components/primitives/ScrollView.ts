import { GetProps, styled } from "@tamagui/core";
import { ScrollView as ScrollViewNative } from "react-native";
import { fullscreenStyle } from "./createVariants";

export const ScrollView = styled(
  ScrollViewNative,
  {
    name: "ScrollView",
    scrollEnabled: true,

    variants: {
      fullscreen: {
        true: fullscreenStyle,
      },
    },
  } as const,
  {
    accept: {
      contentContainerStyle: "style",
    },
  } as const,
);

export type ScrollView = Pick<ScrollViewNative, "scrollTo">;

export type ScrollViewProps = GetProps<typeof ScrollView>;
