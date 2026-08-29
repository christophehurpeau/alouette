import type { ReactNode } from "react";
import { SectionList, type SectionListProps } from "../primitives/SectionList";
import {
  type ScreenSafeAreaProps,
  useScreenContainerProps,
} from "./useScreenContainerProps";

export interface ScreenSectionListProps<ItemT, SectionT>
  extends SectionListProps<ItemT, SectionT>, ScreenSafeAreaProps {}

/** A `SectionList` filling the screen, with safe-area insets as content padding. */
export function ScreenSectionList<ItemT, SectionT>({
  className,
  contentContainerClassName,
  contentContainerStyle,
  edges,
  ...props
}: ScreenSectionListProps<ItemT, SectionT>): ReactNode {
  const containerProps = useScreenContainerProps({
    className,
    contentContainerClassName,
    contentContainerStyle,
    edges,
  });
  return <SectionList<ItemT, SectionT> {...containerProps} {...props} />;
}
