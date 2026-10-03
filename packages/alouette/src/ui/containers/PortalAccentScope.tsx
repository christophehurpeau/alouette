import type { ReactNode } from "react";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import type { StableAccentScopeProps } from "./StableAccentScope";
import { StableAccentScope } from "./StableAccentScope";

export interface PortalAccentScopeProps {
  mode?: StableAccentScopeProps["mode"];
  accent?: AccentOrNeutral;
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
  mode,
  accent,
  children,
}: PortalAccentScopeProps): ReactNode {
  return (
    <StableAccentScope mode={mode} accent={accent}>
      {children}
    </StableAccentScope>
  );
}
