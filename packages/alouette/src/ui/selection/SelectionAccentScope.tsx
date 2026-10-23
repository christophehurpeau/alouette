import type { ReactNode } from "react";
import { createContext, use } from "react";
import type { AlouetteScopedTheme } from "../../core/AlouetteConfig";
import {
  useCurrentColorMode,
  useCurrentScopedTheme,
} from "../../core/ThemeContext";
import { DefaultAccentScope } from "../containers/DefaultAccentScope";
import { ScopedTheme } from "../containers/ScopedTheme";

const SelectionAccentThemeContext = createContext<
  AlouetteScopedTheme | undefined
>(undefined);

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
  const currentTheme = useCurrentScopedTheme();
  const currentColorMode = useCurrentColorMode();
  return (
    <SelectionAccentThemeContext value={currentTheme}>
      <ScopedTheme theme={selected ? currentTheme : currentColorMode}>
        {children}
      </ScopedTheme>
    </SelectionAccentThemeContext>
  );
}

export interface SelectionIndicatorAccentScopeProps {
  children?: ReactNode;
}

/**
 * The accent of a radio ring or checkbox box, selected or not: the option's
 * own accent inside a `SelectionAccentScope` (whose unselected neutral theme
 * would otherwise turn it into the default brand), the default accent
 * scope elsewhere.
 */
export function SelectionIndicatorAccentScope({
  children,
}: SelectionIndicatorAccentScopeProps): ReactNode {
  const selectionAccentTheme = use(SelectionAccentThemeContext);
  if (selectionAccentTheme === undefined) {
    return <DefaultAccentScope>{children}</DefaultAccentScope>;
  }
  return <ScopedTheme theme={selectionAccentTheme}>{children}</ScopedTheme>;
}
