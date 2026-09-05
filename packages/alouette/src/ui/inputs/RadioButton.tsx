import type { ReactNode } from "react";
import type { SVGIconElement } from "../primitives/Icon";
import {
  SegmentedItem,
  type SegmentedItemProps,
} from "../selection/SegmentedItem";
import { useRadioContext } from "./RadioContext";

export interface RadioButtonProps {
  value: string;
  label: string;
  /** Leading icon, and the only visible content in an icon group. */
  icon?: SVGIconElement;
  /**
   * Replaces `icon` while the button is hovered, focused or pressed, and for as
   * long as it is checked.
   */
  activeIcon?: SVGIconElement;
  /** Accent tinting `activeIcon`, so the glyph changes color as well as weight. */
  activeAccent?: SegmentedItemProps["activeAccent"];
  /**
   * Badge glyph over the chip's top-right, for a secondary state the `label`
   * spells out. Adds to `icon`, and renders in an icon group only.
   */
  indicator?: SVGIconElement;
  disabled?: boolean;
  /**
   * Runs instead of the group's `onValueChange`. A group whose buttons carry
   * `onPress` must be controlled: the internal value never updates.
   */
  onPress?: SegmentedItemProps["onPress"];
}

export function RadioButton({
  value,
  label,
  icon,
  activeIcon,
  activeAccent,
  indicator,
  disabled,
  onPress,
}: RadioButtonProps): ReactNode {
  const {
    value: selectedValue,
    onSelect,
    disabled: groupDisabled,
    compact,
    variant,
  } = useRadioContext();
  const selected = selectedValue === value;
  const isDisabled = disabled === true || groupDisabled === true;

  return (
    <SegmentedItem
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      label={label}
      icon={icon}
      activeIcon={activeIcon}
      activeAccent={activeAccent}
      indicator={indicator}
      selected={selected}
      disabled={isDisabled}
      compact={compact}
      variant={variant}
      onPress={
        onPress ??
        (() => {
          onSelect(value);
        })
      }
    />
  );
}
