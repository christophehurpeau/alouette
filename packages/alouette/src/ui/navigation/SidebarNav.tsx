import type { ReactNode } from "react";
import { twMerge } from "../../core/twMerge";
import { Box } from "../containers/Box";
import {
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { SidebarNavContextProvider } from "./SidebarNavContext";

export interface SidebarNavProps extends SelectionGroupProps {
  "aria-label"?: string;
  /** `SidebarNavItem`s, grouped under titles by `SidebarNavSection`s. */
  children: ReactNode;
  className?: string;
}

/**
 * The destinations of an application sidebar, as rows grouped in titled
 * sections. `value` is the current destination — it matches an item's `href`,
 * and is usually owned by the app's router, so pass it controlled.
 */
export function SidebarNav({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  children,
  className,
  ...props
}: SidebarNavProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
  });

  return (
    <SidebarNavContextProvider value={context}>
      <Box
        role="navigation"
        accent={accent}
        className={twMerge("gap-m", className)}
        {...props}
      >
        {children}
      </Box>
    </SidebarNavContextProvider>
  );
}
