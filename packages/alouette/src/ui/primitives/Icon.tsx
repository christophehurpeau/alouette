import type { ColorTokens } from "@tamagui/core";
import { Text, usePropsAndStyle } from "@tamagui/core";
import { cloneElement } from "react";
import type { ReactElement, ReactNode, SVGProps } from "react";

export type SVGIconElement = ReactElement<SVGProps<SVGSVGElement>>;

export interface IconProps {
  icon: SVGIconElement;
  disabled?: boolean;
  disabledSharp?: boolean;
  tint?:
    | "accent-muted"
    | "accent"
    | "muted"
    | "onAccent-muted"
    | "onAccent"
    | "sharp";
  size?: number;
}

const getDefaultColor = (
  disabled?: boolean,
  disabledSharp?: boolean,
  tint?: IconProps["tint"],
): ColorTokens => {
  if (disabled) {
    return disabledSharp ? "$text-disabled-sharp" : "$text-disabled-muted";
  }
  if (tint === "accent") return "$text-accent";
  if (tint === "accent-muted") return "$text-accent-muted";
  if (tint === "muted") return "$text-muted";
  if (tint === "onAccent") return "$text-onAccent";
  if (tint === "onAccent-muted") return "$text-onAccent-muted";
  return "$text-sharp";
};

export function Icon({
  icon,
  // TODO should size be normalized ?
  size = 20,
  disabled,
  disabledSharp,
  tint,
}: IconProps): ReactNode {
  const [props, style] = usePropsAndStyle(
    {
      color: getDefaultColor(disabled, disabledSharp, tint),
      width: size,
      height: size,
    },
    { forComponent: Text },
  );
  return cloneElement(icon, { style, ...props } as any);
}
