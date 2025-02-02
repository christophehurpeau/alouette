import { Breakpoints } from "./Breakpoints";

export const media = {
  small: { minWidth: Breakpoints.SMALL },
  medium: { minWidth: Breakpoints.MEDIUM },
  large: { minWidth: Breakpoints.LARGE },
  wide: { minWidth: Breakpoints.WIDE },
} as const;
