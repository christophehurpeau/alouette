import { CaretDownRegularIcon } from "alouette-icons/phosphor-icons/CaretDownRegularIcon";
import { type ReactNode, useCallback, useState } from "react";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { Icon } from "../primitives/Icon";
import { Text } from "../primitives/Text";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Initial value for uncontrolled usage. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  accent?: Accent;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  testID?: string;
}

export function useControllableValue(
  controlled: string | undefined,
  defaultValue: string | undefined,
  onValueChange?: (value: string) => void,
): readonly [string | undefined, (next: string) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const setValue = useCallback(
    (next: string) => {
      if (controlled === undefined) {
        setInternal(next);
      }
      if (next !== value) {
        onValueChange?.(next);
      }
    },
    [controlled, onValueChange, value],
  );
  return [value, setValue] as const;
}

// Shared outlined-input look for the trigger, matching InputText. Focus styling
// and the background are platform-specific (the background lives in each
// platform's enabled/disabled variant so the disabled bg never competes with
// bg-highlight at equal specificity), so they are applied by each platform file.
export const selectTriggerBaseClassName = [
  "flex-row items-center justify-between gap-xs",
  "rounded-md border px-m py-xs min-h-[44px]",
  "transition-[border-color,outline-color,background-color] duration-200 ease-in",
].join(" ");

const triggerLabelVariants = tv({
  base: "flex-1 text-base",
  variants: {
    // Mirrors InputText: sharp value, form-placeholder, form-disabled-text.
    state: {
      value: "text-sharp",
      placeholder: "text-form-placeholder",
      disabled: "text-form-disabled-text",
    },
  },
  defaultVariants: { state: "value" },
});

export interface SelectTriggerContentProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function SelectTriggerContent({
  label,
  placeholder,
  disabled,
}: SelectTriggerContentProps): ReactNode {
  const state = ((): "disabled" | "placeholder" | "value" => {
    // Placeholder keeps its own color even when disabled (mirrors InputText,
    // whose placeholderTextColor is independent of the disabled text color);
    // only an actual value switches to the darker disabled text color.
    if (label === undefined) return "placeholder";
    if (disabled) return "disabled";
    return "value";
  })();
  return (
    <>
      <Text numberOfLines={1} className={triggerLabelVariants({ state })}>
        {label ?? placeholder ?? ""}
      </Text>
      <Icon
        icon={<CaretDownRegularIcon />}
        size={18}
        className={disabled ? "text-form-disabled-text" : "text-muted"}
      />
    </>
  );
}
