import { type ReactNode, cloneElement } from "react";
import type { IconProps } from "./Icon";

export function Icon({
  icon,
  size = 20,
  className = "text-sharp",
}: IconProps): ReactNode {
  return cloneElement(icon, {
    // An <svg> is a flex item with the CSS default flex-shrink: 1, so a long
    // sibling squeezes it below `size`. React Native already defaults to 0.
    className: `shrink-0 ${className}`,
    width: size,
    height: size,
  });
}
