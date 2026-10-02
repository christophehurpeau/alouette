import type { ReactNode, Ref } from "react";
import {
  Platform,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import { useColorVariable } from "../../core/useColorToken";
import { StableAccentScope } from "../containers/StableAccentScope";

const inputVariants = tv(
  {
    base: [
      "bg-highlight text-sharp",
      "border",
      "transition-[border-color,background-color,outline-color] duration-fast ease-in",
      "outline-interactive-outlined-pressable", // to have proper outline color transition
      process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
        ? ""
        : "border-interactive-outlined-pressable",
      "hover:border-interactive-outlined-hover",
      "focus:border-interactive-outlined-focus",
      "focus:outline-1 focus:outline-interactive-outlined-focus focus:outline-offset-0",
      "active:border-interactive-outlined-active",
      "disabled:bg-disabled-interactive-muted disabled:border-interactive-outlined-disabled disabled:text-form-disabled-text disabled:cursor-not-allowed",
      "placeholder:text-form-placeholder",
    ].join(" "),
    variants: {
      multiline: {
        // Centering the text of a single-line field is per-platform. iOS
        // centers the line itself, but only without a line-height —
        // `text-base-size-only` is `text-base` minus the 1.4 line-height the
        // scale pairs with it, which iOS would turn into leading above the
        // glyphs (the value then sits ~3pt low while the placeholder, drawn
        // without those attributes, stays centered). Android lays the text out
        // from the top of the box — `min-h-[44px]` makes it taller than the
        // line — until `align-middle` sets its gravity (RN maps the style
        // `verticalAlign` to `textAlignVertical`); on web that would be a real
        // `vertical-align` on the `<input>`, hence the platform scope. Web
        // keeps the scale: an `<input>` centers its text whatever the
        // line-height is.
        false:
          "web:text-base native:text-base-size-only android:align-middle min-h-[44px] rounded-md px-m py-xs",
        // Multiline is a paragraph: there the line-height is what spaces the
        // lines, and the text belongs at the top of the box.
        true: "text-base min-h-[80px] resize-y rounded-xs px-xs py-xs",
      },
      forceStyle: {
        undefined: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
          ? "border-interactive-outlined-pressable"
          : "",
        hover: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
          ? "border-interactive-outlined-hover"
          : "",
        focus: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
          ? "border-interactive-outlined-focus outline-1 outline-interactive-outlined-focus outline-offset-0"
          : "",
        press: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
          ? "border-interactive-outlined-active"
          : "",
      },
    },
    defaultVariants: {
      forceStyle: "undefined",
    },
  },
  { twMerge: false },
);

type InputVariantProps = VariantProps<typeof inputVariants>;

const MODE_PROPS = {
  password: {
    secureTextEntry: true,
    autoComplete: "current-password",
  },
  number: {
    inputMode: "numeric",
    keyboardType: "numeric",
  },
  tel: {
    inputMode: "tel",
    autoComplete: "tel",
    keyboardType: "phone-pad",
  },
  email: {
    inputMode: "email",
    autoComplete: "email",
    keyboardType: "email-address",
  },
  url: {
    inputMode: "url",
    keyboardType: "url",
  },
  search: {
    inputMode: "search",
  },
  webSearch: {
    inputMode: "search",
    keyboardType: "web-search",
  },
} as const satisfies Record<string, Partial<RNTextInputProps>>;

export type InputTextMode = keyof typeof MODE_PROPS;

export interface InputTextProps
  extends Omit<RNTextInputProps, "editable">, InputVariantProps {
  className?: string;
  disabled?: boolean;
  /**
   * The field is in error: its border takes the danger accent (through the
   * `interactive-outlined-*` tokens, so hover and focus stay on it) and it is
   * `aria-invalid`. From `FormItem`'s render params, next to `describedBy`.
   */
  invalid?: boolean;
  mode?: InputTextMode;
  ref?: Ref<RNTextInput>;
  /**
   * react-native's types have no `aria-describedby` / `aria-required`, but
   * react-native-web forwards both and native ignores unknown props. Web only
   * in effect: neither platform has an equivalent.
   */
  "aria-describedby"?: string;
  "aria-required"?: boolean;
}

export function InputText({
  className,
  disabled,
  invalid,
  mode,
  multiline,
  forceStyle,
  ...props
}: InputTextProps): ReactNode {
  const placeholderColor =
    Platform.OS === "web"
      ? undefined
      : // eslint-disable-next-line react-hooks/rules-of-hooks -- native only, web is set via css.
        useColorVariable("--color-form-placeholder");
  const modeProps = mode ? MODE_PROPS[mode] : undefined;
  // Same forwarding as `aria-describedby`: untyped by react-native, rendered by
  // react-native-web.
  const ariaInvalidProps = { "aria-invalid": invalid === true };
  // Stable: `invalid` toggles while the field is being edited, and a plain
  // AccentScope would remount the input (and drop its focus) with it.
  return (
    <StableAccentScope accent={invalid ? "danger" : undefined}>
      <RNTextInput
        editable={!disabled}
        disabled={disabled}
        aria-disabled={disabled === true}
        multiline={multiline === true}
        placeholderTextColor={placeholderColor}
        className={inputVariants({ multiline, forceStyle, className })}
        {...ariaInvalidProps}
        {...modeProps}
        {...props}
      />
    </StableAccentScope>
  );
}
