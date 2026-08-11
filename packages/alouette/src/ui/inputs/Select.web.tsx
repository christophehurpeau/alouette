import type { ReactNode } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";
import { AccentScope } from "../containers/AccentScope";
import {
  type SelectProps,
  SelectTriggerContent,
  useControllableValue,
} from "./Select.shared";

const selectVariants = tv(
  {
    slots: {
      wrapper: [
        "relative flex-row flex-1 rounded-md border min-h-11",
        "transition-[border-color,outline-color] duration-fast ease-in",
        "outline-interactive-outlined-pressable", // for a proper outline color transition
      ].join(" "),
      placeholder: "color-(--color-form-placeholder) bg-highlight",
      select:
        "appearance-none min-h-[44px] w-auto m-0 border-0 bg-transparent text-transparent font-[inherit] py-0 outline-none grow",
      option: "bg-highlight",
    },
    variants: {
      disabled: {
        true: {
          wrapper:
            "bg-disabled-interactive-muted border-interactive-outlined-disabled cursor-not-allowed",
          select: "cursor-not-allowed",
          option: "color-(--color-form-disabled-text)",
        },
        false: {
          wrapper: [
            "bg-highlight",
            "border-interactive-outlined-pressable",
            "hover:border-interactive-outlined-hover",
            "focus-within:border-interactive-outlined-focus",
            "focus-within:outline-1 focus-within:outline-interactive-outlined-focus focus-within:outline-offset-0",
            "active:border-interactive-outlined-active",
          ].join(" "),
          select: "cursor-pointer",
          option: "text-sharp",
        },
      },
    },
    defaultVariants: { disabled: false },
  },
  { twMerge: false },
);

const paddingX = 16; // spacing-m, matches the overlay's px-m
const caretReserve = 26; // caret (18) + gap-xs (8), so the label never overlaps it

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  accent,
  testID,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SelectProps): ReactNode {
  const [current, setValue] = useControllableValue(
    value,
    defaultValue,
    onValueChange,
  );
  const selected = options.find((option) => option.value === current);

  const styles = selectVariants({ disabled });

  return (
    <AccentScope accent={accent}>
      <View className={styles.wrapper()}>
        <select
          value={current ?? ""}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          data-testid={testID}
          className={styles.select()}
          style={{
            paddingLeft: paddingX,
            paddingRight: paddingX + caretReserve,
          }}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        >
          {placeholder === undefined ? null : (
            <option disabled value="" className={styles.placeholder()}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={styles.option()}
            >
              {option.label}
            </option>
          ))}
        </select>
        <View
          pointerEvents="none"
          className="absolute inset-0 flex-row items-center justify-between gap-xs px-m"
        >
          <SelectTriggerContent
            label={selected?.label}
            placeholder={placeholder}
            disabled={disabled}
          />
        </View>
      </View>
    </AccentScope>
  );
}
