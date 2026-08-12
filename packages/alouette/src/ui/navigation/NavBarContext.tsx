import { createSelectionContext } from "../selection/SelectionContext";

export const {
  SelectionContextProvider: NavBarContextProvider,
  useSelection: useNavBarContext,
} = createSelectionContext("NavBarItem must be rendered inside a NavBar.");
