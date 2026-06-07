import type { ReactNode } from "react";
import type { SetRequired } from "type-fest";
import type { BreakpointNames } from "../config/Breakpoints";
type SwitchBreakpointsProps = SetRequired<Partial<Record<BreakpointNames, ReactNode>>, "base"> & {
    children?: never;
};
/**
 * Display based on current breakpoint via responsive utility classes.
 *
 * On web this is SSR-friendly (CSS handles the switching). On native it
 * still relies on NativeWind's runtime media-query evaluation.
 */
export declare function SwitchBreakpointsUsingDisplayNone({ ...breakpoints }: SwitchBreakpointsProps): ReactNode;
/**
 * Display based on current breakpoint via conditional rendering. Only the
 * matching slot is in the tree — heavier components stay unmounted.
 */
export declare function SwitchBreakpointsUsingNull({ children, ...breakpoints }: SwitchBreakpointsProps): ReactNode;
export {};
//# sourceMappingURL=SwitchBreakpoints.d.ts.map