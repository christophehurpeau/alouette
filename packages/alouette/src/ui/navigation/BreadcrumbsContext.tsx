import { createContext, useContext } from "react";

export interface BreadcrumbItemContextValue {
  /** Last crumb of the trail: the page being viewed, not a destination. */
  current: boolean;
  disabled: boolean;
  onNavigate?: (href: string) => void;
}

const BreadcrumbItemContext = createContext<
  BreadcrumbItemContextValue | undefined
>(undefined);

export const BreadcrumbItemContextProvider = BreadcrumbItemContext.Provider;

export function useBreadcrumbItemContext(): BreadcrumbItemContextValue {
  const context = useContext(BreadcrumbItemContext);
  if (!context) {
    throw new Error("BreadcrumbItem must be rendered inside Breadcrumbs.");
  }
  return context;
}
