import type { ReactNode, Ref } from "react";
import {
  Platform,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import { useColorVariable } from "../../core/useColorToken";
import { StableAccentScope } from "../containers/StableAccentScope";
import { View } from "../primitives/View";

// A slot is overlaid on the field, never laid out beside the input:
// react-native's TextInput is a leaf, and a frame carrying the border would
// need the focus state in JS (native has no `focus-within`). The slot box is
// as wide as the field is tall (44px), so a 20px glyph lands 12px from the
// edge and a `sm` IconButton (38px) is centered inside the border, and the
// text is padded past it. On a multiline field the box pins to the top, level
// with the first line.
//
// A tap on the slot reaches the input unless a pressable in it takes it. On
// web that is `pointer-events: none` on the box, inherited by a glyph while a
// `PressableBox` re-enables itself (its `pointerEvents="auto"`); react-native-
// web's `box-none` would instead force `auto` back on every child. On native
// the box is `box-none` and the glyph is inert on its own (`Icon`).
const slotPointerEvents = Platform.OS === "web" ? undefined : "box-none";

const inputVariants = tv(
  {
    slots: {
      input: [
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
      frame: "relative",
      startSlot: "absolute left-0 w-[44px] flex-center web:pointer-events-none",
      endSlot: "absolute right-0 w-[44px] flex-center web:pointer-events-none",
    },
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
        false: {
          input:
            "web:text-base native:text-base-size-only android:align-middle min-h-[44px] rounded-md py-xs",
          startSlot: "inset-y-0",
          endSlot: "inset-y-0",
        },
        // Multiline is a paragraph: there the line-height is what spaces the
        // lines, and the text belongs at the top of the box.
        true: {
          input: "text-base min-h-[80px] resize-y rounded-xs py-xs",
          startSlot: "top-0 h-[44px]",
          endSlot: "top-0 h-[44px]",
        },
      },
      withStartSlot: {
        true: { input: "pl-[44px]" },
        false: {},
      },
      withEndSlot: {
        true: { input: "pr-[44px]" },
        false: {},
      },
      forceStyle: {
        undefined: {
          input: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
            ? "border-interactive-outlined-pressable"
            : "",
        },
        hover: {
          input: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
            ? "border-interactive-outlined-hover"
            : "",
        },
        focus: {
          input: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
            ? "border-interactive-outlined-focus outline-1 outline-interactive-outlined-focus outline-offset-0"
            : "",
        },
        press: {
          input: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
            ? "border-interactive-outlined-active"
            : "",
        },
      },
    },
    // The horizontal padding is per side: the side with a slot takes the slot
    // width instead, so neither value has to cancel the other.
    compoundVariants: [
      { multiline: false, withStartSlot: false, class: { input: "pl-m" } },
      { multiline: false, withEndSlot: false, class: { input: "pr-m" } },
      { multiline: true, withStartSlot: false, class: { input: "pl-xs" } },
      { multiline: true, withEndSlot: false, class: { input: "pr-xs" } },
    ],
    defaultVariants: {
      multiline: false,
      withStartSlot: false,
      withEndSlot: false,
      forceStyle: "undefined",
    },
  },
  { twMerge: false },
);

type InputVariantProps = Pick<
  VariantProps<typeof inputVariants>,
  "forceStyle" | "multiline"
>;

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
  /**
   * On the input itself. With a `startSlot` / `endSlot`, on the frame around
   * it instead: that frame is then the box the parent lays out, and the input
   * stretches to it.
   */
  className?: string;
  disabled?: boolean;
  /**
   * Overlaid on the field's leading 44px, the text padded past it. Fixed-width
   * content only: an `Icon` (which carries its own `text-*` ink) or a `sm`
   * `IconButton`. A tap on it reaches the input unless the content takes it.
   */
  startSlot?: ReactNode;
  /** Same as `startSlot`, on the trailing 44px. */
  endSlot?: ReactNode;
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
  startSlot,
  endSlot,
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
  const withStartSlot = startSlot !== undefined;
  const withEndSlot = endSlot !== undefined;
  const withSlot = withStartSlot || withEndSlot;
  const styles = inputVariants({
    multiline: multiline === true,
    forceStyle,
    withStartSlot,
    withEndSlot,
  });
  const input = (
    <RNTextInput
      editable={!disabled}
      disabled={disabled}
      aria-disabled={disabled === true}
      multiline={multiline === true}
      placeholderTextColor={placeholderColor}
      className={styles.input({ className: withSlot ? undefined : className })}
      {...ariaInvalidProps}
      {...modeProps}
      {...props}
    />
  );
  // Stable: `invalid` toggles while the field is being edited, and a plain
  // AccentScope would remount the input (and drop its focus) with it.
  return (
    <StableAccentScope accent={invalid ? "danger" : undefined}>
      {withSlot ? (
        <View className={styles.frame({ className })}>
          {input}
          {withStartSlot ? (
            <View
              pointerEvents={slotPointerEvents}
              className={styles.startSlot()}
            >
              {startSlot}
            </View>
          ) : null}
          {withEndSlot ? (
            <View
              pointerEvents={slotPointerEvents}
              className={styles.endSlot()}
            >
              {endSlot}
            </View>
          ) : null}
        </View>
      ) : (
        input
      )}
    </StableAccentScope>
  );
}
