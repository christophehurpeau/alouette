import { createMultiSelectionContext } from "../selection/MultiSelectionContext";

export const {
  MultiSelectionContextProvider: CheckboxContextProvider,
  useMultiSelection: useCheckboxContext,
  useOptionalMultiSelection: useOptionalCheckboxContext,
} = createMultiSelectionContext(
  "CheckboxButton and CheckboxCard must be rendered inside a CheckboxGroup, CheckboxButtonGroup or CheckboxCardGroup.",
);
