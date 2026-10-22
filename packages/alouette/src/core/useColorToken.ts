import { useUnstableNativeVariable as useNativeVariable } from "nativewind";

export const useColorVariable = useNativeVariable as (
  variableName: string,
) => string | undefined;

export type ColorClassName =
  | string // keeping string to allow tailwind-variants usage
  // oxlint-disable-next-line typescript/no-redundant-type-constituents
  | "text-accent"
  // oxlint-disable-next-line typescript/no-redundant-type-constituents
  | "text-disabled-muted"
  // oxlint-disable-next-line typescript/no-redundant-type-constituents
  | "text-disabled"
  // oxlint-disable-next-line typescript/no-redundant-type-constituents
  | "text-muted"
  // oxlint-disable-next-line typescript/no-redundant-type-constituents
  | "text-on-accent-muted"
  // oxlint-disable-next-line typescript/no-redundant-type-constituents
  | "text-on-accent"
  // oxlint-disable-next-line typescript/no-redundant-type-constituents
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
  return useColorVariable(`--color-${token ?? "sharp"}`);
}
