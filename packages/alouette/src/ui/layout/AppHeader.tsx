import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import { useConsumedSafeAreaEdges } from "../../core/SafeAreaEdgesContext";
import { useScreenSafeAreaPadding } from "../../core/useScreenSafeAreaPadding";
import { Box, type BoxProps } from "../containers/Box";
import { View } from "../primitives/View";

export type AppHeaderSize = "md" | "sm" | "xs";

// The bar is a frame (background, separation, safe-area inset) around a boxed
// wrapping row. The DOM is the small layout: brand and actions share the first
// line (pushed apart by `justify-between`), the navigation takes the whole
// second one. From `md` the three sit on one line, in reading order — which
// needs the navigation moved back between the two slots the DOM has next to each
// other, and that is what the `order` utilities do. React Native has no `order`,
// so the whole `md` line is `web:`-only and native keeps the two-line layout at
// every width (Expo web goes down the web branch, so both Storybook previews
// agree).
// On that line the end slot is what carries the free space: it grows from a zero
// basis, so the navigation is packed against the brand and the actions stay at
// the far edge. `navAlign="center"` grows the start slot symmetrically instead,
// which centers the navigation between the two — and the end slot is rendered
// even when empty, so a header without actions centers it just the same.
// A grown slot needs a content floor put back: react-native-web's View reset
// sets `min-width: 0`, so a slot would take its share of the free space whatever
// its children measure — a child (never shrinkable in RNW) then spills over the
// navigation, and the row, breaking lines on a hypothetical size of 0, still
// calls it one line. `min-w-fit` keeps the growth while there is room and freezes
// a slot at its content width instead of letting it shrink under it, so the row
// wraps only when the content genuinely does not fit.
// `inner` needs `w-full` because `self-center` (what centers the boxed row
// under `max-w`) opts it out of the frame's stretch; the frame itself stretches.
const appHeaderVariants = tv({
  slots: {
    frame: "",
    inner: "w-full self-center flex-row flex-wrap items-center justify-between",
    startSlot: "items-start",
    endSlot: "items-end web:md:order-3 web:md:flex-1 web:md:min-w-fit",
    navSlot:
      "w-full items-stretch web:md:order-2 web:md:w-auto web:md:items-center",
  },
  variants: {
    size: {
      xs: { inner: "gap-xs px-xs md:px-m py-1 md:gap-xs" },
      sm: { inner: "gap-xs px-m md:px-l py-xs md:gap-sm" },
      md: { inner: "gap-sm px-m md:px-l py-sm md:gap-m" },
    },
    navAlign: {
      // The navigation reads as a continuation of the brand, which is what a
      // text `AppHeaderNav` wants: nothing between the two but the row's gap.
      start: {},
      // A second grown slot on the other side of the navigation, so the free
      // space is split evenly and the navigation lands in the middle.
      center: { startSlot: "web:md:flex-1 web:md:min-w-fit" },
    },
    variant: {
      // `shadow-bar` casts downwards only: the header sits above the page, it is
      // not a raised control catching a highlight on its own top edge.
      bar: { frame: "bg-highlight shadow-bar" },
      // Part of the page it heads (a landing hero): no ground of its own, so
      // whatever is behind shows through.
      transparent: { frame: "bg-transparent" },
    },
    contentWidth: {
      boxed: { inner: "max-w-[1200px]" },
      full: {},
    },
    withActions: {
      // Without actions the end slot is a pure spacer: it only has to exist on
      // the single-line layout, where it takes the free space (`start`) or
      // balances the start slot (`center`).
      false: { endSlot: "hidden web:md:flex" },
      true: {},
    },
  },
  defaultVariants: {
    size: "md",
    variant: "bar",
    contentWidth: "boxed",
    navAlign: "start",
  },
});

type AppHeaderVariantProps = Omit<
  VariantProps<typeof appHeaderVariants>,
  "size" | "withActions"
>;

export interface AppHeaderProps
  extends Omit<BoxProps, "children">, AppHeaderVariantProps {
  size?: AppHeaderSize;
  /** Start slot — typically an `AppHeaderBrand`. */
  brand?: ReactNode;
  /** End slot — typically an `AppHeaderActions`. */
  actions?: ReactNode;
  /**
   * Navigation slot — an `AppHeaderNav` or a `NavBar`. It owns the second line
   * while the header is stacked, so give a `NavBar` `stretch` to fill that line.
   */
  children?: ReactNode;
  /**
   * Pads the frame with the device's top inset, so the bar clears the status
   * bar while its background bleeds under it. Native-only, and skipped when an
   * ancestor `SafeAreaScope` declares the top edge already consumed.
   */
  withSafeAreaTop?: boolean;
}

/**
 * Application banner: brand, navigation and session actions on one boxed row
 * from `md` on web, the navigation next to the brand. Below it — and on native
 * at every width — the brand and the actions share the first line and the
 * navigation spans the second.
 */
export function AppHeader({
  brand,
  actions,
  children,
  size,
  variant,
  contentWidth,
  navAlign,
  withSafeAreaTop = true,
  className,
  ...props
}: AppHeaderProps): ReactNode {
  const consumedEdges = useConsumedSafeAreaEdges();
  const safeAreaPadding = useScreenSafeAreaPadding(
    withSafeAreaTop && !consumedEdges.includes("top") ? ["top"] : [],
  );
  const styles = appHeaderVariants({
    size,
    variant,
    contentWidth,
    navAlign,
    withActions: actions !== undefined,
  });

  return (
    <Box
      role="banner"
      className={styles.frame({ className })}
      style={safeAreaPadding}
      {...props}
    >
      <View className={styles.inner()}>
        <View className={styles.startSlot()}>{brand}</View>
        <View className={styles.endSlot()}>{actions}</View>
        {children ? <View className={styles.navSlot()}>{children}</View> : null}
      </View>
    </Box>
  );
}
