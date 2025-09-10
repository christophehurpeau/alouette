/* eslint-disable unicorn/prefer-global-this */
import { createAnimations } from "@tamagui/animations-react-native";

export const animations = createAnimations({
  fast: {
    type: "timing",
    duration: 100,
    damping: 20,
    stiffness: 250,
  },
  medium: {
    type: "timing",
    duration: 300,
    damping: 20,
    stiffness: 250,
  },
  slow: {
    damping: 20,
    stiffness: 60,
  },
  formElement: {
    type: "timing",
    duration: 600,
    damping: 20,
    stiffness: 250,
  },
});

if ("navigator" in global) {
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  const navigator = global.navigator as any;
  if (
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    !navigator.userAgent?.startsWith("Node.js") &&
    navigator.product !== "ReactNative"
  ) {
    throw new Error(
      `animations native is loaded in web: ${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, n/no-unsupported-features/node-builtins
        navigator.appName || navigator.product || navigator.userAgent
      }`,
    );
  }
}
