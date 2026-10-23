import type { ReactNode } from "react";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { useCurrentColorMode } from "../../core/ThemeContext";
import { ScopedTheme } from "./ScopedTheme";

export interface AccentScopeProps {
  mode?: "dark" | "light";
  accent?: AccentOrNeutral;
  children?: ReactNode;
}

export function AccentScope({
  mode: forcedMode,
  accent,
  children,
}: AccentScopeProps): ReactNode {
  const currentColorMode = useCurrentColorMode();
  if (!accent) {
    return children;
  }
  // ScopedTheme applies the accent theme's *resolved* variables (base mode + accent),
  // so a single scope works at any depth — no need to pre-apply the base mode.
  const mode = forcedMode ?? currentColorMode;
  return (
    <ScopedTheme theme={accent === "neutral" ? mode : `${mode}_${accent}`}>
      {children}
    </ScopedTheme>
  );
}
