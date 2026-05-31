import type { ReactNode } from "react";
export interface AlouetteProviderProps {
    children: ReactNode;
    defaultTheme?: "dark" | "light";
}
export declare const useDefaultThemeFromColorScheme: () => "light" | "dark";
export declare function AlouetteProvider({ children, defaultTheme, }: AlouetteProviderProps): ReactNode;
//# sourceMappingURL=AlouetteProvider.d.ts.map