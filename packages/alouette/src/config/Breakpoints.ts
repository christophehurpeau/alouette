export const Breakpoints = {
  /**
   * min-width: 0
   */
  BASE: 0,
  /**
   * min-width: 480px
   */
  SMALL: 480,
  /**
   * min-width: 768px
   */
  MEDIUM: 768,
  /**
   * min-width: 1024px
   */
  LARGE: 1024,
  /**
   * min-width: 1280px
   */
  WIDE: 1280,
} as const;

export type Breakpoint = (typeof Breakpoints)[keyof typeof Breakpoints];
export type BreakpointNames = "base" | "large" | "medium" | "small" | "wide";

export enum BreakpointNameEnum {
  BASE = "base",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  WIDE = "wide",
}
