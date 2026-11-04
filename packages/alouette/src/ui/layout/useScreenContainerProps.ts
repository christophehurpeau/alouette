import {
  Platform,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  type SafeAreaEdge,
  useSafeAreaTopOverlayHeight,
} from "../../core/SafeAreaEdgesContext";
import { twMerge } from "../../core/twMerge";
import { useResolvedScreenSafeAreaPadding } from "../../core/useScreenSafeAreaPadding";

type ContentInsetAdjustmentBehavior = NonNullable<
  ScrollViewProps["contentInsetAdjustmentBehavior"]
>;

export interface ScreenSafeAreaProps {
  /**
   * Safe-area edges to pad. Defaults to every edge an ancestor `SafeAreaScope`
   * has not declared consumed. Passing it also makes iOS pad by hand, like
   * Android, instead of insetting from the bars that cover the container.
   */
  edges?: readonly SafeAreaEdge[];
}

interface ScreenContainerParams extends ScreenSafeAreaProps {
  className?: string;
  contentContainerClassName?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  contentInsetAdjustmentBehavior?: ContentInsetAdjustmentBehavior;
}

interface ScreenContainerProps {
  className: string;
  contentContainerClassName: string;
  contentContainerStyle: StyleProp<ViewStyle>;
  contentInsetAdjustmentBehavior?: ContentInsetAdjustmentBehavior;
}

/**
 * On iOS, UIKit insets the content from what covers the container (status bar,
 * a translucent or opaque native header, home indicator, tab bar), which no
 * safe-area inset can tell: under the iOS 26 glass header the content starts at
 * the top of the screen. An explicit `edges` or a `topOverlayHeight` asks for
 * the manual padding instead.
 */
function useContentInsetAdjustmentBehavior(
  edges: readonly SafeAreaEdge[] | undefined,
  requested: ContentInsetAdjustmentBehavior | undefined,
): ContentInsetAdjustmentBehavior | undefined {
  const topOverlayHeight = useSafeAreaTopOverlayHeight();
  if (requested !== undefined || Platform.OS !== "ios") return requested;
  return edges === undefined && topOverlayHeight === 0 ? "automatic" : "never";
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
  contentInsetAdjustmentBehavior,
  edges,
}: ScreenContainerParams): ScreenContainerProps {
  const resolvedBehavior = useContentInsetAdjustmentBehavior(
    edges,
    contentInsetAdjustmentBehavior,
  );
  const safeAreaPadding = useResolvedScreenSafeAreaPadding(
    edges,
    resolvedBehavior !== undefined && resolvedBehavior !== "never",
  );
  return {
    className: twMerge("bg-screen min-h-full", className),
    contentContainerClassName: twMerge("grow", contentContainerClassName),
    contentContainerStyle: safeAreaPadding
      ? [contentContainerStyle, safeAreaPadding]
      : contentContainerStyle,
    contentInsetAdjustmentBehavior: resolvedBehavior,
  };
}
