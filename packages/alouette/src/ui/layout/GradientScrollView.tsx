import { type ReactNode, forwardRef } from "react";
import {
  ScrollView as RNScrollView,
  type ScrollViewProps as RNScrollViewProps,
  View,
} from "react-native";
import { useCSSVariable } from "uniwind";
import type { SemanticRole } from "../../core/AlouetteConfig";
import { SemanticScope } from "../containers/SemanticScope";
import { GradientBackground } from "./GradientBackground";

interface GradientScrollViewInnerProps extends RNScrollViewProps {
  children?: ReactNode;
}

const GradientScrollViewInner = forwardRef<
  RNScrollView,
  GradientScrollViewInnerProps
>(({ children, ...scrollViewProps }, ref) => {
  const [gradientStart, gradientEnd] = useCSSVariable([
    "--color-screen-gradient-start",
    "--color-screen-gradient-end",
  ]);
  return (
    <RNScrollView ref={ref} {...scrollViewProps}>
      <View
        className="absolute left-0 right-0"
        style={{
          top: -600,
          height: 600,
          backgroundColor: gradientStart as string,
        }}
      />
      <View
        className="absolute left-0 right-0"
        style={{
          bottom: -600,
          height: 600,
          backgroundColor: gradientEnd as string,
        }}
      />
      <GradientBackground />
      {children}
    </RNScrollView>
  );
});

export interface GradientScrollViewProps extends RNScrollViewProps {
  children?: ReactNode;
  semanticRole: SemanticRole;
}

export const GradientScrollView = forwardRef<
  RNScrollView,
  GradientScrollViewProps
>(({ semanticRole, children, ...scrollViewProps }, ref) => {
  return (
    <SemanticScope semanticRole={semanticRole}>
      <GradientScrollViewInner ref={ref} {...scrollViewProps}>
        {children}
      </GradientScrollViewInner>
    </SemanticScope>
  );
});
