import { styled } from "nativewind";
import type { ComponentType } from "react";
import {
  ScrollView as RNScrollView,
  type ScrollViewProps as RNScrollViewProps,
} from "react-native";

export type ScrollViewProps = RNScrollViewProps;

export const ScrollView = styled(RNScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
}) as ComponentType<ScrollViewProps>;
