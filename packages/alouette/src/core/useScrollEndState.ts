import { useRef, useState } from "react";
import type { ScrollViewProps } from "react-native";

export interface ScrollEndState {
  isScrolledToEnd: boolean;
  scrollViewProps: Required<
    Pick<
      ScrollViewProps,
      "onContentSizeChange" | "onLayout" | "onScroll" | "scrollEventThrottle"
    >
  >;
}

// Sub-pixel layout rounding makes an exact equality unreliable.
const scrollEndToleranceInPx = 1;

// Tracks whether a ScrollView is scrolled to its end — true as well when the
// content fits, since there is then nothing hidden below the fold. Spread the
// returned props on the ScrollView: onScroll alone never fires for content that
// doesn't overflow, so layout and content size feed the initial state.
export function useScrollEndState(): ScrollEndState {
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(true);
  const viewportHeightRef = useRef(0);
  const contentHeightRef = useRef(0);
  const scrollOffsetRef = useRef(0);

  const updateIsScrolledToEnd = (): void => {
    setIsScrolledToEnd(
      contentHeightRef.current - scrollOffsetRef.current <=
        viewportHeightRef.current + scrollEndToleranceInPx,
    );
  };

  return {
    isScrolledToEnd,
    scrollViewProps: {
      scrollEventThrottle: 16,
      onLayout: (event) => {
        viewportHeightRef.current = event.nativeEvent.layout.height;
        updateIsScrolledToEnd();
      },
      onContentSizeChange: (_width, height) => {
        contentHeightRef.current = height;
        updateIsScrolledToEnd();
      },
      onScroll: (event) => {
        const { contentOffset, contentSize, layoutMeasurement } =
          event.nativeEvent;
        scrollOffsetRef.current = contentOffset.y;
        contentHeightRef.current = contentSize.height;
        viewportHeightRef.current = layoutMeasurement.height;
        updateIsScrolledToEnd();
      },
    },
  };
}
