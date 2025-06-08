export declare const Breakpoints: {
    /**
     * min-width: 0
     */
    readonly BASE: 0;
    /**
     * min-width: 480px
     */
    readonly SMALL: 480;
    /**
     * min-width: 768px
     */
    readonly MEDIUM: 768;
    /**
     * min-width: 1024px
     */
    readonly LARGE: 1024;
    /**
     * min-width: 1280px
     */
    readonly WIDE: 1280;
};
export type Breakpoint = (typeof Breakpoints)[keyof typeof Breakpoints];
export type BreakpointNames = "base" | "large" | "medium" | "small" | "wide";
export declare enum BreakpointNameEnum {
    BASE = "base",
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
    WIDE = "wide"
}
//# sourceMappingURL=Breakpoints.d.ts.map