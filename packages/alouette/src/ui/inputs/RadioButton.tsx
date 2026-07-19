import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { InteractiveBox } from "../containers/Box";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { useRadioContext } from "./RadioContext";

// The selected chip is a raised layer that cross-fades on opacity so the
// background and shadow animate together with no border. Swapping a bordered
// variant instead would flash a border on the outgoing segment mid-transition.
const chipVariants = tv({
  base: "absolute inset-0 rounded-xs transition-opacity duration-fast ease-in",
  variants: {
    selected: {
      true: "opacity-100",
      false: "opacity-0",
    },
    disabled: {
      true: "bg-interactive-contained-disabled",
      false: "bg-interactive-contained-pressable shadow-s",
    },
  },
});

// The visible chip is shorter than the 44px pressable, so the lowered Surface
// shows around it as an inset frame while the tap target stays 44px. Its border
// is permanently transparent and only animates color on the row's hover/active
// (driven by the `group` on the pressable), so selection — which only
// cross-fades the chip's opacity — never flashes a border.
const segmentVariants = tv({
  base: "relative flex-center min-h-[32px] rounded-xs border border-transparent px-m transition-[border-color] duration-fast ease-in",
  variants: {
    selected: { true: "", false: "" },
    disabled: { true: "", false: "" },
  },
  compoundVariants: [
    {
      selected: false,
      disabled: false,
      class:
        "group-hover:border-interactive-outlined-hover group-active:border-interactive-outlined-active",
    },
  ],
});

const labelVariants = tv({
  base: "z-1 select-none font-body-bold text-base text-center transition-[color] duration-fast ease-in",
  variants: {
    selected: {
      true: "text-on-accent",
      false: "text-muted group-hover:text-sharp",
    },
    disabled: {
      true: "text-disabled-muted group-hover:text-disabled-muted",
      false: "",
    },
  },
  compoundVariants: [
    {
      selected: true,
      disabled: true,
      class: "text-disabled-sharp group-hover:text-disabled-sharp",
    },
  ],
});

export interface RadioButtonProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export function RadioButton({
  value,
  label,
  disabled,
}: RadioButtonProps): ReactNode {
  const {
    value: selectedValue,
    onSelect,
    disabled: groupDisabled,
  } = useRadioContext();
  const selected = selectedValue === value;
  const isDisabled = disabled === true || groupDisabled === true;

  return (
    <InteractiveBox
      withFocusVisibleOutline
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      aria-label={label}
      disabled={isDisabled}
      className="group flex-center min-h-[44px] rounded-xs focus-visible:outline-interactive-outlined-outline-focus"
      onPress={() => {
        onSelect(value);
      }}
    >
      <View className={segmentVariants({ selected, disabled: isDisabled })}>
        <View className={chipVariants({ selected, disabled: isDisabled })} />
        <Text
          numberOfLines={1}
          className={labelVariants({ selected, disabled: isDisabled })}
        >
          {label}
        </Text>
      </View>
    </InteractiveBox>
  );
}
