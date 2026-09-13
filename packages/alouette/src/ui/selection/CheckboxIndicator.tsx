import { CheckFatDuotoneIcon } from "alouette-icons/phosphor-icons/CheckFatDuotoneIcon";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { DefaultAccentScope } from "../containers/DefaultAccentScope";
import { Icon } from "../primitives/Icon";
import { View } from "../primitives/View";

const checkboxIndicatorVariants = tv({
  slots: {
    box: "size-[22px] rounded-[6px] border-2 items-center justify-center transition-[border-color,background-color] duration-fast ease-in",
    check: "transition-transform duration-fast ease-in",
    glyph: "",
  },
  variants: {
    selected: {
      true: {
        box: "border-accent bg-accent",
        check: "scale-100",
        glyph: "text-on-accent",
      },
      false: {
        box: "border-interactive-outlined-pressable bg-transparent",
        check: "scale-0",
      },
    },
    onAccent: {
      // Same ink as RadioIndicator's ring and dot: an outline and a check in
      // `on-accent`, no fill of its own.
      true: {
        box: "border-on-accent bg-transparent",
        glyph: "text-on-accent",
      },
      false: {},
    },
    disabled: {
      true: {
        box: "border-interactive-outlined-disabled bg-transparent",
        glyph: "text-disabled-muted",
      },
      false: {},
    },
    withPressEffect: {
      true: {},
      false: {},
    },
  },
  // The indicator is the only part of its row that reacts to hover and press,
  // driven by the `group` on the pressable that contains it.
  compoundVariants: [
    // Same reasoning as RadioIndicator: on the disabled contained fill the
    // outlined disabled token matches the background.
    {
      disabled: true,
      onAccent: true,
      class: { box: "border-disabled-sharp", glyph: "text-disabled-sharp" },
    },
    {
      selected: false,
      onAccent: false,
      disabled: false,
      class: {
        box: "group-hover:border-interactive-outlined-hover group-active:border-interactive-outlined-active",
      },
    },
    {
      selected: true,
      onAccent: false,
      disabled: false,
      class: {
        box: "group-hover:border-interactive-contained-hover group-hover:bg-interactive-contained-hover group-active:border-interactive-contained-active group-active:bg-interactive-contained-active",
      },
    },
    {
      selected: true,
      onAccent: true,
      disabled: false,
      class: {
        box: "group-hover:border-on-accent-muted group-active:border-on-accent-muted",
      },
    },
    {
      withPressEffect: true,
      disabled: false,
      class: { box: "group-active:translate-y-px" },
    },
  ],
  defaultVariants: { onAccent: false, disabled: false, withPressEffect: false },
});

export interface CheckboxIndicatorProps {
  selected: boolean;
  disabled?: boolean;
  /** Set on a filled surface (accent, or the disabled fill), where the accent
   * box and the outlined tokens have no contrast. */
  onAccent?: boolean;
  /** Takes the row's press on the box alone, for a row that does not move. */
  withPressEffect?: boolean;
}

/**
 * Checked-box indicator shared by Checkbox and CheckboxCard. Its hover/active
 * colors are driven by the `group` on the pressable row that contains it.
 */
export function CheckboxIndicator({
  selected,
  disabled,
  onAccent,
  withPressEffect,
}: CheckboxIndicatorProps): ReactNode {
  const styles = checkboxIndicatorVariants({
    selected,
    disabled,
    onAccent,
    withPressEffect,
  });
  return (
    <DefaultAccentScope>
      <View className={styles.box()}>
        <View className={styles.check()}>
          <Icon
            icon={<CheckFatDuotoneIcon />}
            size={14}
            className={styles.glyph()}
          />
        </View>
      </View>
    </DefaultAccentScope>
  );
}
