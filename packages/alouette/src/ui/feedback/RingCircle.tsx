import type { ReactNode } from "react";
import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";
import { animationDurationsMs } from "../../animationDurationsMs";

export interface RingCircleProps {
  center: number;
  radius: number;
  strokeWidth: number;
  strokeDasharray?: number;
  strokeDashoffset?: number;
  /** Injected by the native `Icon` via `cloneElement`, resolved from a `useColorToken` string. */
  color?: string;
  /** Injected by the web `Icon` via `cloneElement` — the `text-*` class itself, resolved through CSS `currentColor`. */
  className?: string;
  width?: number;
  height?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Matches the web ring's CSS `ease-out` (cubic-bezier(0, 0, 0.58, 1)).
const easeOut = Easing.bezier(0, 0, 0.58, 1);

export function RingCircle({
  center,
  radius,
  strokeWidth,
  strokeDasharray,
  strokeDashoffset,
  color,
  width,
  height,
}: RingCircleProps): ReactNode {
  // strokeDashoffset is an SVG prop, not a view style, so NativeWind
  // transitions can't animate it — drive it with Reanimated instead.
  const animatedOffset = useSharedValue(strokeDashoffset ?? 0);

  useEffect(() => {
    animatedOffset.value = withTiming(strokeDashoffset ?? 0, {
      duration: animationDurationsMs.progress,
      easing: easeOut,
    });
  }, [animatedOffset, strokeDashoffset]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedOffset.value,
  }));

  return (
    <Svg color={color} width={width} height={height}>
      {strokeDasharray == null ? (
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
        />
      ) : (
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          fill="none"
        />
      )}
    </Svg>
  );
}
