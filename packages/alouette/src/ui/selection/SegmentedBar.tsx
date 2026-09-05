import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Surface, type SurfaceProps } from "../containers/Surface";
import type {
  SegmentedOrientation,
  SegmentedVariant,
} from "./SelectionContext";

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
  base: "items-stretch px-xs py-0",
  variants: {
    orientation: {
      horizontal: "flex-row min-h-[44px]",
      vertical: "flex-col py-xs",
    },
    stretch: {
      true: "self-stretch",
      false: "self-start",
    },
    // A bar of square icon chips is a stadium at the 44px height, so the track
    // takes the same radius as the chips it holds. It drops its gap and its
    // horizontal padding too: the chip is already inset inside its own 44px tap
    // target, so keeping either would add to that slack and leave the icons
    // floating far apart.
    variant: {
      segmented: "gap-xxs",
      icon: "rounded-md gap-0",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    stretch: false,
    variant: "segmented",
  },
});

export interface SegmentedBarProps extends Omit<
  SurfaceProps,
  "role" | "shadow" | "size" | "variant"
> {
  role: "navigation" | "radiogroup" | "tablist";
  orientation?: SegmentedOrientation;
  stretch?: boolean;
  variant?: SegmentedVariant;
}

/**
 * Lowered track shared by every segmented group (RadioButtonGroup, NavBar, Tabs).
 * It is a 44px Surface with no vertical padding, so each item pressable fills the
 * full height (a 44px tap target) while rendering a shorter visible chip inside it.
 */
export function SegmentedBar({
  orientation,
  stretch,
  variant,
  className,
  ...props
}: SegmentedBarProps): ReactNode {
  return (
    <Surface
      variant="lowered"
      size="sm"
      className={segmentedBarVariants({
        orientation,
        stretch,
        variant,
        className,
      })}
      {...props}
    />
  );
}
