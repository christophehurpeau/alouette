import { createContext, useContext } from "react";
import type { AlouetteModeTheme, AlouetteTheme } from "./AlouetteConfig";

/**
 * Tracks the currently applied theme name (e.g. "dark_brand") so JS reads
 * (`useThemeToken`) and accent composition (`AccentScope`) know which theme
 * is active. Set by `ScopedTheme` alongside NativeWind's variable context.
 *
 * Defaults to "light", matching the light defaults in the global `@theme` block.
 */
export const ThemeContext = createContext<AlouetteTheme>("light");

export function useCurrentTheme(): AlouetteTheme {
  return useContext(ThemeContext);
}

export function useCurrentMode(): AlouetteModeTheme {
  return useContext(ThemeContext).startsWith("dark") ? "dark" : "light";
}
