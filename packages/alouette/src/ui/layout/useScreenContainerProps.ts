import type { StyleProp, ViewStyle } from "react-native";
import { twMerge } from "tailwind-merge";
import type { SafeAreaEdge } from "../../core/SafeAreaEdgesContext";
import { useScreenSafeAreaPadding } from "../../core/useScreenSafeAreaPadding";

export interface ScreenSafeAreaProps {
  /**
   * Safe-area edges to pad. Defaults to every edge an ancestor `SafeAreaScope`
   * has not declared consumed.
   */
  edges?: readonly SafeAreaEdge[];
}

interface ScreenContainerParams extends ScreenSafeAreaProps {
  className?: string;
  contentContainerClassName?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

interface ScreenContainerProps {
  className: string;
  contentContainerClassName: string;
  contentContainerStyle: StyleProp<ViewStyle>;
}

/**
 * Frame and content-container styling shared by the screen scroll containers:
 * a `bg-screen` frame filling the screen, a growing content container, and the
 * safe-area insets as content padding so the background bleeds under the system
 * bars while the content clears them.
 */
export function useScreenContainerProps({
  className,
  contentContainerClassName,
  contentContainerStyle,
  edges,
}: ScreenContainerParams): ScreenContainerProps {
  const safeAreaPadding = useScreenSafeAreaPadding(edges);
  return {
    className: twMerge("bg-screen min-h-full", className),
    contentContainerClassName: twMerge("grow", contentContainerClassName),
    contentContainerStyle: safeAreaPadding
      ? [contentContainerStyle, safeAreaPadding]
      : contentContainerStyle,
  };
}
