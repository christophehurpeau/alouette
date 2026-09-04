import { createContext, useContext } from "react";

export interface MenuContextValue {
  /** Dismisses the menu — an item runs it after its own handler. */
  close: () => void;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const MenuContextProvider = MenuContext.Provider;

export function useMenuContext(): MenuContextValue {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("MenuItem must be rendered inside a Menu.");
  }
  return context;
}
