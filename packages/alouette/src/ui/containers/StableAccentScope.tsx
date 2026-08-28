import type { ReactNode } from "react";
import type { Accent, AlouetteTheme } from "../../core/AlouetteConfig";
import { useCurrentMode, useCurrentTheme } from "../../core/ThemeContext";
import { ScopedTheme } from "./ScopedTheme";

export interface StableAccentScopeProps {
  mode?: "dark" | "light";
  accent?: Accent | "none";
  children?: ReactNode;
}

/**
 * Like AccentScope, but always keeps a ScopedTheme mounted — when `accent` is
 * unset it re-applies the inherited theme instead of dropping the wrapper.
 * Toggling `accent` (e.g. on hover) therefore only changes the theme prop, so
 * the subtree — and any focused input inside it — is never remounted. Prefer
 * AccentScope when the accent is fixed; reach for this only when it toggles.
 */
export function StableAccentScope({
  mode: forcedMode,
  accent,
  children,
}: StableAccentScopeProps): ReactNode {
  const currentTheme = useCurrentTheme();
  const currentMode = useCurrentMode();

  const theme = ((): AlouetteTheme => {
    if (!accent) return currentTheme;
    if (accent === "none") return forcedMode ?? currentMode;
    return `${forcedMode ?? currentMode}_${accent}`;
  })();
  return <ScopedTheme theme={theme}>{children}</ScopedTheme>;
}
