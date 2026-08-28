import type { ReactNode } from "react";
import type { AlouetteTheme } from "../../core/AlouetteConfig";
import { useCurrentMode, useCurrentTheme } from "../../core/ThemeContext";
import type { PortalAccentScopeProps } from "./PortalAccentScope";
import { ScopedTheme } from "./ScopedTheme";

/**
 * Web themes resolve through CSS custom-property inheritance from the theme
 * className, and a portal renders outside the themed DOM subtree — so the scope
 * has to be rebuilt there from the base mode. Two nested scopes, because the
 * accent blocks are partial: the outer one re-declares the full `light`/`dark`
 * token set the portal escaped, the inner one layers the accent (or the theme
 * inherited from the caller when `accent` is unset) on top of it. Both stay
 * mounted, so toggling `accent` never remounts the subtree.
 */
export function PortalAccentScope({
  accent,
  children,
}: PortalAccentScopeProps): ReactNode {
  const inheritedTheme = useCurrentTheme();
  const mode = useCurrentMode();

  const theme = ((): AlouetteTheme => {
    if (!accent) return inheritedTheme;
    if (accent === "none") return mode;
    return `${mode}_${accent}`;
  })();
  return (
    <ScopedTheme theme={mode}>
      <ScopedTheme theme={theme}>{children}</ScopedTheme>
    </ScopedTheme>
  );
}
