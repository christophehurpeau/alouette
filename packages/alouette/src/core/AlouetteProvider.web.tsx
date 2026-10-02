import type { ReactNode } from "react";
import { useColorScheme } from "react-native";
import { ScopedTheme } from "../ui/containers/ScopedTheme";
import type { AlouetteProviderProps } from "./AlouetteProvider";
import { ReducedMotionContext } from "./ReducedMotionContext";
import { useSystemReducedMotion } from "./useSystemReducedMotion";

export function AlouetteProvider({
  children,
}: AlouetteProviderProps): ReactNode {
  const colorScheme = useColorScheme();
  const reducedMotion = useSystemReducedMotion();
  return (
    <ReducedMotionContext.Provider value={reducedMotion}>
      <ScopedTheme theme={colorScheme === "dark" ? "dark" : "light"}>
        {children}
      </ScopedTheme>
    </ReducedMotionContext.Provider>
  );
}
