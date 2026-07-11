/**
 * Time from `loading` going false until the ring has finished completing to
 * 100% and faded out — how long a consumer must keep the component mounted
 * to see the finish animation instead of cutting it off.
 */
export declare const indeterminateExitDurationMs: number;
export declare function useSimulatedProgress(loading: boolean): {
    progress: number;
    hidden: boolean;
};
//# sourceMappingURL=useSimulatedProgress.d.ts.map