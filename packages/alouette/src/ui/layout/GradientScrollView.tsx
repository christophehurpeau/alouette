import { type ReactNode, forwardRef } from "react";
import {
  ScrollView as RNScrollView,
  type ScrollViewProps as RNScrollViewProps,
  View,
} from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { GradientBackground } from "./GradientBackground";

interface GradientScrollViewInnerProps extends RNScrollViewProps {
  children?: ReactNode;
}

const GradientScrollViewInner = forwardRef<
  RNScrollView,
  GradientScrollViewInnerProps
>(({ children, ...scrollViewProps }, ref) => {
  return (
    <RNScrollView ref={ref} {...scrollViewProps}>
      <View className="absolute left-0 right-0 top-[-600] height-[600] background-(--color-screen-gradient-start)" />
      <View className="absolute left-0 right-0 bottom-[-600] height-[600] background-(--color-screen-gradient-end)" />
      <GradientBackground />
      {children}
    </RNScrollView>
  );
});

export interface GradientScrollViewProps extends RNScrollViewProps {
  children?: ReactNode;
  accent: Accent;
}

export const GradientScrollView = forwardRef<
  RNScrollView,
  GradientScrollViewProps
>(({ accent, children, ...scrollViewProps }, ref) => {
  return (
    <AccentScope accent={accent}>
      <GradientScrollViewInner ref={ref} {...scrollViewProps}>
        {children}
      </GradientScrollViewInner>
    </AccentScope>
  );
});
