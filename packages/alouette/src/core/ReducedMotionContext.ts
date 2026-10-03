import { createContext, useContext } from "react";

/** Provided by `AlouetteProvider`; `false` outside one. */
export const ReducedMotionContext = createContext<boolean>(false);

/**
 * `true` when the user asked the OS to reduce motion (`prefers-reduced-motion`
 * on web, the accessibility setting on iOS / Android). The alouette motion
 * tokens (`duration-*`, `animate-*`) already collapse to nothing then; read this
 * for motion driven from JS (a timer matching an animation, a Reanimated
 * `withTiming`, a native `animationType`).
 */
export function useReducedMotion(): boolean {
  return useContext(ReducedMotionContext);
}
