import type { ReactNode } from "react";
import { type FlatListProps } from "../primitives/FlatList";
import { type ScreenSafeAreaProps } from "./useScreenContainerProps";
export interface ScreenFlatListProps<ItemT> extends FlatListProps<ItemT>, ScreenSafeAreaProps {
}
/** A `FlatList` filling the screen, with safe-area insets as content padding. */
export declare function ScreenFlatList<ItemT>({ className, contentContainerClassName, contentContainerStyle, edges, ...props }: ScreenFlatListProps<ItemT>): ReactNode;
//# sourceMappingURL=ScreenFlatList.d.ts.map