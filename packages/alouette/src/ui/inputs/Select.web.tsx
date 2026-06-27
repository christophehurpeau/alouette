import type { CSSProperties, ReactNode } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";
import { useThemeToken } from "../../core/useThemeToken";
import { AccentScope } from "../containers/AccentScope";
import {
  type SelectProps,
  SelectTriggerContent,
  useControllableValue,
} from "./Select.shared";

// Box visual only (border/bg/radius/height). Width and padding are driven by
// the in-flow <select> below, so the control stays at the widest-option width
// like a native <select> instead of resizing to the current label.
//
// Border/outline are driven by pseudo-classes in the same hover -> focus order
// as InputText: focus-within rules come last so a focused+hovered control shows
// a single (focus) color instead of a hover border plus a focus outline. The
// real <select> is a DOM descendant, so :focus-within tracks its focus. The
// disabled branch omits hover/focus so it matches InputText's disabled look.
const wrapperVariants = tv(
  {
    base: [
      "flex-row flex-1 rounded-md border min-h-11",
      "transition-[border-color,outline-color] duration-200 ease-in",
      "outline-interactive-outlined-pressable", // for a proper outline color transition
    ].join(" "),
    variants: {
      // bg lives in each branch (not base) so the disabled bg never competes
      // with bg-highlight: two same-specificity background utilities would let
      // stylesheet order, not className order, decide the winner.
      disabled: {
        true: "bg-disabled-interactive-muted border-interactive-outlined-disabled cursor-not-allowed",
        false: [
          "bg-highlight",
          "border-interactive-outlined-pressable",
          "hover:border-interactive-outlined-hover",
          "focus-within:border-interactive-outlined-focus",
          "focus-within:outline-1 focus-within:outline-interactive-outlined-focus focus-within:outline-offset-0",
          "active:border-interactive-outlined-active",
        ].join(" "),
      },
    },
    defaultVariants: { disabled: false },
  },
  { twMerge: false },
);

const paddingX = 16; // spacing-m, matches the overlay's px-m
const caretReserve = 26; // caret (18) + gap-xs (8), so the label never overlaps it

// The real <select> sits in normal flow (transparent text, native arrow removed)
// so it establishes the control's width and keeps full keyboard/screen-reader/
// mobile-picker accessibility; the themed label + caret are overlaid on top.
const selectStyle = (disabled?: boolean): CSSProperties => ({
  appearance: "none",
  WebkitAppearance: "none",
  boxSizing: "border-box",
  minHeight: 44,
  width: "auto",
  margin: 0,
  border: 0,
  background: "transparent",
  color: "transparent",
  font: "inherit",
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: paddingX,
  paddingRight: paddingX + caretReserve,
  outline: "none",
  cursor: disabled ? "not-allowed" : "pointer",
});

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

  // The open <option> list is browser-rendered and ignores className, so colors
  // come from resolved theme tokens applied inline to match the rest of the UI
  // (browsers otherwise fall back to their own greys, e.g. #6d6d6d for disabled).
  const [sharpColor, disabledTextColor, placeholderColor, highlightColor] =
    useThemeToken([
      "--color-sharp",
      "--color-form-disabled-text",
      "--color-form-placeholder",
      "--color-highlight",
    ] as const);

  const optionStyle = (optionDisabled?: boolean): CSSProperties => ({
    color: optionDisabled ? disabledTextColor : sharpColor,
    backgroundColor: highlightColor,
  });

  return (
    <AccentScope accent={accent}>
      <View className={wrapperVariants({ disabled })}>
        <select
          value={current ?? ""}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          data-testid={testID}
          style={selectStyle(disabled)}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        >
          {placeholder === undefined ? null : (
            <option
              disabled
              value=""
              style={{
                color: placeholderColor,
                backgroundColor: highlightColor,
              }}
            >
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              style={optionStyle(option.disabled)}
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
