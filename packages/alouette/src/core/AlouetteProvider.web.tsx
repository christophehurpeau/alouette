import type { ReactNode } from "react";
import { ScopedTheme } from "../ui/containers/ScopedTheme";
import type { AlouetteProviderProps } from "./AlouetteProvider";
import { ReducedMotionContext } from "./ReducedMotionContext";
import { useSystemReducedMotion } from "./useSystemReducedMotion";

export function AlouetteProvider({
  children,
}: AlouetteProviderProps): ReactNode {
  const reducedMotion = useSystemReducedMotion();
  return (
    <ReducedMotionContext value={reducedMotion}>
      <ScopedTheme theme="system">{children}</ScopedTheme>
    </ReducedMotionContext>
  );
}
