import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { useControllableChecked } from "../../core/useControllableChecked";
import { AccentScope } from "../containers/AccentScope";
import { InteractiveBox } from "../containers/Box";
import { Text } from "../primitives/Text";
import { CheckboxIndicator } from "../selection/CheckboxIndicator";
import { useOptionalCheckboxContext } from "./CheckboxContext";

const labelVariants = tv({
  base: "text-base",
  variants: {
    disabled: {
      true: "text-disabled-sharp",
      false: "text-sharp",
    },
  },
});

export interface CheckboxProps {
  label: string;
  /** Required inside a CheckboxGroup: the value toggled in the group's `values`. */
  value?: string;
  /** Standalone only: controlled checked state. */
  checked?: boolean;
  /** Standalone only: initial checked state for uncontrolled usage. */
  defaultChecked?: boolean;
  /** Standalone only. */
  onValueChange?: (checked: boolean) => void;
  /** Standalone only: a grouped checkbox takes the group's accent. */
  accent?: Accent;
  disabled?: boolean;
}

export function Checkbox({
  label,
  value,
  checked,
  defaultChecked,
  onValueChange,
  accent,
  disabled,
}: CheckboxProps): ReactNode {
  const group = useOptionalCheckboxContext();
  const [standaloneChecked, setStandaloneChecked] = useControllableChecked({
    checked,
    defaultChecked,
    onValueChange,
  });

  if (group && value === undefined) {
    throw new Error("Checkbox inside a CheckboxGroup requires a `value`.");
  }

  const selected =
    group && value !== undefined
      ? group.values.includes(value)
      : standaloneChecked;
  const isDisabled = disabled === true || group?.disabled === true;

  return (
    <AccentScope accent={group ? undefined : accent}>
      <InteractiveBox
        withFocusVisibleOutline
        withPressEffect={false}
        role="checkbox"
        aria-checked={selected}
        aria-disabled={isDisabled}
        aria-label={label}
        disabled={isDisabled}
        className="group flex-row items-center gap-xs self-start rounded-xs px-xs min-h-11 focus-visible:outline-interactive-outlined-outline-focus"
        onPress={() => {
          if (group && value !== undefined) {
            group.onToggle(value);
          } else {
            setStandaloneChecked(!standaloneChecked);
          }
        }}
      >
        <CheckboxIndicator
          withPressEffect
          selected={selected}
          disabled={isDisabled}
        />
        <Text className={labelVariants({ disabled: isDisabled })}>{label}</Text>
      </InteractiveBox>
    </AccentScope>
  );
}
