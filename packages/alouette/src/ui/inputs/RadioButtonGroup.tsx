import type { ReactNode } from "react";
import { SegmentedBar } from "../selection/SegmentedBar";
import {
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { RadioContextProvider } from "./RadioContext";

export interface RadioButtonGroupProps extends SelectionGroupProps {
  /** Tightens the horizontal padding so many options fit on one row. */
  compact?: boolean;
}

export function RadioButtonGroup({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  compact,
  children,
  ...props
}: RadioButtonGroupProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
    compact,
  });

  return (
    <RadioContextProvider value={context}>
      <SegmentedBar role="radiogroup" accent={accent} {...props}>
        {children}
      </SegmentedBar>
    </RadioContextProvider>
  );
}
