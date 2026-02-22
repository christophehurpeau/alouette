// import type { ThemeProps } from "@tamagui/core";
import type { ComponentProps } from "react";
import { Switch as NativeSwitch } from "react-native";

export function Switch({
  // checkedTheme,
  checked,
  ...rest
}: Pick<
  ComponentProps<typeof NativeSwitch>,
  "aria-labelledby" | "disabled" | "onValueChange"
> & {
  checked?: boolean;
  // checkedTheme?: ThemeProps["name"];
}) {
  return <NativeSwitch value={checked} {...rest} />;
}
