import type { ReactNode } from "react";
import type {
  Accent,
  AccentOrNeutral,
  AlouetteModeTheme,
  AlouetteTheme,
} from "../../core/AlouetteConfig";
import { useCurrentMode, useCurrentTheme } from "../../core/ThemeContext";
import { ScopedTheme } from "./ScopedTheme";

export interface StableAccentScopeProps {
  mode?: "dark" | "light";
  accent?: AccentOrNeutral;
  children?: ReactNode;
}

export interface ResolveStableThemeParams {
  currentTheme: AlouetteTheme;
  mode: AlouetteModeTheme;
  accent: AccentOrNeutral | undefined;
}

/** Without an `accent`, the inherited accent is kept, in `mode`. */
export function resolveStableTheme({
  currentTheme,
  mode,
  accent,
}: ResolveStableThemeParams): AlouetteTheme {
  if (accent === "neutral") return mode;
  const [, inheritedAccent] = currentTheme.split("_") as [
    string,
    Accent | undefined,
  ];
  const resolvedAccent = accent ?? inheritedAccent;
  return resolvedAccent ? `${mode}_${resolvedAccent}` : mode;
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

  const theme = resolveStableTheme({
    currentTheme,
    mode: forcedMode ?? currentMode,
    accent,
  });
  return <ScopedTheme theme={theme}>{children}</ScopedTheme>;
}
