import { createContext, use } from "react";
import type {
  Accent,
  AccentOrNeutral,
  AlouetteModeTheme,
  AlouetteScopedTheme,
  AlouetteTheme,
  ColorModePreference,
} from "./AlouetteConfig";
import { useSystemColorMode } from "./useSystemColorMode";

/**
 * Tracks the applied theme name as `ScopedTheme` received it (e.g.
 * "system_brand"), so accent composition (`AccentScope`) derives nested scopes
 * from it and keeps `system` resolved in CSS. Set by `ScopedTheme`.
 *
 * Defaults to "light", matching the light defaults in the global `@theme` block.
 */
export const ThemeContext = createContext<AlouetteScopedTheme>("light");

export function resolveTheme(
  theme: AlouetteScopedTheme,
  systemMode: AlouetteModeTheme,
): AlouetteTheme {
  return theme.replace(/^system/, systemMode) as AlouetteTheme;
}

export function getThemeAccent(theme: AlouetteScopedTheme): Accent | undefined {
  const [, accent] = theme.split("_") as [
    ColorModePreference,
    Accent | undefined,
  ];
  return accent;
}

export function useCurrentScopedTheme(): AlouetteScopedTheme {
  return use(ThemeContext);
}

export function useCurrentColorMode(): ColorModePreference {
  const [colorMode] = use(ThemeContext).split("_") as [ColorModePreference];
  return colorMode;
}

/** The applied theme with `system` resolved; hydration-safe on web. */
export function useCurrentTheme(): AlouetteTheme {
  return resolveTheme(use(ThemeContext), useSystemColorMode());
}

/** The applied mode with `system` resolved; hydration-safe on web. */
export function useCurrentMode(): AlouetteModeTheme {
  return useCurrentTheme().startsWith("dark") ? "dark" : "light";
}

export function useAccentOrInheritedOrBrand<T extends AccentOrNeutral>(
  accent: T | undefined,
): Accent | T {
  const inheritedAccent = getThemeAccent(use(ThemeContext));
  return accent ?? inheritedAccent ?? "brand";
}
