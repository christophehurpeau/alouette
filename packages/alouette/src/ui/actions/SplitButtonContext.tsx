import { createContext, use } from "react";

export interface SplitButtonContextValue {
  value: string | undefined;
  onSelect: (value: string) => void;
  /**
   * The options render twice: as the main button's label, where only the
   * selected one shows its text, and as the rows of the open menu.
   */
  slot: "label" | "menu";
}

const SplitButtonContext = createContext<SplitButtonContextValue | undefined>(
  undefined,
);

export const SplitButtonContextProvider = SplitButtonContext.Provider;

export function useSplitButtonContext(): SplitButtonContextValue {
  const context = use(SplitButtonContext);
  if (!context) {
    throw new Error("SplitButtonOption must be rendered inside a SplitButton.");
  }
  return context;
}
