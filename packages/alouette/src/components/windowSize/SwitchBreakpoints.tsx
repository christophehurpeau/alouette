import type { ReactNode } from "react";
import type { SetRequired } from "type-fest";
import type { BreakpointNames } from "../../config/Breakpoints";
import { View } from "../primitives/View";
import { useCurrentBreakpointNameFiltered } from "./useCurrentBreakpointName";

type SwitchBreakpointsProps = SetRequired<
  Partial<Record<BreakpointNames, ReactNode>>,
  "base"
> & { children?: never };

/**
 * Display based on current breakpoint
 *
 * This mode is SSR friendly
 */
export function SwitchBreakpointsUsingDisplayNone({
  ...breakpoints
}: SwitchBreakpointsProps): ReactNode {
  const entries = Object.entries(breakpoints);

  return entries.map(([name, node], index) => {
    return (
      <View
        key={name}
        display={name === "base" ? "flex" : "none"}
        {...(name === "base"
          ? undefined
          : { display: "none", [`$${name}`]: { display: "flex" } })}
        {...(index + 1 in entries
          ? { [`$${entries[index + 1]![0]}`]: { display: "none" } }
          : undefined)}
      >
        {node}
      </View>
    );
  });
}

/**
 * Display based on current breakpoint
 *
 * This mode is not SSR friendly
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
