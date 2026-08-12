import type { ReactNode } from "react";
import type { SVGIconElement } from "../primitives/Icon";
import {
  SegmentedItem,
  type SegmentedItemProps,
} from "../selection/SegmentedItem";
import { useTabsContext } from "./TabsContext";

export interface TabProps {
  value: string;
  label: string;
  icon?: SVGIconElement;
  disabled?: boolean;
  "aria-controls"?: string;
  id?: string;
  /**
   * Runs instead of the group's `onValueChange`. Tabs whose items carry
   * `onPress` must be controlled: the internal value never updates.
   */
  onPress?: SegmentedItemProps["onPress"];
}

export function Tab({
  value,
  label,
  icon,
  disabled,
  onPress,
  ...props
}: TabProps): ReactNode {
  const {
    value: currentValue,
    onSelect,
    disabled: tabsDisabled,
  } = useTabsContext();
  const selected = currentValue === value;
  const isDisabled = disabled === true || tabsDisabled === true;

  return (
    <SegmentedItem
      role="tab"
      aria-selected={selected}
      aria-disabled={isDisabled}
      label={label}
      icon={icon}
      selected={selected}
      disabled={isDisabled}
      onPress={
        onPress ??
        (() => {
          onSelect(value);
        })
      }
      {...props}
    />
  );
}
