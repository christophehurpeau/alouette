import type { ReactNode } from "react";
import type { AlouetteTheme } from "../../core/AlouetteConfig";
export interface ScopedThemeProps {
    /** Full theme name, e.g. "light", "dark", "light_brand", "dark_danger". */
    theme: AlouetteTheme;
    children?: ReactNode;
}
/**
 * Applies a theme to its subtree by pushing the theme's resolved CSS variables
 * through NativeWind's `VariableContextProvider` (context only, layout-neutral).
 * The web build applies the theme as a className instead — see
 * `ScopedTheme.web.tsx`. It also records the active theme name in `ThemeContext`
 * so `AccentScope` can read it.
 */
export declare function ScopedTheme({ theme, children }: ScopedThemeProps): ReactNode;
//# sourceMappingURL=ScopedTheme.d.ts.map