import { VariableContextProvider } from "nativewind";
import type { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { reducedMotionVariables } from "../reducedMotionVariables";
import { ScopedTheme } from "../ui/containers/ScopedTheme";
import type { ThemeVariablesMap } from "./NativeThemeVariablesContext";
import { NativeThemeVariablesContext } from "./NativeThemeVariablesContext";
import { ReducedMotionContext } from "./ReducedMotionContext";
import { useSystemReducedMotion } from "./useSystemReducedMotion";

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

const noVariables = {};

export function AlouetteProvider({
  children,
  themeVariables,
}: AlouetteProviderProps): ReactNode {
  const colorScheme = useColorScheme();
  const reducedMotion = useSystemReducedMotion();
  return (
    <NativeThemeVariablesContext.Provider value={themeVariables}>
      <ReducedMotionContext.Provider value={reducedMotion}>
        {/* react-native-css never matches `prefers-reduced-motion`, so the
            values core.css sets under that query are pushed from JS. */}
        <VariableContextProvider
          value={reducedMotion ? reducedMotionVariables : noVariables}
        >
          <ScopedTheme theme={colorScheme === "dark" ? "dark" : "light"}>
            {children}
          </ScopedTheme>
        </VariableContextProvider>
      </ReducedMotionContext.Provider>
    </NativeThemeVariablesContext.Provider>
  );
}
