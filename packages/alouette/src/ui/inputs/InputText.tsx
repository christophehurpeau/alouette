import { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import { useThemeToken } from "../../core/useThemeToken";

const inputVariants = tv(
  {
    base: [
      "text-base text-sharp",
      "border",
      "transition-[border-color,background-color,outline-color] duration-200 ease-in",
      "outline-interactive-outlined-pressable", // to have proper outline color transition
      process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
        ? ""
        : "bg-form-bg border-interactive-outlined-pressable",
      "hover:bg-form-bg-hover hover:border-interactive-outlined-hover",
      "focus:bg-form-bg-focus focus:border-interactive-outlined-focus",
      "focus:outline-1 focus:outline-interactive-outlined-focus focus:outline-offset-0",
      "active:bg-form-bg-active active:border-interactive-outlined-active",
      "disabled:bg-form-bg-disabled disabled:border-interactive-outlined-disabled disabled:text-form-disabled-text disabled:cursor-not-allowed",
    ].join(" "),
    variants: {
      multiline: {
        false: "rounded-md px-m py-xs",
        true: "min-h-[80px] resize-y rounded-xs px-xs py-xs",
      },
      forceStyle: {
        undefined: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
          ? "bg-form-bg border-interactive-outlined-pressable"
          : "",
        hover: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
          ? "bg-form-bg-hover border-interactive-outlined-hover"
          : "",
        focus: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
          ? "bg-form-bg-focus border-interactive-outlined-focus outline-1 outline-interactive-outlined-focus outline-offset-0"
          : "",
        press: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
          ? "bg-form-bg-active border-interactive-outlined-active"
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
    const placeholderColor = useThemeToken("--color-form-placeholder");
    const modeProps = mode ? MODE_PROPS[mode] : undefined;
    return (
      <RNTextInput
        ref={ref}
        editable={!disabled}
        disabled={disabled}
        aria-disabled={disabled === true}
        multiline={multiline === true}
        placeholderTextColor={
          typeof placeholderColor === "string" ? placeholderColor : undefined
        }
        className={inputVariants({ multiline, forceStyle, className })}
        {...modeProps}
        {...props}
      />
    );
  },
);
