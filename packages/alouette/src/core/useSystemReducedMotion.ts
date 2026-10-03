import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";
import { useReducedMotion as useReducedMotionAtLaunch } from "react-native-reanimated";

/**
 * The OS reduce-motion setting, live. Starts from the value Reanimated reads
 * synchronously at launch, so the first render does not animate while an
 * async `AccessibilityInfo.isReduceMotionEnabled()` would still be pending;
 * the change event covers the setting toggled afterwards.
 */
export function useSystemReducedMotion(): boolean {
  const reducedMotionAtLaunch = useReducedMotionAtLaunch();
  const [reducedMotion, setReducedMotion] = useState(reducedMotionAtLaunch);

  useEffect(() => {
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReducedMotion,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return reducedMotion;
}
