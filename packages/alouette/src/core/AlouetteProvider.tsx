import type { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { ScopedTheme } from "../ui/containers/ScopedTheme";
import type { ThemeVariablesMap } from "./NativeThemeVariablesContext";
import { NativeThemeVariablesContext } from "./NativeThemeVariablesContext";

export interface AlouetteProviderProps {
  children: ReactNode;
  /**
   * The resolved theme-variable map native applies (web resolves tokens from
   * the palette CSS and ignores it). A BYO-palette app passes its own
   * `generateTheme(...).themeVariables` (from `alouette/theme-generator`) so
   * native matches its palette CSS.
   */
  themeVariables: ThemeVariablesMap;
}

export function AlouetteProvider({
  children,
  themeVariables,
}: AlouetteProviderProps): ReactNode {
  const colorScheme = useColorScheme();
  return (
    <NativeThemeVariablesContext.Provider value={themeVariables}>
      <ScopedTheme theme={colorScheme === "dark" ? "dark" : "light"}>
        {children}
      </ScopedTheme>
    </NativeThemeVariablesContext.Provider>
  );
}
