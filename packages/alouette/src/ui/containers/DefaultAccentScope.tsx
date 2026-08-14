import type { ReactNode } from "react";
import { useCurrentMode, useCurrentTheme } from "../../core/ThemeContext";
import { ScopedTheme } from "./ScopedTheme";

export interface DefaultAccentScopeProps {
  children?: ReactNode;
}

/**
 * Falls back to the brand accent when the subtree sits in a plain light/dark
 * theme, so an accent-driven element (a radio dot, a selected card) is tinted
 * instead of grayscale. An accent already applied by an ancestor wins.
 */
export function DefaultAccentScope({
  children,
}: DefaultAccentScopeProps): ReactNode {
  const currentTheme = useCurrentTheme();
  const currentMode = useCurrentMode();
  return (
    <ScopedTheme
      theme={
        currentTheme === currentMode ? `${currentTheme}_brand` : currentTheme
      }
    >
      {children}
    </ScopedTheme>
  );
}
