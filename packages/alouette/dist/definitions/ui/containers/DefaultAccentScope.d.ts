import type { ReactNode } from "react";
export interface DefaultAccentScopeProps {
    children?: ReactNode;
}
/**
 * Falls back to the brand accent when the subtree sits in a plain light/dark
 * theme, so an accent-driven element (a radio dot, a selected card) is tinted
 * instead of grayscale. An accent already applied by an ancestor wins.
 */
export declare function DefaultAccentScope({ children, }: DefaultAccentScopeProps): ReactNode;
//# sourceMappingURL=DefaultAccentScope.d.ts.map