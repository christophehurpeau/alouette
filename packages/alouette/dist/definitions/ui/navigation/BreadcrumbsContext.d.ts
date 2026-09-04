export interface BreadcrumbItemContextValue {
    /** Last crumb of the trail: the page being viewed, not a destination. */
    current: boolean;
    disabled: boolean;
    onNavigate?: (href: string) => void;
}
export declare const BreadcrumbItemContextProvider: import("react").Provider<BreadcrumbItemContextValue | undefined>;
export declare function useBreadcrumbItemContext(): BreadcrumbItemContextValue;
//# sourceMappingURL=BreadcrumbsContext.d.ts.map