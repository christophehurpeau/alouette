import type { ReactNode } from "react";
import {
  type MultiSelectionGroupProps,
  useMultiSelectionValue,
} from "../selection/MultiSelectionContext";
import { SegmentedBar } from "../selection/SegmentedBar";
import type { SegmentedVariant } from "../selection/SelectionContext";
import { CheckboxContextProvider } from "./CheckboxContext";

export interface CheckboxButtonGroupProps extends MultiSelectionGroupProps {
  /** Tightens the horizontal padding so many options fit on one row. */
  compact?: boolean;
  /**
   * `icon` renders the options as square icon-only chips in a pill-shaped bar;
   * each option's `label` stays its accessible name, so an option must carry an
   * `icon`.
   */
  variant?: SegmentedVariant;
}

export function CheckboxButtonGroup({
  values,
  defaultValues,
  onValuesChange,
  accent,
  disabled,
  variant,
  compact,
  children,
  ...props
}: CheckboxButtonGroupProps): ReactNode {
  const context = useMultiSelectionValue({
    values,
    defaultValues,
    onValuesChange,
    disabled,
    compact,
    variant,
  });

  return (
    <CheckboxContextProvider value={context}>
      <SegmentedBar role="group" variant={variant} accent={accent} {...props}>
        {children}
      </SegmentedBar>
    </CheckboxContextProvider>
  );
}
