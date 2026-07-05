import { type ReactNode, useCallback, useState } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { InteractiveBoxHitSlop } from "../containers/Box";

const PRESSABLE_HEIGHT = 44;
const TRACK_HEIGHT = 36;
const TRACK_WIDTH = 58;
const THUMB_PADDING = TRACK_HEIGHT * 0.1;
const THUMB_SIZE = TRACK_HEIGHT * 0.8;
const TRAVEL_X = TRACK_WIDTH - THUMB_SIZE - THUMB_PADDING * 2;

const trackVariants = tv(
  {
    // TODO if we can fix web to use proper button, change aria-disabled to disabled
    base: [
      "height-[36px] w-[58px]", // Must be identical to TRACK_HEIGHT and TRACK_WIDTH constants above
      "relative rounded-full overflow-hidden shadow-lowered pointer-events-auto",
      "transition-background-color duration-fast ease-in",
      "outline-interactive-outlined-outline-focus",
      "aria-disabled:bg-disabled-interactive-muted",
    ].join(" "),
    variants: {
      checked: {
        false: "bg-lowered",
        true: "bg-enabled",
      },
      // Storybook-only static stand-in for the :hover/:active states above.
      forceStyle: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
        ? { hover: "", focus: "", press: "" }
        : { hover: "", focus: "", press: "" },
    },
  },
  { twMerge: false },
);

const thumbVariants = tv(
  {
    base: [
      "absolute rounded-full shadow-s aria-disabled:shadow-none",
      "transition-transform duration-fast ease-in",
      "bg-surface aria-disabled:bg-disabled-interactive",
    ].join(" "),
  },
  { twMerge: false },
);

export interface SwitchProps {
  accent?: Accent;
  checked?: boolean;
  disabled?: boolean;
  forceStyle?: "focus" | "hover" | "press";
  onValueChange?: (value: boolean) => void;
  "aria-labelledby"?: string;
  testID?: string;
}

function useControllableChecked(
  controlled: boolean | undefined,
  onValueChange?: (value: boolean) => void,
): readonly [boolean, (next: boolean) => void] {
  const [internal, setInternal] = useState(controlled ?? false);
  const value = controlled ?? internal;
  const onChange = useCallback(
    (next: boolean) => {
      if (controlled === undefined) {
        setInternal(next);
      }
      if (next !== value) {
        onValueChange?.(next);
      }
    },
    [controlled, onValueChange, value],
  );
  return [value, onChange] as const;
}

function SwitchInner({
  checked,
  disabled,
  forceStyle,
  onValueChange,
  ...props
}: Omit<SwitchProps, "accent">): ReactNode {
  const [value, setValue] = useControllableChecked(checked, onValueChange);

  return (
    <InteractiveBoxHitSlop
      withFocusVisibleOutline
      role="switch"
      aria-checked={value}
      aria-disabled={disabled === true}
      disabled={disabled}
      style={{ height: PRESSABLE_HEIGHT, width: TRACK_WIDTH }}
      onPress={() => {
        setValue(!value);
      }}
      {...props}
    >
      <View
        aria-disabled={disabled === true}
        className={trackVariants({ checked: value, forceStyle })}
        style={{ width: TRACK_WIDTH, height: TRACK_HEIGHT }}
      >
        <View
          aria-disabled={disabled === true}
          className={thumbVariants({})}
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            top: THUMB_PADDING,
            left: THUMB_PADDING,
            transform: [{ translateX: value ? TRAVEL_X : 0 }],
          }}
        />
      </View>
    </InteractiveBoxHitSlop>
  );
}

export function Switch({ accent, ...rest }: SwitchProps): ReactNode {
  return (
    <AccentScope accent={accent}>
      <SwitchInner {...rest} />
    </AccentScope>
  );
}
