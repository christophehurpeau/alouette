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
  /**
   * The bar fills the width it is given instead of hugging its destinations,
   * which share it equally — what a stacked `AppHeader` wants for the line it
   * hands to the navigation.
   */
  stretch?: boolean;
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
  stretch,
  children,
  ...props
}: NavBarProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
    orientation,
    stretch,
  });

  return (
    <NavBarContextProvider value={context}>
      <SegmentedBar
        role="navigation"
        orientation={orientation}
        stretch={stretch}
        accent={accent}
        {...props}
      >
        {children}
      </SegmentedBar>
    </NavBarContextProvider>
  );
}
