import { type ThemeName } from "@tamagui/core";
import type { ComponentProps, ReactNode } from "react";
import { Switch as NativeSwitch } from "react-native";
export type SwitchProps = Pick<ComponentProps<typeof NativeSwitch>, "aria-labelledby" | "disabled" | "onValueChange" | "testID"> & {
    theme?: ThemeName;
    checked?: boolean;
};
export declare function Switch({ theme, ...rest }: SwitchProps): ReactNode;
//# sourceMappingURL=Switch.d.ts.map