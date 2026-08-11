import type { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { ScopedTheme } from "../ui/containers/ScopedTheme";
import type { ThemeVariablesMap } from "./NativeThemeVariablesContext";
import { NativeThemeVariablesContext } from "./NativeThemeVariablesContext";

export interface AlouetteProviderProps {
  children: ReactNode;
  /**
   * The resolved theme-variable map JS token reads use. Defaults to the bundled
   * default palette. A BYO-palette app passes its own
   * `generateTheme(...).themeVariables` (from `alouette/theme-generator`) here so
   * JS reads match its palette CSS.
   */
  themeVariables: ThemeVariablesMap;
}

export function AlouetteProvider({
  children,
  themeVariables,
}: AlouetteProviderProps): ReactNode {
  // Apply the OS light/dark scheme as the root theme so base tokens resolve
  // correctly app-wide. Subtrees can override via ScopedTheme / AccentScope.
  const colorScheme = useColorScheme();
  return (
    <NativeThemeVariablesContext.Provider value={themeVariables}>
      <ScopedTheme theme={colorScheme === "dark" ? "dark" : "light"}>
        {children}
      </ScopedTheme>
    </NativeThemeVariablesContext.Provider>
  );
}
