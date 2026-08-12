import type { ReactNode } from "react";
import { SegmentedBar } from "../selection/SegmentedBar";
import {
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { RadioContextProvider } from "./RadioContext";

export type RadioButtonGroupProps = SelectionGroupProps;

export function RadioButtonGroup({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  children,
  ...props
}: RadioButtonGroupProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
  });

  return (
    <RadioContextProvider value={context}>
      <SegmentedBar role="radiogroup" accent={accent} {...props}>
        {children}
      </SegmentedBar>
    </RadioContextProvider>
  );
}
