import type { ReactNode } from "react";
import { useCurrentMode, useCurrentTheme } from "../../core/ThemeContext";
import { ScopedTheme } from "../containers/ScopedTheme";

export interface SelectionAccentScopeProps {
  selected: boolean;
  children?: ReactNode;
}

/**
 * Keeps the ambient accent for a selected option and drops to the neutral mode
 * theme otherwise. Unlike `AccentScope`, it always renders the same scope, so
 * toggling the selection never remounts the pressable (which would lose focus).
 */
export function SelectionAccentScope({
  selected,
  children,
}: SelectionAccentScopeProps): ReactNode {
  const currentTheme = useCurrentTheme();
  const currentMode = useCurrentMode();
  return (
    <ScopedTheme theme={selected ? currentTheme : currentMode}>
      {children}
    </ScopedTheme>
  );
}
