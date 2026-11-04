import type { ReactNode } from "react";
import { ScrollView, type ScrollViewProps } from "../primitives/ScrollView";
import {
  type ScreenSafeAreaProps,
  useScreenContainerProps,
} from "./useScreenContainerProps";

export interface ScreenScrollViewProps
  extends ScrollViewProps, ScreenSafeAreaProps {}

/** A `ScrollView` filling the screen, with safe-area insets as content padding. */
export function ScreenScrollView({
  className,
  contentContainerClassName,
  contentContainerStyle,
  contentInsetAdjustmentBehavior,
  edges,
  ...props
}: ScreenScrollViewProps): ReactNode {
  const containerProps = useScreenContainerProps({
    className,
    contentContainerClassName,
    contentContainerStyle,
    contentInsetAdjustmentBehavior,
    edges,
  });
  return <ScrollView {...containerProps} {...props} />;
}
