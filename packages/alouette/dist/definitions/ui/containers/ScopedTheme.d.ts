import type { ReactNode } from "react";
import type { AlouetteTheme } from "../../core/AlouetteConfig";
export interface ScopedThemeProps {
    /** Full theme name, e.g. "light", "dark", "light_brand", "dark_danger". */
    theme: AlouetteTheme;
    children?: ReactNode;
}
/**
 * Applies a theme to its subtree by pushing the theme's resolved CSS variables
 * through NativeWind's `VariableContextProvider` (layout-neutral on both web —
 * `display: contents` — and native — context only). It also records the active
 * theme name in `ThemeContext` so `useThemeToken` and `AccentScope` can read it.
 *
 * Replaces Uniwind's `ScopedTheme`.
 */
export declare function ScopedTheme({ theme, children }: ScopedThemeProps): ReactNode;
//# sourceMappingURL=ScopedTheme.d.ts.map