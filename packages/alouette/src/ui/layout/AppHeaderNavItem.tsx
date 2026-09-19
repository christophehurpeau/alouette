import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { tv } from "tailwind-variants";
import { PressableBox } from "../actions/PressableBox";
import type { AccentScopeProps } from "../containers/AccentScope";
import type { SVGIconElement } from "../primitives/Icon";
import { InteractiveIcon } from "../primitives/InteractiveIcon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { useAppHeaderNavContext } from "./AppHeaderNavContext";

// The affordance is `PressableBox`'s `soft` fill, the same one every other
// pressable of the bar carries; the underline is the *state* on top of it — the
// current destination — so it takes the accent rather than an `interactive-*`
// token and never reacts to hover.
// It is absolutely placed at the bottom of the 44px target instead of being a
// `border-b` on the pressable, which would follow the rounded corners into two
// hooks, and is inset by the pressable's own padding so it spans the label
// rather than the hover fill. It cross-fades on opacity, as the SegmentedItem
// chip does, so an unselected item reserves its space and the row never shifts.
const appHeaderNavItemVariants = tv({
  slots: {
    pressable:
      "relative flex-row items-center gap-xs min-h-[44px] rounded-xs px-xs md:px-sm",
    underline:
      "absolute inset-x-xs md:inset-x-sm bottom-0 h-[2px] rounded-full bg-accent transition-opacity duration-fast ease-in",
    foreground: "transition-[color] duration-fast ease-in",
    label: "select-none font-body-bold text-sm lg:text-base",
    // `Badge` pins itself with `self-start`, which wins over the row's
    // `items-center` and hangs it from the top of the 44px target. This wrapper
    // is what the row aligns instead, so the badge rides at the label's height.
    badge: "self-center",
  },
  variants: {
    selected: {
      true: {
        underline: "opacity-100",
        foreground: "text-sharp",
      },
      false: {
        underline: "opacity-0",
        foreground: "text-muted group-hover:text-sharp",
      },
    },
    // Declared after `selected` so a disabled current destination takes the
    // grayscale underline rather than the accent one.
    disabled: {
      true: {
        underline: "bg-disabled-interactive",
        foreground: "text-disabled-muted group-hover:text-disabled-muted",
      },
      false: {},
    },
  },
  defaultVariants: { disabled: false },
});

export interface AppHeaderNavItemProps {
  /**
   * Destination, matched against the AppHeaderNav's value to mark the item
   * current. Renders a real `<a href>` on web (native ignores it); expo Router's
   * `<Link asChild>` injects it, so it does not have to be written twice.
   */
  href?: string;
  label: string;
  icon?: SVGIconElement;
  /**
   * Replaces `icon` while the item is hovered, focused or pressed, and for as
   * long as it is the current destination — a duotone twin of `icon`, usually.
   */
  activeIcon?: SVGIconElement;
  /** Accent tinting `activeIcon`, so the glyph changes color as well as weight. */
  activeAccent?: AccentScopeProps["accent"];
  /**
   * Trailing count or status rendered after the label, inside the same
   * pressable — typically a `Badge`.
   */
  badge?: ReactNode;
  /** Names the destination when a `badge` leaves the visible label incomplete. */
  "aria-label"?: string;
  disabled?: boolean;
  /**
   * Handles the press instead of the group's `onValueChange` — this is what
   * `<Link asChild>` injects. An AppHeaderNav whose items carry `onPress` must
   * be controlled: its internal value never updates. A handler that navigates on
   * web must call `event.preventDefault()`, as routers do.
   */
  onPress?: (event: GestureResponderEvent) => void;
}

export function AppHeaderNavItem({
  href,
  label,
  icon,
  activeIcon,
  activeAccent,
  badge,
  "aria-label": ariaLabel,
  disabled,
  onPress,
}: AppHeaderNavItemProps): ReactNode {
  const {
    value: currentValue,
    onSelect,
    disabled: navDisabled,
  } = useAppHeaderNavContext();
  const selected = href !== undefined && currentValue === href;
  const isDisabled = disabled === true || navDisabled === true;
  const styles = appHeaderNavItemVariants({ selected, disabled: isDisabled });

  // Routing is the app's job, through the group's onValueChange or an item
  // onPress, so the anchor must not navigate on its own.
  const selectHref =
    href === undefined
      ? undefined
      : (event: GestureResponderEvent) => {
          event.preventDefault();
          onSelect(href);
        };

  return (
    <PressableBox
      variant="soft"
      role="link"
      // A disabled Pressable never sees the press, so dropping the href is the
      // only thing that stops the browser from following the link anyway.
      href={isDisabled ? undefined : href}
      aria-current={selected ? "page" : undefined}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={styles.pressable()}
      onPress={onPress ?? selectHref}
    >
      {icon ? (
        <InteractiveIcon
          icon={icon}
          activeIcon={activeIcon}
          activeAccent={activeAccent}
          active={selected}
          disabled={isDisabled}
          size={20}
          className={styles.foreground()}
        />
      ) : null}
      <Text
        numberOfLines={1}
        className={styles.label({ class: styles.foreground() })}
      >
        {label}
      </Text>
      {badge ? <View className={styles.badge()}>{badge}</View> : null}
      <View className={styles.underline()} />
    </PressableBox>
  );
}
