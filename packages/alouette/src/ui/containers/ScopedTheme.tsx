import { VariableContextProvider } from "nativewind";
import type { ReactNode } from "react";
import { use } from "react";
import type { AlouetteScopedTheme } from "../../core/AlouetteConfig";
import { NativeThemeVariablesContext } from "../../core/NativeThemeVariablesContext";
import { ThemeContext, resolveTheme } from "../../core/ThemeContext";
import { useSystemColorMode } from "../../core/useSystemColorMode";

export interface ScopedThemeProps {
  /**
   * Full theme name, e.g. "light", "dark_danger", or "system" / "system_brand"
   * to follow the OS setting.
   */
  theme: AlouetteScopedTheme;
  children?: ReactNode;
}

/**
 * Applies a theme to its subtree by pushing the theme's resolved CSS variables
 * through NativeWind's `VariableContextProvider` (context only, layout-neutral).
 * The web build applies the theme as a className instead — see
 * `ScopedTheme.web.tsx`. A `system` theme resolves through `useColorScheme`:
 * native has no prerender to match. It also records the theme name in
 * `ThemeContext` so `AccentScope` can read it.
 */
export function ScopedTheme({ theme, children }: ScopedThemeProps): ReactNode {
  const themeVariables = use(NativeThemeVariablesContext);
  const systemMode = useSystemColorMode();
  return (
    <ThemeContext value={theme}>
      <VariableContextProvider
        value={themeVariables[resolveTheme(theme, systemMode)]}
      >
        {children}
      </VariableContextProvider>
    </ThemeContext>
  );
}
