import { type ReactNode, useCallback, useState } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";
import { InteractiveBox } from "../containers/Box";

const TRACK_HEIGHT = 44;
const TRACK_WIDTH = 66;
const THUMB_PADDING = TRACK_HEIGHT * 0.1;
const THUMB_SIZE = TRACK_HEIGHT * 0.8;
const TRAVEL_X = TRACK_WIDTH - THUMB_SIZE - THUMB_PADDING * 2;

const trackVariants = tv(
  {
    base: "relative rounded-full overflow-hidden shadow-lowered pointer-events-auto outline-interactive-outlined-outline-focus bg-lowered disabled:bg-form-bg-disabled",
    variants: {
      checked: {
        true: "",
        false: "",
      },
    },
  },
  { twMerge: false },
);

const thumbVariants = tv(
  {
    base: [
      "absolute rounded-full shadow-s",
      "transition-transform duration-200 ease-in",
      "bg-highlight disabled:bg-disabled-muted",
    ].join(" "),
  },
  { twMerge: false },
);

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
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
  onValueChange,
  ...props
}: SwitchProps): ReactNode {
  const [value, setValue] = useControllableChecked(checked, onValueChange);

  return (
    <InteractiveBox
      withFocusVisibleOutline
      role="switch"
      aria-checked={value}
      aria-disabled={disabled === true}
      disabled={disabled}
      className={trackVariants({ checked: value })}
      style={{
        width: TRACK_WIDTH,
        height: TRACK_HEIGHT,
      }}
      onPress={() => {
        setValue(!value);
      }}
      {...props}
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
    </InteractiveBox>
  );
}

export function Switch(props: SwitchProps): ReactNode {
  return <SwitchInner {...props} />;
}
