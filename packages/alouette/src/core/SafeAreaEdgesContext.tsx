import { type ReactNode, createContext, useContext } from "react";

export type SafeAreaEdge = "bottom" | "left" | "right" | "top";

export const allSafeAreaEdges: readonly SafeAreaEdge[] = [
  "top",
  "bottom",
  "left",
  "right",
];

const ConsumedSafeAreaEdgesContext = createContext<readonly SafeAreaEdge[]>([]);

export function useConsumedSafeAreaEdges(): readonly SafeAreaEdge[] {
  return useContext(ConsumedSafeAreaEdgesContext);
}

export interface SafeAreaScopeProps {
  /** Edges whose inset is already applied by this subtree's chrome. */
  consumedEdges: readonly SafeAreaEdge[];
  children?: ReactNode;
}

/**
 * Declares that surrounding chrome already applies some safe-area edges, so the
 * screen containers below (`ScreenScrollView`, `ScreenFlatList`,
 * `ScreenSectionList`) skip them instead of padding twice. Wrap the body under a
 * header with `consumedEdges={["top"]}`, above a bottom bar with
 * `consumedEdges={["bottom"]}`. Scopes merge, so both can nest.
 */
export function SafeAreaScope({
  consumedEdges,
  children,
}: SafeAreaScopeProps): ReactNode {
  const parentEdges = useConsumedSafeAreaEdges();
  const mergedEdges = allSafeAreaEdges.filter(
    (edge) => parentEdges.includes(edge) || consumedEdges.includes(edge),
  );

  return (
    <ConsumedSafeAreaEdgesContext.Provider value={mergedEdges}>
      {children}
    </ConsumedSafeAreaEdgesContext.Provider>
  );
}
