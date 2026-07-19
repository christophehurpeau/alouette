import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { Icon } from "../primitives/Icon";
import { View } from "../primitives/View";
import { RingCircle } from "./RingCircle";
import { useSimulatedProgress } from "./useSimulatedProgress";

export type CircularProgressSize = "lg" | "md" | "sm" | "xs";

const diameterBySize: Record<CircularProgressSize, number> = {
  xs: 16,
  sm: 32,
  md: 64,
  lg: 128,
};

const strokeWidthBySize: Record<CircularProgressSize, number> = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
};

const ring = tv({
  base: "relative transition-opacity duration-fade",
  variants: {
    hidden: {
      true: "opacity-0",
      false: "opacity-100",
    },
  },
  defaultVariants: { hidden: false },
});

export interface CircularProgressProps {
  /** Known completion percentage, 0-100. For an unknown percentage (e.g.
   * reconnecting, page transitions), use `IndeterminateCircularProgress` instead. */
  progress: number;
  hidden?: boolean;
  accent?: Accent;
  size?: CircularProgressSize;
}

export function CircularProgress({
  progress,
  hidden = false,
  accent = "brand",
  size = "md",
}: CircularProgressProps): ReactNode {
  const diameter = diameterBySize[size];
  const strokeWidth = strokeWidthBySize[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const dashOffset = circumference * (1 - clampedProgress / 100);
  const center = diameter / 2;

  const trackRing = (
    <RingCircle center={center} radius={radius} strokeWidth={strokeWidth} />
  );

  const fillRing = (
    <RingCircle
      center={center}
      radius={radius}
      strokeWidth={strokeWidth}
      strokeDasharray={circumference}
      strokeDashoffset={dashOffset}
    />
  );

  return (
    <AccentScope accent={accent}>
      <View
        className={ring({ hidden })}
        style={{ width: diameter, height: diameter }}
      >
        <View className="absolute inset-0">
          <Icon
            icon={trackRing}
            size={diameter}
            className="text-border-muted"
          />
        </View>
        <View className="absolute inset-0">
          <Icon icon={fillRing} size={diameter} className="text-accent" />
        </View>
      </View>
    </AccentScope>
  );
}

export interface IndeterminateCircularProgressProps {
  /** Whether an operation is in progress. The ring creeps toward 100% while
   * `true`, then completes and fades out once `false`. */
  loading: boolean;
  accent?: Accent;
  size?: CircularProgressSize;
}

export function IndeterminateCircularProgress({
  loading,
  accent,
  size,
}: IndeterminateCircularProgressProps): ReactNode {
  const { progress, hidden } = useSimulatedProgress(loading);

  return (
    <CircularProgress
      progress={progress}
      hidden={hidden}
      accent={accent}
      size={size}
    />
  );
}
