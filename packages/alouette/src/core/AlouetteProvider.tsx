import type { TamaguiProviderProps } from "@tamagui/core";
import { TamaguiProvider } from "@tamagui/core";
import type { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./reset";

export interface AlouetteProviderProps
  extends Pick<TamaguiProviderProps, "disableInjectCSS"> {
  children: ReactNode;
  tamaguiConfig: NonNullable<TamaguiProviderProps["config"]>;
  defaultTheme?: "dark" | "light";
}

export const useDefaultThemeFromColorScheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme || "light";
};

export function AlouetteProvider({
  children,
  tamaguiConfig,
  defaultTheme = "light",
  disableInjectCSS,
}: AlouetteProviderProps): ReactNode {
  return (
    <SafeAreaProvider>
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={defaultTheme}
        disableInjectCSS={disableInjectCSS}
      >
        {children}
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
