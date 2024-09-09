import { createAnimations } from "@tamagui/animations-react-native";

export const animations = createAnimations({
  fast: {
    type: "timing",
    duration: 100,
    damping: 20,
    stiffness: 250,
  },
  formElement: {
    type: "timing",
    duration: 600,
    damping: 20,
    stiffness: 250,
  },
});

if ("navigator" in global) {
  throw new Error("animations native is loaded in web");
}
