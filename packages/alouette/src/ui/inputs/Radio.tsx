import type { ReactNode } from "react";
import { InteractiveBox } from "../containers/Box";
import { Text } from "../primitives/Text";
import { RadioIndicator } from "../selection/RadioIndicator";
import { selectionRowVariants } from "../selection/selectionRowVariants";
import { useRadioContext } from "./RadioContext";

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
  const styles = selectionRowVariants({ disabled: isDisabled });

  return (
    <InteractiveBox
      withFocusVisibleOutline
      withPressEffect={false}
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      aria-label={label}
      disabled={isDisabled}
      className={styles.row()}
      onPress={() => {
        onSelect(value);
      }}
    >
      <RadioIndicator
        withPressEffect
        selected={selected}
        disabled={isDisabled}
      />
      <Text className={styles.label()}>{label}</Text>
    </InteractiveBox>
  );
}
