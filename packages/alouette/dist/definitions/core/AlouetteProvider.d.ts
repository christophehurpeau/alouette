import type { TamaguiProviderProps } from "@tamagui/core";
import type { ReactNode } from "react";
import "./reset";
export interface AlouetteProviderProps extends Pick<TamaguiProviderProps, "disableInjectCSS"> {
    children: ReactNode;
    tamaguiConfig: NonNullable<TamaguiProviderProps["config"]>;
    defaultTheme?: "dark" | "light";
}
export declare const useDefaultThemeFromColorScheme: () => "dark" | "light";
export declare function AlouetteProvider({ children, tamaguiConfig, defaultTheme, disableInjectCSS, }: AlouetteProviderProps): ReactNode;
//# sourceMappingURL=AlouetteProvider.d.ts.map