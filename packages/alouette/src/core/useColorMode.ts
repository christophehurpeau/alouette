import type { AlouetteModeTheme } from "./AlouetteConfig";
import { useSystemColorMode } from "./useSystemColorMode";

/** A stored color-mode choice: an explicit mode, or follow the system. */
export type ColorModePreference = AlouetteModeTheme | "system";

/**
 * The theme a preference applies: `system` resolves through the OS setting. Pass
 * the result to `ScopedTheme` (or `AlouetteProvider` already does it for the
 * whole app when nothing is stored).
 */
export function useResolvedColorMode(
  preference: ColorModePreference,
): AlouetteModeTheme {
  const systemMode = useSystemColorMode();
  return preference === "system" ? systemMode : preference;
}
