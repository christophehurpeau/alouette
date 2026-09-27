import { createContext, useContext } from "react";
import type {
  Accent,
  AccentOrNeutral,
  AlouetteModeTheme,
  AlouetteTheme,
} from "./AlouetteConfig";

/**
 * Tracks the currently applied theme name (e.g. "dark_brand") so native reads
 * and accent composition (`AccentScope`) know which theme
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

export function getThemeAccent(theme: AlouetteTheme): Accent | undefined {
  const [, accent] = theme.split("_") as [
    AlouetteModeTheme,
    Accent | undefined,
  ];
  return accent;
}

export function useAccentOrInheritedOrBrand<T extends AccentOrNeutral>(
  accent: T | undefined,
): Accent | T {
  const inheritedAccent = getThemeAccent(useContext(ThemeContext));
  return accent ?? inheritedAccent ?? "brand";
}
