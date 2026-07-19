import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useCurrentMode, useCurrentTheme } from "../../core/ThemeContext";
import { InteractiveBox } from "../containers/Box";
import { ScopedTheme } from "../containers/ScopedTheme";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { useRadioContext } from "./RadioContext";

const indicatorVariants = tv({
  base: "size-[22px] rounded-full border-2 items-center justify-center transition-[border-color] duration-fast ease-in",
  variants: {
    selected: {
      true: "border-accent",
      false:
        "border-interactive-outlined-pressable group-hover:border-interactive-outlined-hover group-active:border-interactive-outlined-active",
    },
    disabled: {
      true: "border-interactive-outlined-disabled",
      false: "",
    },
  },
});

const dotVariants = tv({
  base: "size-[10px] rounded-full bg-accent transition-transform duration-fast ease-in",
  variants: {
    selected: {
      true: "scale-100",
      false: "scale-0",
    },
  },
});

const labelVariants = tv({
  base: "text-base",
  variants: {
    disabled: {
      true: "text-disabled-sharp",
      false: "text-sharp",
    },
  },
});

export interface RadioProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export function Radio({ value, label, disabled }: RadioProps): ReactNode {
  const {
    value: selectedValue,
    onSelect,
    disabled: groupDisabled,
  } = useRadioContext();
  const selected = selectedValue === value;
  const isDisabled = disabled === true || groupDisabled === true;
  const currentTheme = useCurrentTheme();
  const currentMode = useCurrentMode();

  return (
    <InteractiveBox
      withFocusVisibleOutline
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      aria-label={label}
      disabled={isDisabled}
      className="group flex-row items-center gap-xs self-start rounded-xs px-xs min-h-11 focus-visible:outline-interactive-outlined-outline-focus"
      onPress={() => {
        onSelect(value);
      }}
    >
      <ScopedTheme
        theme={
          currentTheme === currentMode ? `${currentTheme}_brand` : currentTheme
        }
      >
        <View className={indicatorVariants({ selected, disabled: isDisabled })}>
          <View className={dotVariants({ selected })} />
        </View>
      </ScopedTheme>
      <Text className={labelVariants({ disabled: isDisabled })}>{label}</Text>
    </InteractiveBox>
  );
}
