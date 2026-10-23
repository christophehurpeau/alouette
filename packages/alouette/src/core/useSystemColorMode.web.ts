import { useSyncExternalStore } from "react";
import type { AlouetteModeTheme } from "./AlouetteConfig";

const darkColorSchemeQuery = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void): () => void {
  const mediaQueryList = window.matchMedia(darkColorSchemeQuery);
  mediaQueryList.addEventListener("change", onChange);
  return () => {
    mediaQueryList.removeEventListener("change", onChange);
  };
}

function getSnapshot(): AlouetteModeTheme {
  return window.matchMedia(darkColorSchemeQuery).matches ? "dark" : "light";
}

function getServerSnapshot(): AlouetteModeTheme {
  return "light";
}

/**
 * The `prefers-color-scheme` media query, live. Hydration-safe: the server
 * render and the hydration pass both read `light`, and React re-renders with
 * the client's mode right after, so the theme class never mismatches.
 */
export function useSystemColorMode(): AlouetteModeTheme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
