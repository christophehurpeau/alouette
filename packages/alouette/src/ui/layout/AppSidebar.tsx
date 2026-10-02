import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { twMergeConfig } from "../../core/twMerge";
import { useScrollEndState } from "../../core/useScrollEndState";
import { ScrollView } from "../primitives/ScrollView";
import { View } from "../primitives/View";

// The top and the bottom are pinned and only the body scrolls, so the brand,
// the selects and the account stay in reach of a long navigation.
// The body spans the column, so its scrollbar sits in the column's own right
// gutter: `mr-xxs` keeps it off the panel, and the content's `pr-xs` off the
// rows. With nothing to scroll, or an overlay scrollbar, the rows are exactly
// as wide as the selects above them (`pl-sm` + `pr-xs` + `mr-xxs` = the top's
// `px-sm`). A rule also marks the edge rows are hidden past, since an overlay
// scrollbar shows only while scrolling; it is transparent at rest, so it never
// shifts the layout. The content's padding holds the rows' focus ring (2px
// offset + 2px width) inside the scroll, which clips.
// The brand row's `pl-m` is a select's own padding: it lines the brand mark up
// with the selects' icons.
const appSidebarVariants = tv(
  {
    slots: {
      frame: "w-[280px] flex-1 gap-sm py-m",
      top: "gap-sm px-sm",
      brandRow: "flex-row items-center justify-between gap-xs pl-m",
      actions: "flex-row items-center gap-xxs",
      body: "flex-1 mr-xxs border-y border-transparent transition-colors duration-fast ease-in",
      bodyContent: "gap-m py-xxs pl-sm pr-xs",
      footer: "px-sm",
    },
    variants: {
      hiddenAbove: { true: { body: "border-t-border-muted" } },
      hiddenBelow: { true: { body: "border-b-border-muted" } },
    },
  },
  { twMergeConfig },
);

export interface AppSidebarProps {
  /** Start of the top row — typically an `AppHeaderBrand`. */
  brand?: ReactNode;
  /** End of the top row — `soft` `IconButton`s (search, notifications). */
  actions?: ReactNode;
  /**
   * Pinned under the top row — the `Select`s choosing what the navigation
   * applies to (a team, a site).
   */
  header?: ReactNode;
  /** The scrolling body — a `SidebarNav`. */
  children?: ReactNode;
  /** Pinned at the bottom — typically an `AppSidebarAccount`. */
  footer?: ReactNode;
  /** Merged over the frame; the width is `w-[280px]` by default. */
  className?: string;
}

/**
 * The column an `AppSidebarLayout` puts beside the screen: brand and actions,
 * the selects scoping it, the navigation and the account, on the layout's
 * lowered ground.
 */
export function AppSidebar({
  brand,
  actions,
  header,
  children,
  footer,
  className,
}: AppSidebarProps): ReactNode {
  const { isScrolledToStart, isScrolledToEnd, scrollViewProps } =
    useScrollEndState();
  const styles = appSidebarVariants({
    hiddenAbove: !isScrolledToStart,
    hiddenBelow: !isScrolledToEnd,
  });
  const withTopRow = brand !== undefined || actions !== undefined;

  return (
    <View className={styles.frame({ className })}>
      {withTopRow || header !== undefined ? (
        <View className={styles.top()}>
          {withTopRow ? (
            <View className={styles.brandRow()}>
              <View>{brand}</View>
              {actions === undefined ? null : (
                <View className={styles.actions()}>{actions}</View>
              )}
            </View>
          ) : null}
          {header}
        </View>
      ) : null}
      <ScrollView
        className={styles.body()}
        contentContainerClassName={styles.bodyContent()}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
      {footer === undefined ? null : (
        <View className={styles.footer()}>{footer}</View>
      )}
    </View>
  );
}
