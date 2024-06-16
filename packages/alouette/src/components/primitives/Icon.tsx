import type { ColorTokens, GetProps, Variable } from "@tamagui/core";
import { useStyle } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import type { OpaqueColorValue } from "react-native";
import type { FrameProps } from "../containers/Frame";
import { Frame } from "../containers/Frame";

export interface IconProps
  extends Exclude<GetProps<typeof Frame>, "alignSelf" | "style"> {
  icon: ReactElement;
  color?: ColorTokens | OpaqueColorValue | Variable<any> | undefined;
  align?: FrameProps["alignSelf"];
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
    <Frame
      {...props}
      centered
      alignSelf={align}
      size={size}
      style={style as any}
    >
      {icon}
    </Frame>
  );
}
