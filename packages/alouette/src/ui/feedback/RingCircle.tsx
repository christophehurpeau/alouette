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
  // Same viewBox as Phosphor icons (e.g. CheckCircleRegularIcon, viewBox
  // "0 0 256 256"), whose glyph is a 208-diameter circle inset within it.
  // Rendering into the same viewBox at the same glyph diameter gives the ring
  // the same padding, so it keeps a consistent visual weight when swapped for
  // a Phosphor icon in the same slot (Button's overlay spinner → success check).
  const scale = 208 / (center * 2);
  const scaledRadius = radius * scale;
  const scaledStrokeWidth = strokeWidth * scale;
  const scaledDashoffset =
    strokeDashoffset == null ? undefined : strokeDashoffset * scale;

  // strokeDashoffset is an SVG prop, not a view style, so NativeWind
  // transitions can't animate it — drive it with Reanimated instead.
  const animatedOffset = useSharedValue(scaledDashoffset ?? 0);

  useEffect(() => {
    animatedOffset.value = withTiming(scaledDashoffset ?? 0, {
      duration: animationDurationsMs.progress,
      easing: easeOut,
    });
  }, [animatedOffset, scaledDashoffset]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedOffset.value,
  }));

  return (
    <Svg color={color} width={width} height={height} viewBox="0 0 256 256">
      {strokeDasharray == null ? (
        <Circle
          cx={128}
          cy={128}
          r={scaledRadius}
          stroke="currentColor"
          strokeWidth={scaledStrokeWidth}
          fill="none"
        />
      ) : (
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={128}
          cy={128}
          r={scaledRadius}
          stroke="currentColor"
          strokeWidth={scaledStrokeWidth}
          strokeDasharray={strokeDasharray * scale}
          strokeLinecap="round"
          transform="rotate(-90 128 128)"
          fill="none"
        />
      )}
    </Svg>
  );
}
