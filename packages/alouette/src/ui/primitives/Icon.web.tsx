import { type ReactNode, cloneElement } from "react";
import type { IconProps } from "./Icon";

export function Icon({
  icon,
  size = 20,
  className = "text-sharp",
}: IconProps): ReactNode {
  return cloneElement(icon, {
    className,
    width: size,
    height: size,
  });
}
