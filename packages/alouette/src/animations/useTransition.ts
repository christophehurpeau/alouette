// Native: drives a numeric value (0..1) through a timing curve via Reanimated.
// Consumers compose the returned animated style into their own style prop, e.g.
//   const style = useTransitionScale(pressed, "fast");
//   <Animated.View style={style} />
//
// Web has a no-op variant (useTransition.web.ts) — web relies on Tailwind
// transition-* / duration-* / ease-* utilities for the same effect.
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TRANSITION_DURATION, type TransitionName } from "./curves";

export function useTransitionScale(
  active: boolean,
  name: TransitionName = "fast",
  pressedScale = 0.975,
) {
  const scale = useSharedValue(1);
  scale.value = withTiming(active ? pressedScale : 1, {
    duration: TRANSITION_DURATION[name],
    easing: Easing.in(Easing.ease),
  });
  return useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
}
