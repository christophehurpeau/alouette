import type { ReactNode } from "react";
import type { ThemeVariablesMap } from "./NativeThemeVariablesContext";
export interface AlouetteProviderProps {
    children: ReactNode;
    /**
     * The resolved theme-variable map JS token reads use. Defaults to the bundled
     * default palette. A BYO-palette app passes its own
     * `generateTheme(...).themeVariables` (from `alouette/theme-generator`) here so
     * JS reads match its palette CSS.
     */
    themeVariables: ThemeVariablesMap;
}
export declare function AlouetteProvider({ children, themeVariables, }: AlouetteProviderProps): ReactNode;
//# sourceMappingURL=AlouetteProvider.d.ts.map