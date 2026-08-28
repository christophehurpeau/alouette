import { forwardRef } from "react";
import {
  Platform,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import { useColorVariable } from "../../core/useColorToken";

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
  mode?: InputTextMode;
}

export const InputText = forwardRef<RNTextInput, InputTextProps>(
  ({ className, disabled, mode, multiline, forceStyle, ...props }, ref) => {
    const placeholderColor =
      Platform.OS === "web"
        ? undefined
        : // eslint-disable-next-line react-hooks/rules-of-hooks -- native only, web is set via css.
          useColorVariable("--color-form-placeholder");
    const modeProps = mode ? MODE_PROPS[mode] : undefined;
    return (
      <RNTextInput
        ref={ref}
        editable={!disabled}
        disabled={disabled}
        aria-disabled={disabled === true}
        multiline={multiline === true}
        placeholderTextColor={placeholderColor}
        className={inputVariants({ multiline, forceStyle, className })}
        {...modeProps}
        {...props}
      />
    );
  },
);
