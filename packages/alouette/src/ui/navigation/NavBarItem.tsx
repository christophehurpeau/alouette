import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import type { SVGIconElement } from "../primitives/Icon";
import {
  SegmentedItem,
  type SegmentedItemProps,
} from "../selection/SegmentedItem";
import { useNavBarContext } from "./NavBarContext";

export interface NavBarItemProps {
  /**
   * Destination, matched against the NavBar's value to mark the item current.
   * Renders a real `<a href>` on web (native ignores it); expo Router's
   * `<Link asChild>` injects it, so it does not have to be written twice.
   */
  href?: string;
  label: string;
  icon?: SVGIconElement;
  disabled?: boolean;
  /**
   * Handles the press instead of the group's `onValueChange` — this is what
   * `<Link asChild>` injects. A NavBar whose items carry `onPress` must be
   * controlled: its internal value never updates. A handler that navigates on
   * web must call `event.preventDefault()`, as routers do.
   */
  onPress?: SegmentedItemProps["onPress"];
}

export function NavBarItem({
  href,
  label,
  icon,
  disabled,
  onPress,
}: NavBarItemProps): ReactNode {
  const {
    value: currentValue,
    onSelect,
    disabled: navBarDisabled,
    orientation,
    stretch,
  } = useNavBarContext();
  const selected = href !== undefined && currentValue === href;
  const isDisabled = disabled === true || navBarDisabled === true;

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
    <SegmentedItem
      role="link"
      // A disabled Pressable never sees the press, so dropping the href is the
      // only thing that stops the browser from following the link anyway.
      href={isDisabled ? undefined : href}
      aria-current={selected ? "page" : undefined}
      aria-disabled={isDisabled}
      label={label}
      icon={icon}
      selected={selected}
      disabled={isDisabled}
      orientation={orientation}
      stretch={stretch}
      onPress={onPress ?? selectHref}
    />
  );
}
