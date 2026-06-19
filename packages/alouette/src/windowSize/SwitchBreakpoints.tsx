import type { ReactNode } from "react";
import { View } from "react-native";
import type { SetRequired } from "type-fest";
import type { BreakpointNames } from "../config/Breakpoints";
import { useCurrentBreakpointNameFiltered } from "./useCurrentBreakpointName";

type SwitchBreakpointsProps = SetRequired<
  Partial<Record<BreakpointNames, ReactNode>>,
  "base"
> & { children?: never };

// Static lookup table so the Tailwind/NativeWind scanner sees every classname.
// Keys are `"<currentBreakpoint>:<nextDefinedBreakpointOrEnd>"`. The value
// is the className that makes the slot visible from `current` (inclusive)
// up to `next` (exclusive).
//
// Tailwind v4 breakpoint mapping — see global.css:
//   sm = 480px (alouette SMALL)
//   md = 768px (alouette MEDIUM)
//   lg = 1024px (alouette LARGE)
//   xl = 1280px (alouette WIDE)
const VISIBILITY_CLASS: Record<string, string> = {
  "base:end": "flex",
  "base:small": "flex sm:hidden",
  "base:medium": "flex md:hidden",
  "base:large": "flex lg:hidden",
  "base:wide": "flex xl:hidden",
  "small:end": "hidden sm:flex",
  "small:medium": "hidden sm:flex md:hidden",
  "small:large": "hidden sm:flex lg:hidden",
  "small:wide": "hidden sm:flex xl:hidden",
  "medium:end": "hidden md:flex",
  "medium:large": "hidden md:flex lg:hidden",
  "medium:wide": "hidden md:flex xl:hidden",
  "large:end": "hidden lg:flex",
  "large:wide": "hidden lg:flex xl:hidden",
  "wide:end": "hidden xl:flex",
};

/**
 * Display based on current breakpoint via responsive utility classes.
 *
 * On web this is SSR-friendly (CSS handles the switching). On native it
 * still relies on NativeWind's runtime media-query evaluation.
 */
export function SwitchBreakpointsUsingDisplayNone({
  ...breakpoints
}: SwitchBreakpointsProps): ReactNode {
  const entries = Object.entries(breakpoints) as [BreakpointNames, ReactNode][];

  return entries.map(([name, node], index) => {
    const next = entries[index + 1]?.[0] ?? "end";
    const className = VISIBILITY_CLASS[`${name}:${next}`] ?? "flex";
    return (
      <View key={name} className={className}>
        {node}
      </View>
    );
  });
}

/**
 * Display based on current breakpoint via conditional rendering. Only the
 * matching slot is in the tree — heavier components stay unmounted.
 */
export function SwitchBreakpointsUsingNull({
  children,
  ...breakpoints
}: SwitchBreakpointsProps): ReactNode {
  const currentBreakpointName = useCurrentBreakpointNameFiltered(
    Object.keys(breakpoints) as (keyof typeof breakpoints)[],
  );

  return breakpoints[currentBreakpointName] ?? null;
}
