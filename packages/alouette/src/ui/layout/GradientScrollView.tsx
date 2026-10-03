import type { ReactNode, Ref } from "react";
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
  ref?: Ref<RNScrollView>;
}

function GradientScrollViewInner({
  children,
  ...scrollViewProps
}: GradientScrollViewInnerProps): ReactNode {
  return (
    <RNScrollView {...scrollViewProps}>
      <View className="absolute left-0 right-0 top-[-600] height-[600] bg-screen-gradient-start" />
      <View className="absolute left-0 right-0 bottom-[-600] height-[600] bg-screen-gradient-end" />
      <GradientBackground />
      {children}
    </RNScrollView>
  );
}

export interface GradientScrollViewProps extends RNScrollViewProps {
  children?: ReactNode;
  accent: Accent;
  ref?: Ref<RNScrollView>;
}

export function GradientScrollView({
  accent,
  children,
  ...scrollViewProps
}: GradientScrollViewProps): ReactNode {
  return (
    <AccentScope accent={accent}>
      <GradientScrollViewInner {...scrollViewProps}>
        {children}
      </GradientScrollViewInner>
    </AccentScope>
  );
}
