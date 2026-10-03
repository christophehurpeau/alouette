import { createSelectionContext } from "../selection/SelectionContext";

export const {
  SelectionContextProvider: HeaderNavContextProvider,
  useSelection: useHeaderNavContext,
} = createSelectionContext(
  "HeaderNavItem must be rendered inside an HeaderNav.",
);
