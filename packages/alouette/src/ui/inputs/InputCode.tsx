import {
  type ReactNode,
  type Ref,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Platform,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import { twMergeConfig } from "../../core/twMerge";
import { useControllableValue } from "../../core/useControllableValue";
import { StableAccentScope } from "../containers/StableAccentScope";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";

const storybookOnly = (classes: string): string =>
  process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? classes : "";

// The active cell wears InputText's `focus:` ring: a field lights up for as
// long as it holds the focus, mouse or keyboard.
const focusedCellClasses =
  "border-interactive-outlined-focus outline-1 outline-interactive-outlined-focus outline-offset-0";

// One real TextInput holds the whole code and covers the row of cells, which
// only display it. The cells are inert Views under it, so their hover and
// press come from the root `group`, and the focus ring from a JS `focused`
// state (the input is a sibling of the cells, not an ancestor).
const inputCodeVariants = tv(
  {
    slots: {
      root: "group relative flex-row self-start",
      cells: "flex-row gap-xs",
      cell: [
        "flex-center w-[44px] h-[52px] rounded-sm border",
        "transition-[border-color,background-color,outline-color] duration-fast ease-in",
        "outline-interactive-outlined-pressable",
      ].join(" "),
      char: "font-mono-bold text-xl",
      caret: "w-[2px] h-[28px] rounded-full bg-accent animate-caret-blink",
      // `text-xl` keeps iOS Safari from zooming on focus (it does under 16px).
      input: "absolute inset-0 z-1 opacity-0 text-transparent text-xl",
    },
    variants: {
      disabled: {
        true: {
          cell: "bg-disabled-interactive-muted border-interactive-outlined-disabled",
          char: "text-form-disabled-text",
          input: "web:cursor-not-allowed",
        },
        false: {
          cell: [
            "bg-highlight",
            process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
              ? ""
              : "border-interactive-outlined-pressable",
            "group-hover:border-interactive-outlined-hover",
            "group-active:border-interactive-outlined-active",
          ].join(" "),
          char: "text-sharp",
          input: "web:cursor-text",
        },
      },
      focused: { true: {}, false: {} },
      active: { true: {}, false: {} },
      forceStyle: {
        undefined: {
          cell: storybookOnly("border-interactive-outlined-pressable"),
        },
        hover: { cell: storybookOnly("border-interactive-outlined-hover") },
        focus: {},
        press: { cell: storybookOnly("border-interactive-outlined-active") },
      },
    },
    compoundVariants: [
      {
        focused: true,
        active: true,
        disabled: false,
        class: { cell: focusedCellClasses },
      },
      {
        forceStyle: "focus",
        active: true,
        class: { cell: storybookOnly(focusedCellClasses) },
      },
    ],
    defaultVariants: {
      disabled: false,
      focused: false,
      active: false,
      forceStyle: "undefined",
    },
  },
  { twMergeConfig },
);

export type InputCodeMode = "alphanumeric" | "numeric";

// `one-time-code` is what the OS autofills from an SMS: react-native maps it to
// iOS `textContentType="oneTimeCode"` and Android `sms-otp`.
const modeProps = {
  numeric: {
    autoComplete: "one-time-code",
    inputMode: "numeric",
    keyboardType: "number-pad",
  },
  alphanumeric: {
    autoComplete: "one-time-code",
    autoCapitalize: "characters",
    autoCorrect: false,
  },
} as const satisfies Record<InputCodeMode, Partial<RNTextInputProps>>;

interface SanitizeCodeParams {
  raw: string;
  mode: InputCodeMode;
  length: number;
}

// Whatever reaches the input — a keystroke, a paste of "123 456", an autofill —
// is reduced to the code's alphabet and length here, never by `maxLength`,
// which would cut a pasted code before its spaces are dropped.
function sanitizeCode({ raw, mode, length }: SanitizeCodeParams): string {
  const allowed =
    mode === "numeric"
      ? raw.replace(/\D/g, "")
      : raw.toUpperCase().replace(/[^0-9A-Z]/g, "");
  return allowed.slice(0, length);
}

/**
 * Web only: keeps the caret at the end of the code, so a click in the middle
 * of a cell never inserts there. react-native-web applies a controlled
 * `selection` on render and reports `onSelectionChange` from the DOM `select`
 * event, which a collapsed caret move never fires; the document's
 * `selectionchange` is what sees the click. Native re-applies `selection`
 * itself after its own selection event.
 */
function usePinCaretToEnd(inputRef: RefObject<RNTextInput | null>): void {
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const pin = (): void => {
      const node = inputRef.current as unknown as HTMLInputElement | null;
      if (!node || document.activeElement !== node) return;
      const end = node.value.length;
      if (node.selectionStart !== end || node.selectionEnd !== end) {
        node.setSelectionRange(end, end);
      }
    };
    document.addEventListener("selectionchange", pin);
    return () => {
      document.removeEventListener("selectionchange", pin);
    };
  }, [inputRef]);
}

export interface InputCodeProps extends Pick<
  VariantProps<typeof inputCodeVariants>,
  "forceStyle"
> {
  /** Number of characters, one cell each. */
  length?: number;
  /** The code's alphabet: digits, or digits and uppercase letters. */
  mode?: InputCodeMode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (code: string) => void;
  /** Fires once each time the last cell is filled, with the full code. */
  onComplete?: (code: string) => void;
  onBlur?: RNTextInputProps["onBlur"];
  disabled?: boolean;
  /**
   * The field is in error: the cells take the danger accent (through the
   * `interactive-outlined-*` tokens) and the input is `aria-invalid`. From
   * `FormItem`'s render params, next to `describedBy`.
   */
  invalid?: boolean;
  autoFocus?: boolean;
  /** On the row the parent lays out; the cells and the input are inside it. */
  className?: string;
  ref?: Ref<RNTextInput>;
  testID?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /**
   * react-native's types have no `aria-describedby` / `aria-required`, but
   * react-native-web forwards both and native ignores unknown props.
   */
  "aria-describedby"?: string;
  "aria-required"?: boolean;
}

export function InputCode({
  length = 6,
  mode = "numeric",
  value,
  defaultValue,
  onValueChange,
  onComplete,
  onBlur,
  disabled,
  invalid,
  autoFocus,
  className,
  forceStyle,
  ref,
  testID,
  ...ariaProps
}: InputCodeProps): ReactNode {
  const [current, setCurrent] = useControllableValue({
    value,
    defaultValue,
    onValueChange,
  });
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<RNTextInput | null>(null);
  usePinCaretToEnd(inputRef);

  const setInputRef = useCallback(
    (node: RNTextInput | null) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const code = sanitizeCode({ raw: current ?? "", mode, length });
  const isDisabled = disabled === true;
  const activeIndex = Math.min(code.length, length - 1);
  const showCaret =
    (focused || forceStyle === "focus") && !isDisabled && code.length < length;
  const selection = useMemo(
    () => ({ start: code.length, end: code.length }),
    [code.length],
  );
  const styles = inputCodeVariants({
    disabled: isDisabled,
    focused,
    forceStyle,
  });

  const handleChangeText = (raw: string): void => {
    const next = sanitizeCode({ raw, mode, length });
    setCurrent(next);
    if (next.length === length && next !== code) onComplete?.(next);
  };

  // Same forwarding as `aria-describedby`: untyped by react-native, rendered by
  // react-native-web.
  const ariaInvalidProps = { "aria-invalid": invalid === true };

  // Stable: `invalid` toggles while the code is being typed, and a plain
  // AccentScope would remount the input (and drop its focus) with it.
  return (
    <StableAccentScope accent={invalid ? "danger" : undefined}>
      <View className={styles.root({ className })}>
        <View aria-hidden className={styles.cells()}>
          {Array.from({ length }, (_, index) => {
            const active = index === activeIndex;
            return (
              // eslint-disable-next-line react/no-array-index-key -- a cell is its position
              <View key={index} className={styles.cell({ active })}>
                {showCaret && active ? (
                  <View className={styles.caret()} />
                ) : (
                  <Text className={styles.char()}>{code[index] ?? ""}</Text>
                )}
              </View>
            );
          })}
        </View>
        <RNTextInput
          ref={setInputRef}
          caretHidden
          value={code}
          selection={selection}
          editable={!isDisabled}
          disabled={disabled}
          aria-disabled={isDisabled}
          // eslint-disable-next-line jsx-a11y/no-autofocus -- the caller's call, as on InputText
          autoFocus={autoFocus}
          className={styles.input()}
          testID={testID}
          onChangeText={handleChangeText}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...ariaInvalidProps}
          {...modeProps[mode]}
          {...ariaProps}
        />
      </View>
    </StableAccentScope>
  );
}
