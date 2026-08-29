import type { ReactNode } from "react";
import { type ScrollViewProps } from "../primitives/ScrollView";
import { type ScreenSafeAreaProps } from "./useScreenContainerProps";
export interface ScreenScrollViewProps extends ScrollViewProps, ScreenSafeAreaProps {
}
/** A `ScrollView` filling the screen, with safe-area insets as content padding. */
export declare function ScreenScrollView({ className, contentContainerClassName, contentContainerStyle, edges, ...props }: ScreenScrollViewProps): ReactNode;
//# sourceMappingURL=ScreenScrollView.d.ts.map