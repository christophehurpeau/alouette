import { CaretRightRegularIcon } from "alouette-icons/phosphor-icons/CaretRightRegularIcon";
import { Children, type ReactNode, useMemo } from "react";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { Box } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import {
  BreadcrumbItemContextProvider,
  type BreadcrumbItemContextValue,
} from "./BreadcrumbsContext";

// The trail has no ground of its own — it labels the page rather than framing
// it — and wraps rather than overflowing on a narrow screen.
const breadcrumbsVariants = tv({
  slots: {
    frame: "flex-row flex-wrap items-center",
    separator: "text-muted",
  },
});

interface BreadcrumbSlotProps extends BreadcrumbItemContextValue {
  children: ReactNode;
}

function BreadcrumbSlot({
  current,
  disabled,
  onNavigate,
  children,
}: BreadcrumbSlotProps): ReactNode {
  const context = useMemo(
    () => ({ current, disabled, onNavigate }),
    [current, disabled, onNavigate],
  );
  return (
    <BreadcrumbItemContextProvider value={context}>
      {children}
    </BreadcrumbItemContextProvider>
  );
}

export interface BreadcrumbsProps {
  "aria-label"?: string;
  /** Icon drawn between two crumbs. Defaults to a caret. */
  separator?: SVGIconElement;
  /**
   * Called with the pressed crumb's `href`, for an app that routes in JS: the
   * crumb then cancels the anchor's own navigation. Without it — and without an
   * item `onPress` — the `<a>` navigates on web and native does nothing.
   */
  onNavigate?: (href: string) => void;
  accent?: Accent;
  disabled?: boolean;
  /** `BreadcrumbItem`s, from the root down to the page being viewed. */
  children: ReactNode;
  className?: string;
}

/**
 * Trail of the path to the current page. Each `BreadcrumbItem` is a link to an
 * ancestor except the last one, which the trail marks as the current page.
 */
export function Breadcrumbs({
  "aria-label": ariaLabel = "Breadcrumb",
  separator = <CaretRightRegularIcon />,
  onNavigate,
  accent,
  disabled = false,
  children,
  className,
}: BreadcrumbsProps): ReactNode {
  const styles = breadcrumbsVariants();
  const lastIndex = Children.count(children) - 1;

  return (
    <Box
      role="navigation"
      aria-label={ariaLabel}
      accent={accent}
      className={styles.frame({ className })}
    >
      {Children.map(children, (child, index) => (
        <BreadcrumbSlot
          current={index === lastIndex}
          disabled={disabled}
          onNavigate={onNavigate}
        >
          {index > 0 ? (
            <Icon icon={separator} size={16} className={styles.separator()} />
          ) : null}
          {child}
        </BreadcrumbSlot>
      ))}
    </Box>
  );
}
