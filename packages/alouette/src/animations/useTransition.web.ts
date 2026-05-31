// Web no-op — consumers use Tailwind `transition-* duration-* ease-*` utilities
// to animate via real CSS instead of via Reanimated.
import type { TransitionName } from "./curves";

export function useTransitionScale(
  _active: boolean,
  _name: TransitionName = "fast",
  _pressedScale = 0.975,
): undefined {
  return undefined;
}
