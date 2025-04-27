import type { ColorTokens, GetProps, Variable } from "@tamagui/core";
import { useStyle } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import type { OpaqueColorValue } from "react-native";
import type { BoxProps } from "../containers/Box.tsx";
import { Box } from "../containers/Box.tsx";

export interface IconProps
  extends Exclude<GetProps<typeof Box>, "alignSelf" | "style"> {
  icon: ReactElement;
  color?: ColorTokens | OpaqueColorValue | Variable<any> | undefined;
  align?: BoxProps["alignSelf"];
  contrast?: boolean;
  size?: number;
}

export function Icon({
  icon,
  size = 20,
  align = "auto",
  contrast,
  color = contrast ? "$contrastTextColor" : "$textColor",
  ...props
}: IconProps): ReactNode {
  const style = useStyle({
    color,
    // if needed for native
    // resolveValues: Platform.OS === 'web' ? undefined: 'value',
  });

  // if needed for native
  // const clonedIcon = cloneElement(icon, { style });
  // const clonedIcon = cloneElement(icon, { color: style.color });

  return (
    <Box {...props} centered alignSelf={align} size={size} style={style as any}>
      {icon}
    </Box>
  );
}
