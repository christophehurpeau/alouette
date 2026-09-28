import { CheckFatDuotoneIcon } from "alouette-icons/phosphor-icons/CheckFat";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Icon } from "../primitives/Icon";
import { View } from "../primitives/View";
import { SelectionIndicatorAccentScope } from "./SelectionAccentScope";

const checkboxIndicatorVariants = tv({
  slots: {
    box: "size-[22px] rounded-[6px] border-2 items-center justify-center transition-[border-color,background-color] duration-fast ease-in",
    check: "transition-transform duration-fast ease-in",
    glyph: "",
  },
  variants: {
    selected: {
      true: { check: "scale-100" },
      false: { box: "bg-transparent", check: "scale-0" },
    },
    disabled: {
      // Same shapes as enabled, in the row's disabled ink: a checked box stays
      // filled, so it cannot be mistaken for an unchecked one. Not
      // `interactive-outlined-disabled`: that token is also the disabled tonal
      // card's ground, where the box would vanish.
      true: {
        box: "border-disabled-muted",
        glyph: "text-highlight",
      },
      // Same foreground as RadioIndicator. The check is cut out of the fill
      // in the accent's ground: `on-accent` is white, lost on the pale
      // dark-mode foreground.
      false: {
        box: "border-interactive-pressable group-hover:border-interactive-hover group-focus:border-interactive-hover group-active:border-interactive-active",
        glyph: "text-surface",
      },
    },
    withPressEffect: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      selected: true,
      disabled: false,
      class: {
        box: "bg-interactive-pressable group-hover:bg-interactive-hover group-focus:bg-interactive-hover group-active:bg-interactive-active",
      },
    },
    {
      selected: true,
      disabled: true,
      class: { box: "bg-disabled-muted" },
    },
    {
      withPressEffect: true,
      disabled: false,
      class: { box: "group-active:translate-y-px" },
    },
  ],
  defaultVariants: { disabled: false, withPressEffect: false },
});

export interface CheckboxIndicatorProps {
  selected: boolean;
  disabled?: boolean;
  /** Takes the row's press on the box alone, for a row that does not move. */
  withPressEffect?: boolean;
}

/**
 * Checked-box indicator shared by Checkbox and CheckboxCard. Its
 * hover/focus/active colors are driven by the `group` on the pressable that
 * contains it.
 */
export function CheckboxIndicator({
  selected,
  disabled,
  withPressEffect,
}: CheckboxIndicatorProps): ReactNode {
  const styles = checkboxIndicatorVariants({
    selected,
    disabled,
    withPressEffect,
  });
  return (
    <SelectionIndicatorAccentScope>
      <View className={styles.box()}>
        <View className={styles.check()}>
          <Icon
            icon={<CheckFatDuotoneIcon />}
            size={14}
            className={styles.glyph()}
          />
        </View>
      </View>
    </SelectionIndicatorAccentScope>
  );
}
