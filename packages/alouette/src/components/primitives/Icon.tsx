import type { ColorTokens, Variable } from "@tamagui/core";
import { Text, usePropsAndStyle } from "@tamagui/core";
import { cloneElement } from "react";
import type { ReactElement, ReactNode, SVGProps } from "react";
import type { OpaqueColorValue } from "react-native";

export type SVGIconElement = ReactElement<SVGProps<SVGSVGElement>>;

export interface IconProps {
  icon: SVGIconElement;
  disabled?: boolean;
  accent?: boolean;
  color?: ColorTokens | OpaqueColorValue | Variable<any> | undefined;
  size?: number;
}

const getDefaultColor = (disabled?: boolean, accent?: boolean) => {
  if (disabled) return "$textColor:disabled";
  if (accent) return "$accentTextColor";
  return "$textColor";
};

export function Icon({
  icon,
  size = 20,
  disabled,
  accent,
  color = getDefaultColor(disabled, accent),
}: IconProps): ReactNode {
  const [props, style] = usePropsAndStyle(
    { color, width: size, height: size },
    { forComponent: Text },
  );
  return cloneElement(icon, { style, ...props } as any);
}
