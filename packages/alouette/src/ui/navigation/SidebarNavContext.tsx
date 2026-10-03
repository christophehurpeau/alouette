import { createSelectionContext } from "../selection/SelectionContext";

export const {
  SelectionContextProvider: SidebarNavContextProvider,
  useSelection: useSidebarNavContext,
} = createSelectionContext(
  "SidebarNavItem must be rendered inside a SidebarNav.",
);
