import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { StableAccentScope } from "./StableAccentScope";

export interface PortalAccentScopeProps {
  accent?: Accent | "none";
  children?: ReactNode;
}

/**
 * Theme scope for content rendered through a portal (Modal). Native has no
 * portal — `ScopedTheme` pushes the theme's fully merged variables through
 * context, which crosses the React tree wherever the host renders it — so a
 * single `StableAccentScope` is enough. The web build re-applies the base mode
 * first, see `PortalAccentScope.web.tsx`.
 */
export function PortalAccentScope({
  accent,
  children,
}: PortalAccentScopeProps): ReactNode {
  return <StableAccentScope accent={accent}>{children}</StableAccentScope>;
}
