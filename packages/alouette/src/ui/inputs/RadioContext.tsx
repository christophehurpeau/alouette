import { createContext, useContext } from "react";

export interface RadioContextValue {
  value: string | undefined;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

const RadioContext = createContext<RadioContextValue | undefined>(undefined);

export const RadioContextProvider = RadioContext.Provider;

export function useRadioContext(): RadioContextValue {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error(
      "Radio and RadioButton must be rendered inside a RadioGroup or RadioButtonGroup.",
    );
  }
  return context;
}
