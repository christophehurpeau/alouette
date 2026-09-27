import { createMultiSelectionContext } from "../selection/MultiSelectionContext";

export const {
  MultiSelectionContextProvider: CheckboxContextProvider,
  useMultiSelection: useCheckboxContext,
  useOptionalMultiSelection: useOptionalCheckboxContext,
} = createMultiSelectionContext(
  "CheckboxCard must be rendered inside a CheckboxGroup or CheckboxCardGroup.",
);
