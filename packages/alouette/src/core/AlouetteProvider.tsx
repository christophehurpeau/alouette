import type { ReactNode } from "react";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Uniwind } from "uniwind";

export interface AlouetteProviderProps {
  children: ReactNode;
  defaultTheme?: "dark" | "light";
}

export const useDefaultThemeFromColorScheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme || "light";
};

export function AlouetteProvider({
  children,
  defaultTheme = "light",
}: AlouetteProviderProps): ReactNode {
  useEffect(() => {
    Uniwind.setTheme(defaultTheme);
  }, [defaultTheme]);
  return children;
}
