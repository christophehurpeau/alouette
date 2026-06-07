import {
  type ReactElement,
  type ReactNode,
  type SVGProps,
  cloneElement,
} from "react";
import { useThemeToken } from "../../core/useThemeToken";

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
  className?:
    | string // keeping string to allow tailwind-variants usage
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | "text-accent"
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | "text-disabled-muted"
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | "text-disabled"
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | "text-muted"
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | "text-on-accent-muted"
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | "text-on-accent"
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | "text-sharp";
}

export function Icon({
  icon,
  size = 20,
  className = "text-sharp",
}: IconProps): ReactNode {
  // RN SVG needs a concrete color, not a className. Resolve the text-* color
  // class to its --color-* token value via the active theme.
  const token = className
    .split(/\s+/)
    .find((part) => part.startsWith("text-"))
    ?.slice("text-".length);
  const color = useThemeToken(`--color-${token ?? "sharp"}`);
  return cloneElement(icon, {
    color,
    width: size,
    height: size,
  });
}
