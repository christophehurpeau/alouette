import { createSelectionContext } from "../selection/SelectionContext";

export const {
  SelectionContextProvider: RadioContextProvider,
  useSelection: useRadioContext,
} = createSelectionContext(
  "Radio, RadioButton and RadioCard must be rendered inside a RadioGroup, RadioButtonGroup or RadioCardGroup.",
);
