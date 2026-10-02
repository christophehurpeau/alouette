import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { tv } from "tailwind-variants";
import type { AccentScopeProps } from "../containers/AccentScope";
import { InteractiveBox } from "../containers/Box";
import type { SVGIconElement } from "../primitives/Icon";
import { InteractiveIcon } from "../primitives/InteractiveIcon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { useSidebarNavContext } from "./SidebarNavContext";

// The selected chip is raised out of the sidebar's lowered ground — the same
// material as a SegmentedBar chip — and cross-fades on opacity, so its ground
// and its shadow arrive together. The other rows are soft: no ground at rest,
// a surface tone on hover. A row is `rounded-sm` rather than a pill, so the
// navigation reads as a menu apart from the pill controls around it.
const sidebarNavItemVariants = tv({
  slots: {
    pressable:
      "group relative flex-row items-center gap-sm rounded-sm px-sm min-h-[44px] focus-visible:outline-interactive-outlined-outline-focus",
    chip: "absolute inset-0 rounded-sm transition-opacity duration-fast ease-in",
    foreground: "z-1 transition-[color] duration-fast ease-in",
    label: "flex-1 select-none text-base",
  },
  variants: {
    selected: {
      true: { chip: "opacity-100", foreground: "text-on-emphasis" },
      false: {
        pressable:
          "hover:bg-interactive-soft-hover active:bg-interactive-soft-active",
        chip: "opacity-0",
        foreground: "text-muted group-hover:text-sharp",
      },
    },
    disabled: {
      true: {
        chip: "bg-interactive-filled-disabled",
        foreground: "text-disabled-muted group-hover:text-disabled-muted",
      },
      false: { chip: "bg-emphasis shadow-s" },
    },
  },
  compoundVariants: [
    {
      selected: true,
      disabled: true,
      class: {
        foreground: "text-disabled-sharp group-hover:text-disabled-sharp",
      },
    },
    {
      selected: false,
      disabled: true,
      class: { pressable: "hover:bg-transparent active:bg-transparent" },
    },
  ],
  defaultVariants: { selected: false, disabled: false },
});

export interface SidebarNavItemProps {
  /**
   * Destination, matched against the SidebarNav's value to mark the item
   * current. Renders a real `<a href>` on web (native ignores it); expo
   * Router's `<Link asChild>` injects it, so it does not have to be written
   * twice.
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
  disabled?: boolean;
  /**
   * Handles the press instead of the group's `onValueChange` — this is what
   * `<Link asChild>` injects. A SidebarNav whose items carry `onPress` must be
   * controlled: its internal value never updates. A handler that navigates on
   * web must call `event.preventDefault()`, as routers do.
   */
  onPress?: (event: GestureResponderEvent) => void;
}

export function SidebarNavItem({
  href,
  label,
  icon,
  activeIcon,
  activeAccent,
  disabled,
  onPress,
}: SidebarNavItemProps): ReactNode {
  const {
    value: currentValue,
    onSelect,
    disabled: navDisabled,
  } = useSidebarNavContext();
  const selected = href !== undefined && currentValue === href;
  const isDisabled = disabled === true || navDisabled === true;
  const styles = sidebarNavItemVariants({ selected, disabled: isDisabled });

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
    <InteractiveBox
      withFocusVisibleOutline
      disabled={isDisabled}
      className={styles.pressable()}
      // Spread, not written as props: react-native's Pressable types have no
      // href nor aria-current, while react-native-web forwards both.
      {...{
        role: "link",
        // A disabled Pressable never sees the press, so dropping the href is
        // the only thing that stops the browser from following the link anyway.
        href: isDisabled ? undefined : href,
        "aria-current": selected ? "page" : undefined,
        "aria-disabled": isDisabled,
        onPress: onPress ?? selectHref,
      }}
    >
      <View className={styles.chip()} />
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
    </InteractiveBox>
  );
}
