import type { ReactNode } from "react";
import { SegmentedBar } from "../selection/SegmentedBar";
import {
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { NavBarContextProvider } from "./NavBarContext";

export interface NavBarProps extends SelectionGroupProps {
  "aria-label"?: string;
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
  children,
  ...props
}: NavBarProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
  });

  return (
    <NavBarContextProvider value={context}>
      <SegmentedBar role="navigation" accent={accent} {...props}>
        {children}
      </SegmentedBar>
    </NavBarContextProvider>
  );
}
