import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
export type CircularProgressSize = "lg" | "md" | "sm" | "xs";
export interface CircularProgressProps {
    /** Known completion percentage, 0-100. For an unknown percentage (e.g.
     * reconnecting, page transitions), use `IndeterminateCircularProgress` instead. */
    progress: number;
    hidden?: boolean;
    accent?: Accent;
    size?: CircularProgressSize;
}
export declare function CircularProgress({ progress, hidden, accent, size, }: CircularProgressProps): ReactNode;
export interface IndeterminateCircularProgressProps {
    /** Whether an operation is in progress. The ring creeps toward 100% while
     * `true`, then completes and fades out once `false`. */
    loading: boolean;
    accent?: Accent;
    size?: CircularProgressSize;
}
export declare function IndeterminateCircularProgress({ loading, accent, size, }: IndeterminateCircularProgressProps): ReactNode;
//# sourceMappingURL=CircularProgress.d.ts.map