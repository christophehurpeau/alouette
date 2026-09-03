import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Surface, type SurfaceProps } from "../containers/Surface";
import type { SegmentedOrientation } from "./SelectionContext";

// Horizontal: no vertical padding, so each 44px item fills the 44px bar and the
// inset frame comes from the shorter chip inside it. Vertical: the same frame,
// rotated — the bar is as tall as its stacked items and the chips stretch to
// its width.
const segmentedBarVariants = tv({
  base: "items-stretch self-start gap-xxs px-xs py-0",
  variants: {
    orientation: {
      horizontal: "flex-row min-h-[44px]",
      vertical: "flex-col",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export interface SegmentedBarProps extends Omit<
  SurfaceProps,
  "role" | "shadow" | "size" | "variant"
> {
  role: "navigation" | "radiogroup" | "tablist";
  orientation?: SegmentedOrientation;
}

/**
 * Lowered track shared by every segmented group (RadioButtonGroup, NavBar, Tabs).
 * It is a 44px Surface with no vertical padding, so each item pressable fills the
 * full height (a 44px tap target) while rendering a shorter visible chip inside it.
 */
export function SegmentedBar({
  orientation,
  className,
  ...props
}: SegmentedBarProps): ReactNode {
  return (
    <Surface
      variant="lowered"
      size="sm"
      className={segmentedBarVariants({ orientation, className })}
      {...props}
    />
  );
}
