import { VariableContextProvider } from "nativewind";
import type { ReactNode } from "react";
import type { AlouetteTheme } from "../../core/AlouetteConfig";
import { ThemeContext } from "../../core/ThemeContext";
import { themeVariables } from "../../themeVariables";

export interface ScopedThemeProps {
  /** Full theme name, e.g. "light", "dark", "light_brand", "dark_danger". */
  theme: AlouetteTheme;
  children?: ReactNode;
}

/**
 * Applies a theme to its subtree by pushing the theme's resolved CSS variables
 * through NativeWind's `VariableContextProvider` (layout-neutral on both web —
 * `display: contents` — and native — context only). It also records the active
 * theme name in `ThemeContext` so `useThemeToken` and `AccentScope` can read it.
 *
 * Replaces Uniwind's `ScopedTheme`.
 */
export function ScopedTheme({ theme, children }: ScopedThemeProps): ReactNode {
  return (
    <ThemeContext.Provider value={theme}>
      <VariableContextProvider value={themeVariables[theme]}>
        {children}
      </VariableContextProvider>
    </ThemeContext.Provider>
  );
}
