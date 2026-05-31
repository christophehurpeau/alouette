import type { ReactNode } from "react";
import { PressableBox, type PressableBoxProps } from "../data/PressableBox";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { buttonHeight } from "./Button";

export interface IconButtonProps extends Omit<PressableBoxProps, "children"> {
  icon: SVGIconElement;
  /** Preset size token, or any number for a custom diameter (px). */
  size?: number | "md" | "sm";
  /** When "fill", the icon takes 80% of the button; default uses 50%. */
  iconSize?: "fill";
  "aria-label": string;
}

export function IconButton({
  icon,
  disabled,
  size = "md",
  iconSize,
  variant = "contained",
  className,
  ...pressableProps
}: IconButtonProps): ReactNode {
  const diameter = typeof size === "number" ? size : buttonHeight[size];
  const isDisabled = disabled === true;
  const onAccent = variant === "contained";

  return (
    <PressableBox
      variant={variant}
      disabled={disabled}
      className={`shrink-0 items-center justify-center rounded-full ${className ?? ""}`}
      style={{ width: diameter, height: diameter }}
      {...pressableProps}
    >
      <Icon
        icon={icon}
        size={diameter * (iconSize === "fill" ? 0.8 : 0.55)}
        disabled={isDisabled}
        tint={onAccent ? "onAccent" : "sharp"}
        disabledSharp={onAccent}
      />
    </PressableBox>
  );
}
