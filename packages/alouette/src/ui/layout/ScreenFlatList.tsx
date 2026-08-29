import type { ReactNode } from "react";
import { FlatList, type FlatListProps } from "../primitives/FlatList";
import {
  type ScreenSafeAreaProps,
  useScreenContainerProps,
} from "./useScreenContainerProps";

export interface ScreenFlatListProps<ItemT>
  extends FlatListProps<ItemT>, ScreenSafeAreaProps {}

/** A `FlatList` filling the screen, with safe-area insets as content padding. */
export function ScreenFlatList<ItemT>({
  className,
  contentContainerClassName,
  contentContainerStyle,
  edges,
  ...props
}: ScreenFlatListProps<ItemT>): ReactNode {
  const containerProps = useScreenContainerProps({
    className,
    contentContainerClassName,
    contentContainerStyle,
    edges,
  });
  return <FlatList<ItemT> {...containerProps} {...props} />;
}
