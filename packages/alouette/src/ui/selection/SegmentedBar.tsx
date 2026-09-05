import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Surface, type SurfaceProps } from "../containers/Surface";
import type { SegmentedOrientation } from "./SelectionContext";

// Horizontal: no vertical padding, so each 44px item fills the 44px bar and the
// inset frame comes from the shorter chip inside it. Vertical: the chips stretch
// to the bar's width instead, so the frame at the two ends is the bar's own
// `py-xs` — which is also what leaves the first and last focus ring room to
// draw, the bar being overflow-hidden.
// The bar is content-width, so it never spreads across whatever holds it;
// `stretch` opts into the opposite, for a container that is meant to be filled
// (the stacked line of an AppHeader). Where the container is content-sized
// anyway — the `md` line of that same header — stretching changes nothing.
const segmentedBarVariants = tv({
  base: "items-stretch gap-xxs px-xs py-0",
  variants: {
    orientation: {
      horizontal: "flex-row min-h-[44px]",
      vertical: "flex-col py-xs",
    },
    stretch: {
      true: "self-stretch",
      false: "self-start",
    },
  },
  defaultVariants: { orientation: "horizontal", stretch: false },
});

export interface SegmentedBarProps extends Omit<
  SurfaceProps,
  "role" | "shadow" | "size" | "variant"
> {
  role: "navigation" | "radiogroup" | "tablist";
  orientation?: SegmentedOrientation;
  stretch?: boolean;
}

/**
 * Lowered track shared by every segmented group (RadioButtonGroup, NavBar, Tabs).
 * It is a 44px Surface with no vertical padding, so each item pressable fills the
 * full height (a 44px tap target) while rendering a shorter visible chip inside it.
 */
export function SegmentedBar({
  orientation,
  stretch,
  className,
  ...props
}: SegmentedBarProps): ReactNode {
  return (
    <Surface
      variant="lowered"
      size="sm"
      className={segmentedBarVariants({ orientation, stretch, className })}
      {...props}
    />
  );
}
