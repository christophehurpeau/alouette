import type { ReactNode } from "react";
import type { SetRequired } from "type-fest";
import type { BreakpointNames } from "../../config/Breakpoints";
type SwitchBreakpointsProps = SetRequired<Partial<Record<BreakpointNames, ReactNode>>, "base"> & {
    children?: never;
};
/**
 * Display based on current breakpoint
 *
 * This mode is SSR friendly
 */
export declare function SwitchBreakpointsUsingDisplayNone({ ...breakpoints }: SwitchBreakpointsProps): ReactNode;
/**
 * Display based on current breakpoint
 *
 * This mode is not SSR friendly
 */
export declare function SwitchBreakpointsUsingNull({ children, ...breakpoints }: SwitchBreakpointsProps): ReactNode;
export {};
//# sourceMappingURL=SwitchBreakpoints.d.ts.map