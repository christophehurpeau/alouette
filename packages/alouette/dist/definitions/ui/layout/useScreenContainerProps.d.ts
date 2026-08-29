import type { StyleProp, ViewStyle } from "react-native";
import type { SafeAreaEdge } from "../../core/SafeAreaEdgesContext";
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
export declare function useScreenContainerProps({ className, contentContainerClassName, contentContainerStyle, edges, }: ScreenContainerParams): ScreenContainerProps;
export {};
//# sourceMappingURL=useScreenContainerProps.d.ts.map