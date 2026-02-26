import { Theme, type ThemeName, useTheme } from "@tamagui/core";
import type { ComponentProps, ReactNode } from "react";
import { Switch as NativeSwitch } from "react-native";

export type SwitchProps = Pick<
  ComponentProps<typeof NativeSwitch>,
  "aria-labelledby" | "disabled" | "onValueChange"
> & {
  theme?: ThemeName;
  checked?: boolean;
  // checkedTheme?: ThemeName;
};
function ThemedNativeSwitch({
  checked,
  ...rest
}: Omit<SwitchProps, "theme">): ReactNode {
  const theme = useTheme();
  const backgroundColor = rest.disabled
    ? theme["$interactive.forms.backgroundColor:disabled"]?.get()
    : theme["$bg-lowered"]?.get();

  const thumbColor = rest.disabled
    ? theme["$text-disabled-muted"]?.get()
    : theme["$bg-highlight"]?.get();

  return (
    <NativeSwitch
      ios_backgroundColor={backgroundColor}
      trackColor={{
        false: backgroundColor,
        true: backgroundColor,
      }}
      thumbColor={thumbColor}
      value={checked}
      {...rest}
    />
  );
}

export function Switch({
  // checkedTheme,
  theme,
  ...rest
}: SwitchProps): ReactNode {
  return (
    <Theme name={theme}>
      <ThemedNativeSwitch {...rest} />
    </Theme>
  );
}
