import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { useCurrentMode, useCurrentTheme } from "../../core/ThemeContext";
import { ScopedTheme } from "./ScopedTheme";

export interface StableAccentScopeProps {
  mode?: "dark" | "light";
  accent?: Accent;
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
  return (
    <ScopedTheme
      theme={accent ? `${forcedMode ?? currentMode}_${accent}` : currentTheme}
    >
      {children}
    </ScopedTheme>
  );
}
