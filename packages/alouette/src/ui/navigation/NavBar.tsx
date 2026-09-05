import type { ReactNode } from "react";
import { SegmentedBar } from "../selection/SegmentedBar";
import {
  type SegmentedOrientation,
  type SegmentedVariant,
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
  /**
   * `icon` renders the destinations as square icon-only chips in a pill-shaped
   * bar; each item's `label` stays its accessible name, so an item must carry
   * an `icon`.
   */
  variant?: SegmentedVariant;
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
  variant,
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
    variant,
  });

  return (
    <NavBarContextProvider value={context}>
      <SegmentedBar
        role="navigation"
        orientation={orientation}
        stretch={stretch}
        variant={variant}
        accent={accent}
        {...props}
      >
        {children}
      </SegmentedBar>
    </NavBarContextProvider>
  );
}
