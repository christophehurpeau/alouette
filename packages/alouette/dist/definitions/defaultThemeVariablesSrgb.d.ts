import type { AlouetteTheme } from "./core/AlouetteConfig";
/**
 * Resolved CSS-variable maps for every theme in sRGB hex, shared with
 * default-palette.css. Feeds `ScopedTheme` (NativeWind's
 * `VariableContextProvider`) and `useThemeToken` on every platform but web.
 */
export declare const themeVariables: Record<AlouetteTheme, Record<`--${string}`, string>>;
//# sourceMappingURL=defaultThemeVariablesSrgb.d.ts.map