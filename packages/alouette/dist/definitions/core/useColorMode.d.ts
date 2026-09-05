import type { AlouetteModeTheme } from "./AlouetteConfig";
/** A stored color-mode choice: an explicit mode, or follow the system. */
export type ColorModePreference = AlouetteModeTheme | "system";
/** The OS light/dark setting — on web, the `prefers-color-scheme` media query. */
export declare function useSystemColorMode(): AlouetteModeTheme;
/**
 * The theme a preference applies: `system` resolves through the OS setting. Pass
 * the result to `ScopedTheme` (or `AlouetteProvider` already does it for the
 * whole app when nothing is stored).
 */
export declare function useResolvedColorMode(preference: ColorModePreference): AlouetteModeTheme;
//# sourceMappingURL=useColorMode.d.ts.map