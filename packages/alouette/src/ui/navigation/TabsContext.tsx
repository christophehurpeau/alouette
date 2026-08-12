import { createSelectionContext } from "../selection/SelectionContext";

export const {
  SelectionContextProvider: TabsContextProvider,
  useSelection: useTabsContext,
} = createSelectionContext("Tab must be rendered inside Tabs.");
