import { createAnimations } from "@tamagui/animations-css";
import { Platform } from "react-native";

export const animations = createAnimations({
  fast: "ease-in 150ms",
  medium: "ease-in 300ms",
  slow: "ease-in 450ms",
  formElement: "ease-in 200ms",
});

if (Platform.OS !== "web") {
  throw new Error(`animations web is loaded in native: ${Platform.OS}`);
}
