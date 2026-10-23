import type { ReactNode } from "react";
import { ScopedTheme } from "../ui/containers/ScopedTheme";
import type { AlouetteProviderProps } from "./AlouetteProvider";
import { ReducedMotionContext } from "./ReducedMotionContext";
import { useSystemColorMode } from "./useSystemColorMode";
import { useSystemReducedMotion } from "./useSystemReducedMotion";

export function AlouetteProvider({
  children,
}: AlouetteProviderProps): ReactNode {
  const systemColorMode = useSystemColorMode();
  const reducedMotion = useSystemReducedMotion();
  return (
    <ReducedMotionContext value={reducedMotion}>
      <ScopedTheme theme={systemColorMode}>{children}</ScopedTheme>
    </ReducedMotionContext>
  );
}
