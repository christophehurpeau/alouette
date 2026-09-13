import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { DefaultAccentScope } from "../containers/DefaultAccentScope";
import { View } from "../primitives/View";

const radioIndicatorVariants = tv({
  slots: {
    ring: "size-[22px] rounded-full border-2 items-center justify-center transition-[border-color] duration-fast ease-in",
    dot: "size-[10px] rounded-full bg-accent transition-[transform,background-color] duration-fast ease-in",
  },
  variants: {
    selected: {
      true: { ring: "border-accent", dot: "scale-100" },
      false: { ring: "border-interactive-outlined-pressable", dot: "scale-0" },
    },
    onAccent: {
      true: { ring: "border-on-accent", dot: "bg-on-accent" },
      false: {},
    },
    disabled: {
      true: {
        ring: "border-interactive-outlined-disabled",
        dot: "bg-disabled-muted",
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
    // On the disabled contained fill, `interactive-outlined-disabled` is the same
    // color as the background — the ring needs the foreground disabled token the
    // label next to it already uses.
    {
      disabled: true,
      onAccent: true,
      class: { ring: "border-disabled-sharp", dot: "bg-disabled-sharp" },
    },
    {
      selected: false,
      onAccent: false,
      disabled: false,
      class: {
        ring: "group-hover:border-interactive-outlined-hover group-active:border-interactive-outlined-active",
      },
    },
    {
      selected: true,
      onAccent: false,
      disabled: false,
      class: {
        ring: "group-hover:border-interactive-contained-hover group-active:border-interactive-contained-active",
        dot: "group-hover:bg-interactive-contained-hover group-active:bg-interactive-contained-active",
      },
    },
    {
      selected: true,
      onAccent: true,
      disabled: false,
      class: {
        ring: "group-hover:border-on-accent-muted group-active:border-on-accent-muted",
        dot: "group-hover:bg-on-accent-muted group-active:bg-on-accent-muted",
      },
    },
    {
      withPressEffect: true,
      disabled: false,
      class: { ring: "group-active:translate-y-px" },
    },
  ],
  defaultVariants: { onAccent: false, disabled: false, withPressEffect: false },
});

export interface RadioIndicatorProps {
  selected: boolean;
  disabled?: boolean;
  /** Set on a filled surface (accent, or the disabled fill), where the accent
   * dot and the outlined tokens have no contrast. */
  onAccent?: boolean;
  /** Takes the row's press on the ring alone, for a row that does not move. */
  withPressEffect?: boolean;
}

/**
 * Circle-dot indicator shared by Radio and RadioCard. Its hover/active colors
 * are driven by the `group` on the pressable row that contains it.
 */
export function RadioIndicator({
  selected,
  disabled,
  onAccent,
  withPressEffect,
}: RadioIndicatorProps): ReactNode {
  const styles = radioIndicatorVariants({
    selected,
    disabled,
    onAccent,
    withPressEffect,
  });
  return (
    <DefaultAccentScope>
      <View className={styles.ring()}>
        <View className={styles.dot()} />
      </View>
    </DefaultAccentScope>
  );
}
