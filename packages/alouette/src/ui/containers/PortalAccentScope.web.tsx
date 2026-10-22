import type { ReactNode } from "react";
import { useDensity } from "../../core/DensityContext";
import { useCurrentMode, useCurrentTheme } from "../../core/ThemeContext";
import { DensityScope } from "./DensityScope";
import type { PortalAccentScopeProps } from "./PortalAccentScope";
import { ScopedTheme } from "./ScopedTheme";
import { resolveStableTheme } from "./StableAccentScope";

/**
 * Web themes resolve through CSS custom-property inheritance from the theme
 * className, and a portal renders outside the themed DOM subtree — so the scope
 * has to be rebuilt there from the base mode. Two nested scopes, because the
 * accent blocks are partial: the outer one re-declares the full `light`/`dark`
 * token set the portal escaped, the inner one layers the accent (or the theme
 * inherited from the caller, in `mode`, when `accent` is unset) on top of it. Both stay
 * mounted, so toggling `accent` never remounts the subtree. The density is a
 * class inherited the same way, so it is rebuilt there too.
 */
export function PortalAccentScope({
  mode,
  accent,
  children,
}: PortalAccentScopeProps): ReactNode {
  const currentTheme = useCurrentTheme();
  const currentMode = useCurrentMode();
  const density = useDensity();

  const modeToUse = mode ?? currentMode;
  const theme = resolveStableTheme({ currentTheme, mode: modeToUse, accent });
  return (
    <ScopedTheme theme={modeToUse}>
      <ScopedTheme theme={theme}>
        <DensityScope density={density}>{children}</DensityScope>
      </ScopedTheme>
    </ScopedTheme>
  );
}
