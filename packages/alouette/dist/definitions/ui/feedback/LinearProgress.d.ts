import type { ReactNode } from "react";
import type { Accent } from "../../core/AlouetteConfig";
export type LinearProgressSize = "lg" | "md" | "sm" | "xs";
export interface LinearProgressProps {
    /** Known completion percentage, 0-100. For an unknown percentage (e.g.
     * reconnecting, page transitions), use `IndeterminateLinearProgress` instead. */
    progress: number;
    hidden?: boolean;
    accent?: Accent;
    size?: LinearProgressSize;
}
export declare function LinearProgress({ progress, hidden, accent, size, }: LinearProgressProps): ReactNode;
export interface IndeterminateLinearProgressProps {
    /** Whether an operation is in progress. The bar creeps toward 100% while
     * `true`, then completes and fades out once `false`. */
    loading: boolean;
    accent?: Accent;
    size?: LinearProgressSize;
}
export declare function IndeterminateLinearProgress({ loading, accent, size, }: IndeterminateLinearProgressProps): ReactNode;
//# sourceMappingURL=LinearProgress.d.ts.map