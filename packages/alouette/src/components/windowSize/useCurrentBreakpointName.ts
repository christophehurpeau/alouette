import { useMedia } from "@tamagui/core";
import type { BreakpointNames } from "../../config/Breakpoints";
import { BreakpointNameEnum } from "../../config/Breakpoints";

export function useCurrentBreakpointName(): BreakpointNameEnum {
  const media = useMedia();

  if (media.wide) return BreakpointNameEnum.WIDE;
  if (media.large) return BreakpointNameEnum.LARGE;
  if (media.medium) return BreakpointNameEnum.MEDIUM;
  if (media.small) return BreakpointNameEnum.SMALL;
  return BreakpointNameEnum.BASE;
}

export function useCurrentBreakpointNameFiltered<
  Names extends BreakpointNames[],
>(names: Names): Names[number] {
  const media = useMedia();

  if (names.includes(BreakpointNameEnum.WIDE) && media.wide) {
    return BreakpointNameEnum.WIDE;
  }
  if (names.includes(BreakpointNameEnum.LARGE) && media.large) {
    return BreakpointNameEnum.LARGE;
  }
  if (names.includes(BreakpointNameEnum.MEDIUM) && media.medium) {
    return BreakpointNameEnum.MEDIUM;
  }
  if (names.includes(BreakpointNameEnum.SMALL) && media.small) {
    return BreakpointNameEnum.SMALL;
  }
  return BreakpointNameEnum.BASE;
}
