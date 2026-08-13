import type { ScrollViewProps } from "react-native";
export interface ScrollEndState {
    isScrolledToEnd: boolean;
    scrollViewProps: Required<Pick<ScrollViewProps, "onContentSizeChange" | "onLayout" | "onScroll" | "scrollEventThrottle">>;
}
export declare function useScrollEndState(): ScrollEndState;
//# sourceMappingURL=useScrollEndState.d.ts.map