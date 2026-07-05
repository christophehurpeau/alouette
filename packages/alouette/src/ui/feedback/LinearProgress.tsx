import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { View } from "../primitives/View";
import { useSimulatedProgress } from "./useSimulatedProgress";

export type LinearProgressSize = "lg" | "md" | "sm" | "xs";

const track = tv({
  base: "absolute inset-x-0 top-0 z-10 overflow-hidden transition-opacity duration-300",
  variants: {
    size: {
      xs: "h-0.5",
      sm: "h-1",
      md: "h-1.5",
      lg: "h-2",
    },
    hidden: {
      true: "opacity-0",
      false: "opacity-100",
    },
  },
  defaultVariants: { size: "md", hidden: false },
});

export interface LinearProgressProps {
  /** Known completion percentage, 0-100. For an unknown percentage (e.g.
   * reconnecting, page transitions), use `IndeterminateLinearProgress` instead. */
  progress: number;
  hidden?: boolean;
  accent?: Accent;
  size?: LinearProgressSize;
}

export function LinearProgress({
  progress,
  hidden = false,
  accent = "brand",
  size = "md",
}: LinearProgressProps): ReactNode {
  return (
    <AccentScope accent={accent}>
      <View pointerEvents="none" className={track({ size, hidden })}>
        <View
          className="h-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </View>
    </AccentScope>
  );
}

export interface IndeterminateLinearProgressProps {
  /** Whether an operation is in progress. The bar creeps toward 100% while
   * `true`, then completes and fades out once `false`. */
  loading: boolean;
  accent?: Accent;
  size?: LinearProgressSize;
}

export function IndeterminateLinearProgress({
  loading,
  accent,
  size,
}: IndeterminateLinearProgressProps): ReactNode {
  const { progress, hidden } = useSimulatedProgress(loading);

  return (
    <LinearProgress
      progress={progress}
      hidden={hidden}
      accent={accent}
      size={size}
    />
  );
}
