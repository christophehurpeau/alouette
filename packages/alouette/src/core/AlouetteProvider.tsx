import type { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { ScopedTheme } from "../ui/containers/ScopedTheme";

export interface AlouetteProviderProps {
  children: ReactNode;
}

export function AlouetteProvider({
  children,
}: AlouetteProviderProps): ReactNode {
  // Apply the OS light/dark scheme as the root theme so base tokens resolve
  // correctly app-wide. Subtrees can override via ScopedTheme / AccentScope.
  const colorScheme = useColorScheme();
  return (
    <ScopedTheme theme={colorScheme === "dark" ? "dark" : "light"}>
      {children}
    </ScopedTheme>
  );
}
