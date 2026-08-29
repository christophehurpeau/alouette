import { type ReactNode } from "react";
export type SafeAreaEdge = "bottom" | "left" | "right" | "top";
export declare const allSafeAreaEdges: readonly SafeAreaEdge[];
export declare function useConsumedSafeAreaEdges(): readonly SafeAreaEdge[];
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
export declare function SafeAreaScope({ consumedEdges, children, }: SafeAreaScopeProps): ReactNode;
//# sourceMappingURL=SafeAreaEdgesContext.d.ts.map