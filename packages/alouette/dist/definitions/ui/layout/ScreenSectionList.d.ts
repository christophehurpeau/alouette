import type { ReactNode } from "react";
import { type SectionListProps } from "../primitives/SectionList";
import { type ScreenSafeAreaProps } from "./useScreenContainerProps";
export interface ScreenSectionListProps<ItemT, SectionT> extends SectionListProps<ItemT, SectionT>, ScreenSafeAreaProps {
}
/** A `SectionList` filling the screen, with safe-area insets as content padding. */
export declare function ScreenSectionList<ItemT, SectionT>({ className, contentContainerClassName, contentContainerStyle, edges, ...props }: ScreenSectionListProps<ItemT, SectionT>): ReactNode;
//# sourceMappingURL=ScreenSectionList.d.ts.map