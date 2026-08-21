import type { ReactNode } from "react";
import { SegmentedItem } from "../selection/SegmentedItem";
import { useRadioContext } from "./RadioContext";

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
    compact,
  } = useRadioContext();
  const selected = selectedValue === value;
  const isDisabled = disabled === true || groupDisabled === true;

  return (
    <SegmentedItem
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      label={label}
      selected={selected}
      disabled={isDisabled}
      compact={compact}
      onPress={() => {
        onSelect(value);
      }}
    />
  );
}
