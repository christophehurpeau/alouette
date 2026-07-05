import type { ReactNode } from "react";
import { Circle, Svg } from "react-native-svg";

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
  return (
    <Svg color={color} width={width} height={height}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap={strokeDasharray == null ? undefined : "round"}
        transform={
          strokeDasharray == null
            ? undefined
            : `rotate(-90 ${center} ${center})`
        }
        fill="none"
      />
    </Svg>
  );
}
