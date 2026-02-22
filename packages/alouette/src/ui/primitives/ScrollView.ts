import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { ScrollView as ScrollViewNative } from "react-native";

export const ScrollView = styled(
  ScrollViewNative,
  {} as const,
  {
    accept: {
      contentContainerStyle: "style",
    },
  } as const,
);

export type ScrollView = Pick<ScrollViewNative, "scrollTo">;

export type ScrollViewProps = GetProps<typeof ScrollView>;
