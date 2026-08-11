import { createContext, useContext } from "react";
import type { AlouetteTheme } from "./AlouetteConfig";

/**
 * Resolved CSS-variable map for every theme — the JS mirror of the palette CSS,
 * consumed by `ScopedTheme` (feeds NativeWind's `VariableContextProvider`). This is the shape of `generateTheme(...).themeVariables`.
 */
export type ThemeVariablesMap = Record<
  AlouetteTheme,
  Record<`--${string}`, string>
>;

/**
 * Holds the active {@link ThemeVariablesMap}. Defaults to the bundled default
 * palette (`themeVariables`) so `ScopedTheme` works with no provider. A
 * BYO-palette app overrides it via `<AlouetteProvider themeVariables={...}>`
 * with its own `generateTheme(...).themeVariables`, keeping JS token reads in
 * sync with its palette CSS.
 */
export const NativeThemeVariablesContext = createContext<ThemeVariablesMap>(
  null as unknown as ThemeVariablesMap,
);

export function useNativeThemeVariables(): ThemeVariablesMap {
  return useContext(NativeThemeVariablesContext);
}
