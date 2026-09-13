import type { ReactNode } from "react";
import type { SVGIconElement } from "../primitives/Icon";
import {
  SegmentedItem,
  type SegmentedItemProps,
} from "../selection/SegmentedItem";
import { useCheckboxContext } from "./CheckboxContext";

export interface CheckboxButtonProps {
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
}

export function CheckboxButton({
  value,
  label,
  icon,
  activeIcon,
  activeAccent,
  indicator,
  disabled,
}: CheckboxButtonProps): ReactNode {
  const {
    values,
    onToggle,
    disabled: groupDisabled,
    compact,
    variant,
  } = useCheckboxContext();
  const selected = values.includes(value);
  const isDisabled = disabled === true || groupDisabled === true;

  return (
    <SegmentedItem
      role="checkbox"
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
      onPress={() => {
        onToggle(value);
      }}
    />
  );
}
