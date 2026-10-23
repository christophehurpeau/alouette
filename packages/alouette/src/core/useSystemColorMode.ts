import { useColorScheme } from "react-native";
import type { AlouetteModeTheme } from "./AlouetteConfig";

/** The OS light/dark setting, live. */
export function useSystemColorMode(): AlouetteModeTheme {
  return useColorScheme() === "dark" ? "dark" : "light";
}
