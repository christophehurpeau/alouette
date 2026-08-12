import { createSelectionContext } from "../selection/SelectionContext";

export const {
  SelectionContextProvider: RadioContextProvider,
  useSelection: useRadioContext,
} = createSelectionContext(
  "Radio and RadioButton must be rendered inside a RadioGroup or RadioButtonGroup.",
);
