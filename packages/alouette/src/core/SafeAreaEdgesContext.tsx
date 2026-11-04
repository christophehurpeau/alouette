import { type ReactNode, createContext, use } from "react";

export type SafeAreaEdge = "bottom" | "left" | "right" | "top";

export const allSafeAreaEdges: readonly SafeAreaEdge[] = [
  "top",
  "bottom",
  "left",
  "right",
];

const ConsumedSafeAreaEdgesContext = createContext<readonly SafeAreaEdge[]>([]);

const SafeAreaTopOverlayHeightContext = createContext(0);

export function useConsumedSafeAreaEdges(): readonly SafeAreaEdge[] {
  return use(ConsumedSafeAreaEdgesContext);
}

export function useSafeAreaTopOverlayHeight(): number {
  return use(SafeAreaTopOverlayHeightContext);
}

export interface SafeAreaScopeProps {
  /** Edges whose inset is already applied by this subtree's chrome. */
  consumedEdges?: readonly SafeAreaEdge[];
  /**
   * Height of the chrome drawn over the top of this subtree's content, measured
   * from the top of the screen: a transparent navigation header, whose height
   * `useHeaderHeight()` gives. The screen containers pad at least that much at
   * the top, on every platform. Defaults to the parent scope's, or to none
   * when this scope consumes the top edge.
   */
  topOverlayHeight?: number;
  children?: ReactNode;
}

/**
 * Describes the chrome around the screen containers below (`ScreenScrollView`,
 * `ScreenFlatList`, `ScreenSectionList`). `consumedEdges` declares the insets a
 * header or bottom bar laid out beside the content already applies, so the
 * containers skip them instead of padding twice; scopes merge, so both can
 * nest. `topOverlayHeight` declares a transparent header laid over the content.
 *
 * On iOS the containers let UIKit inset the top and bottom from the bars that
 * actually cover them, so `consumedEdges` only matters there for the left and
 * right edges, unless the container passes `edges` or the scope sets a
 * `topOverlayHeight`.
 */
export function SafeAreaScope({
  consumedEdges = [],
  topOverlayHeight,
  children,
}: SafeAreaScopeProps): ReactNode {
  const parentEdges = useConsumedSafeAreaEdges();
  const parentTopOverlayHeight = useSafeAreaTopOverlayHeight();
  const mergedEdges = allSafeAreaEdges.filter(
    (edge) => parentEdges.includes(edge) || consumedEdges.includes(edge),
  );
  const inheritedTopOverlayHeight = consumedEdges.includes("top")
    ? 0
    : parentTopOverlayHeight;

  return (
    <ConsumedSafeAreaEdgesContext value={mergedEdges}>
      <SafeAreaTopOverlayHeightContext
        value={topOverlayHeight ?? inheritedTopOverlayHeight}
      >
        {children}
      </SafeAreaTopOverlayHeightContext>
    </ConsumedSafeAreaEdgesContext>
  );
}
