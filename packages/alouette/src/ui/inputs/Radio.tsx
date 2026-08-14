import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { InteractiveBox } from "../containers/Box";
import { Text } from "../primitives/Text";
import { RadioIndicator } from "../selection/RadioIndicator";
import { useRadioContext } from "./RadioContext";

const labelVariants = tv({
  base: "text-base",
  variants: {
    disabled: {
      true: "text-disabled-sharp",
      false: "text-sharp",
    },
  },
});

export interface RadioProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export function Radio({ value, label, disabled }: RadioProps): ReactNode {
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
      className="group flex-row items-center gap-xs self-start rounded-xs px-xs min-h-11 focus-visible:outline-interactive-outlined-outline-focus"
      onPress={() => {
        onSelect(value);
      }}
    >
      <RadioIndicator selected={selected} disabled={isDisabled} />
      <Text className={labelVariants({ disabled: isDisabled })}>{label}</Text>
    </InteractiveBox>
  );
}
