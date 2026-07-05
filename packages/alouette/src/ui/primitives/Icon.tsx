import {
  type ReactElement,
  type ReactNode,
  type SVGProps,
  cloneElement,
} from "react";
import type { ColorClassName } from "../../core/useColorToken";
import { useColorToken } from "../../core/useColorToken";

export type SVGIconElement = ReactElement<SVGProps<SVGSVGElement>>;

export interface IconProps {
  icon: SVGIconElement;
  /** Square size in px. Defaults to 20. */
  size?: number;
  /**
   * Text-colour className driving the icon tint, e.g. `text-sharp`,
   * `text-muted`, `text-accent`, `text-on-accent`, `text-disabled-muted`.
   * Defaults to `text-sharp`.
   */
  className?: ColorClassName;
}

export function Icon({
  icon,
  size = 20,
  className = "text-sharp",
}: IconProps): ReactNode {
  // RN SVG needs a concrete color, not a className. Resolve the text-* color
  // class to its --color-* token value via the active theme.
  const color = useColorToken(className);
  return cloneElement(icon, {
    color,
    width: size,
    height: size,
  });
}
