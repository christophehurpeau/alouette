import type { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { ScopedTheme } from "../ui/containers/ScopedTheme";
import type { AlouetteProviderProps } from "./AlouetteProvider";

export function AlouetteProvider({
  children,
}: AlouetteProviderProps): ReactNode {
  const colorScheme = useColorScheme();
  return (
    <ScopedTheme theme={colorScheme === "dark" ? "dark" : "light"}>
      {children}
    </ScopedTheme>
  );
}
