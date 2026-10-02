import { CaretDownRegularIcon } from "alouette-icons/phosphor-icons/CaretDown";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * `outlined` is a form field, matching `InputText`. `tonal` is a pill lifted
 * off the ground it sits on, the material of a `tonal` button — for a select
 * that is chrome rather than a form field (the team or site an app sidebar
 * applies to).
 */
export type SelectVariant = "outlined" | "tonal";

export interface SelectProps {
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Initial value for uncontrolled usage. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Leading glyph standing for what is chosen (a place, a team). */
  icon?: SVGIconElement;
  /** Defaults to `outlined`. */
  variant?: SelectVariant;
  disabled?: boolean;
  accent?: AccentOrNeutral;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  testID?: string;
}

// The trigger, on both platforms. `outlined` is a field and focuses like
// InputText, ringed as soon as it holds the focus. `tonal` is the material of a
// tonal PressableBox, ringed on keyboard focus only. The ground lives in each
// variant × disabled pair rather than in the variant, so the disabled one never
// competes with the enabled one at equal specificity.
// `flex` is for web, where the trigger is a plain element rather than a View.
export const selectTriggerVariants = tv(
  {
    base: [
      "flex flex-row items-center justify-between gap-xs px-m py-xs min-h-[44px]",
      "transition-[border-color,outline-color,background-color,box-shadow] duration-fast ease-in",
    ].join(" "),
    variants: {
      variant: {
        outlined: "rounded-md border outline-interactive-outlined-pressable",
        tonal: "rounded-full",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        variant: "outlined",
        disabled: true,
        class:
          "bg-disabled-interactive-muted border-interactive-outlined-disabled",
      },
      {
        variant: "outlined",
        disabled: false,
        class: [
          "bg-highlight",
          "border-interactive-outlined-pressable",
          "hover:border-interactive-outlined-hover",
          "focus:border-interactive-outlined-focus",
          "focus:outline-1 focus:outline-interactive-outlined-focus focus:outline-offset-0",
          "active:border-interactive-outlined-active",
        ].join(" "),
      },
      {
        variant: "tonal",
        disabled: true,
        class: "bg-interactive-tonal-disabled",
      },
      {
        variant: "tonal",
        disabled: false,
        class: [
          "shadow-s bg-interactive-tonal-pressable",
          "hover:bg-interactive-tonal-hover",
          "focus:bg-interactive-tonal-focus",
          "active:shadow-lowered active:bg-interactive-tonal-active",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-muted",
        ].join(" "),
      },
    ],
    defaultVariants: { variant: "outlined", disabled: false },
  },
  { twMerge: false },
);

// The label mirrors InputText on an outlined field: sharp value,
// form-placeholder, form-disabled-text. On a tonal ground the value takes the
// tonal ink, which carries the accent, and so does the leading icon.
const triggerContentVariants = tv({
  slots: {
    icon: "",
    label: "flex-1 text-base",
    caret: "",
  },
  variants: {
    state: {
      value: { icon: "text-muted", label: "text-sharp", caret: "text-muted" },
      placeholder: {
        icon: "text-muted",
        label: "text-form-placeholder",
        caret: "text-muted",
      },
      disabled: {
        icon: "text-form-disabled-text",
        label: "text-form-disabled-text",
        caret: "text-form-disabled-text",
      },
    },
    variant: { outlined: {}, tonal: {} },
  },
  compoundVariants: [
    {
      variant: "tonal",
      state: ["value", "placeholder"],
      class: { icon: "text-on-tonal" },
    },
    { variant: "tonal", state: "value", class: { label: "text-on-tonal" } },
  ],
  defaultVariants: { state: "value", variant: "outlined" },
});

export interface SelectTriggerContentProps {
  label?: string;
  placeholder?: string;
  icon?: SVGIconElement;
  variant?: SelectVariant;
  disabled?: boolean;
}

export function SelectTriggerContent({
  label,
  placeholder,
  icon,
  variant,
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
  // A disabled placeholder keeps its label color, but its glyphs dim.
  const styles = triggerContentVariants({ state, variant });
  const glyphStyles = triggerContentVariants({
    state: disabled ? "disabled" : state,
    variant,
  });
  return (
    <>
      {icon ? (
        <Icon icon={icon} size={20} className={glyphStyles.icon()} />
      ) : null}
      <Text numberOfLines={1} className={styles.label()}>
        {label ?? placeholder ?? ""}
      </Text>
      <Icon
        icon={<CaretDownRegularIcon />}
        size={18}
        className={glyphStyles.caret()}
      />
    </>
  );
}
