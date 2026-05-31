import type { ReactNode } from "react";
export type AlouetteModeTheme = "dark" | "light";
export type AlouetteAccentTheme = "brand" | "danger" | "info" | "success" | "warning";
export interface AccentThemeProps {
    mode?: AlouetteModeTheme;
    accent: AlouetteAccentTheme;
    children: ReactNode;
}
/**
 * Wraps children in a ScopedTheme that composes the current mode (light/dark)
 * with the given accent — replaces Tamagui's relative `<Theme name="brand">`.
 * Inside `<ScopedTheme theme="dark">`, `<AccentTheme accent="brand">` becomes
 * `dark_brand`; otherwise it becomes `light_brand`.
 */
export declare function AccentTheme({ mode, accent, children, }: AccentThemeProps): ReactNode;
//# sourceMappingURL=AccentTheme.d.ts.map