import { createSelectionContext } from "../selection/SelectionContext";

export const {
  SelectionContextProvider: AppHeaderNavContextProvider,
  useSelection: useAppHeaderNavContext,
} = createSelectionContext(
  "AppHeaderNavItem must be rendered inside an AppHeaderNav.",
);
