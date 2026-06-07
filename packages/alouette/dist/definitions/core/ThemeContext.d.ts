import type { AlouetteModeTheme, AlouetteTheme } from "./AlouetteConfig";
/**
 * Tracks the currently applied theme name (e.g. "dark_brand") so JS reads
 * (`useThemeToken`) and accent composition (`AccentScope`) know which theme
 * is active. Set by `ScopedTheme` alongside NativeWind's variable context.
 *
 * Defaults to "light", matching the light defaults in the global `@theme` block.
 */
export declare const ThemeContext: import("react").Context<AlouetteTheme>;
export declare function useCurrentTheme(): AlouetteTheme;
export declare function useCurrentMode(): AlouetteModeTheme;
//# sourceMappingURL=ThemeContext.d.ts.map