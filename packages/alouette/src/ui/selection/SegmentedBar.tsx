import type { ReactNode } from "react";
import { Surface, type SurfaceProps } from "../containers/Surface";

export interface SegmentedBarProps extends Omit<
  SurfaceProps,
  "role" | "shadow" | "size" | "variant"
> {
  role: "navigation" | "radiogroup" | "tablist";
}

/**
 * Lowered track shared by every segmented group (RadioButtonGroup, NavBar, Tabs).
 * It is a 44px Surface with no vertical padding, so each item pressable fills the
 * full height (a 44px tap target) while rendering a shorter visible chip inside it.
 */
export function SegmentedBar({
  className,
  ...props
}: SegmentedBarProps): ReactNode {
  return (
    <Surface
      variant="lowered"
      size="sm"
      className={`flex-row items-stretch self-start gap-xxs px-xs py-0 min-h-[44px] ${className ?? ""}`}
      {...props}
    />
  );
}
