import { useThemeToken } from "./useThemeToken";

export type ColorClassName =
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
/**
 * Resolves a `text-*` Tailwind className (e.g. `"text-accent"`) to its
 * concrete `--color-*` token value for the active theme. For native SVG
 * props (`color`, `stroke`, `fill`) that can't take a className directly and
 * so can't rely on CSS `currentColor` the way web SVG can.
 */
export function useColorToken(className: ColorClassName): string | undefined {
  const token = className
    .split(/\s+/)
    .find((part) => part.startsWith("text-"))
    ?.slice("text-".length);
  return useThemeToken(`--color-${token ?? "sharp"}`);
}
