import type { ReactNode } from "react";
import { MenuItem } from "./MenuItem";
import { useSplitButtonContext } from "./SplitButtonContext";

export interface SplitButtonOptionProps {
  value: string;
  /** The row's label, and the main button's text while it is selected. */
  label: string;
  /** What the action does, under the label in the menu only. */
  description?: string;
  disabled?: boolean;
}

/**
 * One action of a {@link SplitButton}. Pressing it in the menu makes it the
 * main button's action without running it.
 */
export function SplitButtonOption({
  value,
  label,
  description,
  disabled,
}: SplitButtonOptionProps): ReactNode {
  const { value: selectedValue, onSelect, slot } = useSplitButtonContext();
  const selected = value === selectedValue;

  if (slot === "label") return selected ? label : null;

  return (
    <MenuItem
      label={label}
      description={description}
      disabled={disabled}
      checked={selected}
      onPress={() => {
        onSelect(value);
      }}
    />
  );
}
