import { useWindowDimensions } from "react-native";
import {
  BreakpointNameEnum,
  type BreakpointNames,
  Breakpoints,
} from "../config/Breakpoints";

export function useCurrentBreakpointName(): BreakpointNameEnum {
  const { width } = useWindowDimensions();
  if (width >= Breakpoints.WIDE) return BreakpointNameEnum.WIDE;
  if (width >= Breakpoints.LARGE) return BreakpointNameEnum.LARGE;
  if (width >= Breakpoints.MEDIUM) return BreakpointNameEnum.MEDIUM;
  if (width >= Breakpoints.SMALL) return BreakpointNameEnum.SMALL;
  return BreakpointNameEnum.BASE;
}

export function useCurrentBreakpointNameFiltered<
  Names extends BreakpointNames[],
>(names: Names): Names[number] {
  const current = useCurrentBreakpointName();
  // Walk from the largest matching breakpoint down to BASE; pick the first
  // one the consumer asked for.
  const ordered = [
    BreakpointNameEnum.WIDE,
    BreakpointNameEnum.LARGE,
    BreakpointNameEnum.MEDIUM,
    BreakpointNameEnum.SMALL,
    BreakpointNameEnum.BASE,
  ] as const;
  const startIndex = ordered.indexOf(current);
  for (let i = startIndex; i < ordered.length; i++) {
    const candidate = ordered[i]!;
    if (names.includes(candidate)) return candidate;
  }
  return BreakpointNameEnum.BASE;
}
