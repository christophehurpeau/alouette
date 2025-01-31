import type { TamaguiProviderProps } from "@tamagui/core";
import type { ReactNode } from "react";
export interface AlouetteProviderProps {
    children: ReactNode;
    tamaguiConfig: TamaguiProviderProps["config"];
    defaultTheme?: "dark" | "light";
}
export declare const useDefaultThemeFromColorScheme: () => "dark" | "light";
export declare function AlouetteProvider({ children, tamaguiConfig, defaultTheme, }: AlouetteProviderProps): ReactNode;
//# sourceMappingURL=AlouetteProvider.d.ts.map