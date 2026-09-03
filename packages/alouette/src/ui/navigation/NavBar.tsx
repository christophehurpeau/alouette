import type { ReactNode } from "react";
import { SegmentedBar } from "../selection/SegmentedBar";
import {
  type SegmentedOrientation,
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { NavBarContextProvider } from "./NavBarContext";

export interface NavBarProps extends SelectionGroupProps {
  "aria-label"?: string;
  /**
   * `vertical` stacks the destinations as a sidebar rail, each item spanning
   * the bar's width. The bar is content-width; give it a `className` width to
   * fix the rail.
   */
  orientation?: SegmentedOrientation;
  className?: string;
}

/**
 * Segmented navigation between destinations. `value` is the current
 * destination — it matches an item's `href`, and is usually owned by the app's
 * router, so pass it controlled.
 */
export function NavBar({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  orientation,
  children,
  ...props
}: NavBarProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
    orientation,
  });

  return (
    <NavBarContextProvider value={context}>
      <SegmentedBar
        role="navigation"
        orientation={orientation}
        accent={accent}
        {...props}
      >
        {children}
      </SegmentedBar>
    </NavBarContextProvider>
  );
}
