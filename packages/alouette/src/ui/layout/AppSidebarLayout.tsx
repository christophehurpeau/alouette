import type { ReactNode } from "react";
import { useWindowDimensions } from "react-native";
import { tv } from "tailwind-variants";
import { Breakpoints } from "../../config/Breakpoints";
import {
  SafeAreaScope,
  allSafeAreaEdges,
  useConsumedSafeAreaEdges,
} from "../../core/SafeAreaEdgesContext";
import { useScreenSafeAreaPadding } from "../../core/useScreenSafeAreaPadding";
import { ScrollView } from "../primitives/ScrollView";
import { View } from "../primitives/View";

// One tree at every width, switched by breakpoint classes rather than by
// rendering another layout, so crossing the breakpoint (a tablet rotating, a
// window resized) keeps the screen mounted. The breakpoint is a variant because
// Tailwind only sees literal classes: each branch spells its own prefix.
// Below the breakpoint it is the AppShell page: the header scrolls with the
// screen, and the frame carries the ground each end of an overscroll bares —
// the bar's above, the screen's below. From it the frame is the sidebar's
// lowered ground and the screen sits in a raised panel inset in it, scrolling
// on its own while the sidebar stays put.
// The panel and its scroll are two elements because iOS clips a shadow to its
// own view's bounds once that view clips its content, which a scroll does.
// The panel's padding is the web scrollbar's gutter: it keeps the bar off the
// panel's edge and clear of its rounded corners, which a bar running along
// the edge would square off. It goes all around, because the scroll's own
// square corners would otherwise poke out of the rounded ones on the left.
const appSidebarLayoutVariants = tv({
  slots: {
    frame: "flex-1",
    sidebar: "hidden shrink-0",
    panel: "flex-1 shrink bg-screen",
    scroll: "flex-1",
    content: "grow bg-screen",
    header: "",
    main: "grow",
  },
  variants: {
    sidebarBreakpoint: {
      md: {
        frame: "md:flex-row md:bg-lowered",
        sidebar: "md:flex",
        panel: "md:my-xs md:mr-xs md:rounded-sm md:p-xs md:shadow-s",
        header: "md:hidden",
      },
      lg: {
        frame: "lg:flex-row lg:bg-lowered",
        sidebar: "lg:flex",
        panel: "lg:my-xs lg:mr-xs lg:rounded-sm lg:p-xs lg:shadow-s",
        header: "lg:hidden",
      },
      xl: {
        frame: "xl:flex-row xl:bg-lowered",
        sidebar: "xl:flex",
        panel: "xl:my-xs xl:mr-xs xl:rounded-sm xl:p-xs xl:shadow-s",
        header: "xl:hidden",
      },
    },
    withHeader: {
      true: {
        scroll:
          "bg-highlight web:bg-linear-to-b web:from-highlight web:from-50% web:to-screen web:to-50%",
      },
      false: { scroll: "bg-screen" },
    },
  },
  compoundVariants: [
    {
      withHeader: true,
      sidebarBreakpoint: "md",
      class: { scroll: "md:bg-screen web:md:bg-none" },
    },
    {
      withHeader: true,
      sidebarBreakpoint: "lg",
      class: { scroll: "lg:bg-screen web:lg:bg-none" },
    },
    {
      withHeader: true,
      sidebarBreakpoint: "xl",
      class: { scroll: "xl:bg-screen web:xl:bg-none" },
    },
  ],
});

const sidebarBreakpointWidths = {
  md: Breakpoints.MEDIUM,
  lg: Breakpoints.LARGE,
  xl: Breakpoints.WIDE,
} as const;

export type AppSidebarLayoutBreakpoint = keyof typeof sidebarBreakpointWidths;

export interface AppSidebarLayoutProps {
  /**
   * Left column from `sidebarBreakpoint` — typically an `AppSidebar`. Below it
   * it is not rendered visibly: the `header` takes over.
   */
  sidebar: ReactNode;
  /**
   * Top chrome below `sidebarBreakpoint` only — typically an `AppHeader`. It
   * scrolls with the screen, as in an `AppShell`. What it holds depends on the
   * navigation: a few destinations fit in a `NavBar` or an `HeaderNav`; a long
   * one belongs behind a menu button opening a drawer.
   */
  header?: ReactNode;
  /**
   * Width from which the sidebar shows (`md` 768px, `lg` 1024px, `xl`
   * 1280px). Below it the `header` takes over. Defaults to `lg`, the narrowest
   * width leaving the screen beside a 280px sidebar room for a layout of its
   * own.
   */
  sidebarBreakpoint?: AppSidebarLayoutBreakpoint;
  /** The screen itself, in a `main` landmark. */
  children?: ReactNode;
  "aria-label"?: string;
  className?: string;
}

/**
 * Application layout: from `sidebarBreakpoint` a sidebar beside the screen,
 * which sits in a raised panel and scrolls on its own; below it, a header
 * scrolling with the screen as one page. The layout applies the safe-area
 * insets around the body, so the screen inside needs no scroll container and
 * no insets of its own.
 */
export function AppSidebarLayout({
  sidebar,
  header,
  sidebarBreakpoint = "lg",
  children,
  className,
  "aria-label": ariaLabel,
}: AppSidebarLayoutProps): ReactNode {
  const styles = appSidebarLayoutVariants({
    sidebarBreakpoint,
    withHeader: header !== undefined,
  });
  const { width } = useWindowDimensions();
  const withSidebar = width >= sidebarBreakpointWidths[sidebarBreakpoint];
  const consumedEdges = useConsumedSafeAreaEdges();
  const unconsumedEdges = allSafeAreaEdges.filter(
    (edge) => !consumedEdges.includes(edge),
  );
  // From the breakpoint the frame pads every edge, so the sidebar and the
  // panel both clear them. Below it the header pads its own top inset, so its
  // ground bleeds under the status bar, and the scrolled page pads the rest.
  const framePadding = useScreenSafeAreaPadding(
    withSidebar ? unconsumedEdges : [],
  );
  const contentPadding = useScreenSafeAreaPadding(
    withSidebar
      ? []
      : unconsumedEdges.filter(
          (edge) => !(header !== undefined && edge === "top"),
        ),
  );

  return (
    <View
      aria-label={ariaLabel}
      className={styles.frame({ className })}
      style={framePadding}
    >
      <SafeAreaScope consumedEdges={withSidebar ? allSafeAreaEdges : []}>
        <View className={styles.sidebar()}>{sidebar}</View>
        <View className={styles.panel()}>
          <ScrollView
            className={styles.scroll()}
            contentContainerClassName={styles.content()}
            contentContainerStyle={contentPadding}
          >
            {header === undefined ? null : (
              <View className={styles.header()}>{header}</View>
            )}
            <SafeAreaScope consumedEdges={allSafeAreaEdges}>
              <View role="main" className={styles.main()}>
                {children}
              </View>
            </SafeAreaScope>
          </ScrollView>
        </View>
      </SafeAreaScope>
    </View>
  );
}
