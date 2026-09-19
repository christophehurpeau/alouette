import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Box } from "../containers/Box";
import {
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { AppHeaderNavContextProvider } from "./AppHeaderNavContext";

// No ground of its own: the destinations are text links on the bar itself, so
// the row only spaces them. It wraps because the header hands it a whole line
// below `md` — a bar of links is allowed to take two of them rather than
// overflow the screen.
const appHeaderNavVariants = tv({
  base: "flex-row flex-wrap items-center gap-xxs",
});

export interface AppHeaderNavProps extends SelectionGroupProps {
  "aria-label"?: string;
  className?: string;
}

/**
 * Text navigation for an `AppHeader`: the same `link` + `aria-current="page"`
 * semantics as `NavBar`, without its lowered track — the destinations sit
 * directly on the bar, next to the brand. `value` is the current destination, it
 * matches an item's `href`, and it is usually the app router's, so pass it
 * controlled.
 *
 * `NavBar` is the alternative, not the parent: reach for it when the navigation
 * is the screen's main control (a stacked header line, a sidebar rail), and for
 * this one when it has to share a single line with the brand and the session.
 */
export function AppHeaderNav({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  className,
  children,
  ...props
}: AppHeaderNavProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
  });

  return (
    <AppHeaderNavContextProvider value={context}>
      <Box
        role="navigation"
        accent={accent}
        className={appHeaderNavVariants({ className })}
        {...props}
      >
        {children}
      </Box>
    </AppHeaderNavContextProvider>
  );
}
