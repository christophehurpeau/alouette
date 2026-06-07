import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { useCurrentMode } from "../../core/ThemeContext";
import { ScopedTheme } from "./ScopedTheme";

export interface AccentScopeProps {
  mode?: "dark" | "light";
  accent?: Accent;
  children?: ReactNode;
}

export function AccentScope({
  mode: forcedMode,
  accent,
  children,
}: AccentScopeProps): ReactNode {
  const currentMode = useCurrentMode();
  if (!accent) {
    return children;
  }
  // ScopedTheme applies the accent theme's *resolved* variables (base mode + accent),
  // so a single scope works at any depth — no need to pre-apply the base mode.
  const mode = forcedMode ?? currentMode;
  return <ScopedTheme theme={`${mode}_${accent}`}>{children}</ScopedTheme>;
}
