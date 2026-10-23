import type { AlouetteModeTheme, ColorModePreference } from "./AlouetteConfig";
import { useSystemColorMode } from "./useSystemColorMode";

/**
 * The mode a preference resolves to, for what reads it in JS (a status bar
 * style, a computed color). Hydration-safe on web: `system` reads `light` until
 * hydration is done. To apply a preference, pass it to `ScopedTheme` as is.
 */
export function useResolvedColorMode(
  preference: ColorModePreference,
): AlouetteModeTheme {
  const systemMode = useSystemColorMode();
  return preference === "system" ? systemMode : preference;
}
