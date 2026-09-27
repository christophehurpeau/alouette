import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { View } from "../primitives/View";
import { SelectionIndicatorAccentScope } from "./SelectionAccentScope";

const radioIndicatorVariants = tv({
  slots: {
    ring: "size-[22px] rounded-full border-2 items-center justify-center transition-[border-color] duration-fast ease-in",
    dot: "size-[10px] rounded-full transition-[transform,background-color] duration-fast ease-in",
  },
  variants: {
    selected: {
      true: { dot: "scale-100" },
      false: { dot: "scale-0" },
    },
    disabled: {
      // The row's disabled ink, not `interactive-outlined-disabled`: that token
      // is also the disabled tonal card's ground, where the ring would vanish.
      true: {
        ring: "border-disabled-muted",
        dot: "bg-disabled-muted",
      },
      // The accent's interactive foreground, selected or not, reacting to the
      // `group` on the pressable around it. Not `interactive-filled-*`: those
      // are grounds, and in dark mode the filled hover is the tonal hover
      // ground itself.
      false: {
        ring: "border-interactive-pressable group-hover:border-interactive-hover group-focus:border-interactive-hover group-active:border-interactive-active",
        dot: "bg-interactive-pressable group-hover:bg-interactive-hover group-focus:bg-interactive-hover group-active:bg-interactive-active",
      },
    },
    withPressEffect: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      withPressEffect: true,
      disabled: false,
      class: { ring: "group-active:translate-y-px" },
    },
  ],
  defaultVariants: { disabled: false, withPressEffect: false },
});

export interface RadioIndicatorProps {
  selected: boolean;
  disabled?: boolean;
  /** Takes the row's press on the ring alone, for a row that does not move. */
  withPressEffect?: boolean;
}

/**
 * Circle-dot indicator shared by Radio and RadioCard. Its hover/focus/active
 * colors are driven by the `group` on the pressable that contains it.
 */
export function RadioIndicator({
  selected,
  disabled,
  withPressEffect,
}: RadioIndicatorProps): ReactNode {
  const styles = radioIndicatorVariants({
    selected,
    disabled,
    withPressEffect,
  });
  return (
    <SelectionIndicatorAccentScope>
      <View className={styles.ring()}>
        <View className={styles.dot()} />
      </View>
    </SelectionIndicatorAccentScope>
  );
}
