import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import {
  SafeAreaScope,
  allSafeAreaEdges,
  useConsumedSafeAreaEdges,
} from "../../core/SafeAreaEdgesContext";
import { useScreenSafeAreaPadding } from "../../core/useScreenSafeAreaPadding";
import { ScrollView, type ScrollViewProps } from "../primitives/ScrollView";
import { View } from "../primitives/View";

// The shell scrolls as one page: the header and the footer are part of the
// scrolled content, not chrome pinned around it, so the screen keeps the whole
// viewport and the bar comes back by scrolling up.
// `position: sticky` has no React Native equivalent, so the rail's is `web:`-only
// and it scrolls with the page on device — where a bottom NavBar, not a side
// rail, is the navigation anyway.
const appLayoutVariants = tv({
  slots: {
    frame: "min-h-full",
    // The page's ground rides with the content, which is opaque and always
    // fills the shell — the frame's own ground shows in one place only: the
    // band a bounce opens past an edge.
    content: "grow bg-screen",
    body: "grow flex-col md:flex-row",
    sidebar:
      "shrink-0 self-stretch p-sm md:p-m web:sticky web:top-0 web:max-h-screen",
    // `shrink` is not redundant with `grow`: React Native's shrink is 0, so the
    // screen would otherwise take its content's widest line as its width and
    // widen the row past the shell — and the scroll is vertical, so what leaves
    // the right edge is clipped, not reachable.
    main: "grow shrink",
  },
  variants: {
    withHeader: {
      // That band bares the scroll container, never the content that slid away,
      // so the frame carries the ground each end needs: the `bar` header's
      // above, the screen's below, split at the middle where no band reaches.
      // React Native cannot paint a gradient on a ScrollView, so native keeps
      // the flat bar ground.
      true: {
        frame:
          "bg-highlight web:bg-linear-to-b web:from-highlight web:from-50% web:to-screen web:to-50%",
      },
      false: { frame: "bg-screen" },
    },
  },
});

export interface AppLayoutProps extends Omit<ScrollViewProps, "children"> {
  /**
   * Top chrome — typically an `AppHeader`. It owns its safe-area top inset, and
   * the shell takes the `bar` header's ground for its own, so a pull past the
   * top of the scroll goes on showing the bar rather than baring the screen.
   */
  header?: ReactNode;
  /** Bottom chrome — a `contentinfo` bar closing the scrolled page. */
  footer?: ReactNode;
  /**
   * Left rail beside the screen, composed by the caller — typically a
   * `<NavBar orientation="vertical" className="w-[220px] grow">`: the width
   * fixes the rail and `grow` fills the height the layout stretches it to. It
   * carries no landmark of its own, the composed navigation is the landmark.
   */
  sidebar?: ReactNode;
  /** The screen itself, in a `main` landmark. */
  children?: ReactNode;
}

/**
 * Application shell: a header, an optional left sidebar beside the screen and a
 * footer, scrolling together as one page. Every slot is composed by the caller —
 * the layout places them, sizes the screen to whatever is left, and applies the
 * safe-area insets around the body (the header pads its own top), so the screen
 * inside needs no scroll container and no insets of its own.
 */
export function AppLayout({
  header,
  footer,
  sidebar,
  children,
  className,
  contentContainerClassName,
  contentContainerStyle,
  ...props
}: AppLayoutProps): ReactNode {
  const styles = appLayoutVariants({ withHeader: header !== undefined });
  const consumedEdges = useConsumedSafeAreaEdges();
  // The header pads its own top inset so its background bleeds under the status
  // bar; every other edge is padded around the whole scrolled page, which puts
  // the bottom one below the footer instead of above it.
  const paddedEdges = allSafeAreaEdges.filter(
    (edge) =>
      !consumedEdges.includes(edge) &&
      !(header !== undefined && edge === "top"),
  );
  const safeAreaPadding = useScreenSafeAreaPadding(paddedEdges);

  return (
    <ScrollView
      className={styles.frame({ className })}
      contentContainerClassName={styles.content({
        className: contentContainerClassName,
      })}
      contentContainerStyle={
        safeAreaPadding
          ? [contentContainerStyle, safeAreaPadding]
          : contentContainerStyle
      }
      {...props}
    >
      {header}
      <SafeAreaScope consumedEdges={allSafeAreaEdges}>
        <View className={styles.body()}>
          {sidebar ? <View className={styles.sidebar()}>{sidebar}</View> : null}
          <View role="main" className={styles.main()}>
            {children}
          </View>
        </View>
        {footer}
      </SafeAreaScope>
    </ScrollView>
  );
}
