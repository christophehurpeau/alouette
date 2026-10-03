import { useSyncExternalStore } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const mediaQueryList = window.matchMedia(reducedMotionQuery);
  mediaQueryList.addEventListener("change", onChange);
  return () => {
    mediaQueryList.removeEventListener("change", onChange);
  };
}

function getSnapshot(): boolean {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/** The `prefers-reduced-motion` media query, live. */
export function useSystemReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
