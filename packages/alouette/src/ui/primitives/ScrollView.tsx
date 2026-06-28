import { styled } from "nativewind";
import type { ComponentType } from "react";
import {
  ScrollView as RNScrollView,
  type ScrollViewProps as RNScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

export type ScrollViewProps = RNScrollViewProps;

interface StyledScrollViewProps {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const ScrollView = styled(
  RNScrollView as unknown as ComponentType<StyledScrollViewProps>,
  {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
  },
) as ComponentType<ScrollViewProps>;
