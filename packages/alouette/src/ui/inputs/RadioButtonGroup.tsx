import type { ReactNode } from "react";
import { SegmentedBar } from "../selection/SegmentedBar";
import {
  type SegmentedVariant,
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { RadioContextProvider } from "./RadioContext";

export interface RadioButtonGroupProps extends SelectionGroupProps {
  /** Tightens the horizontal padding so many options fit on one row. */
  compact?: boolean;
  /**
   * `icon` renders the options as square icon-only chips in a pill-shaped bar;
   * each option's `label` stays its accessible name, so an option must carry an
   * `icon`.
   */
  variant?: SegmentedVariant;
}

export function RadioButtonGroup({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  variant,
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
    variant,
  });

  return (
    <RadioContextProvider value={context}>
      <SegmentedBar
        role="radiogroup"
        variant={variant}
        accent={accent}
        {...props}
      >
        {children}
      </SegmentedBar>
    </RadioContextProvider>
  );
}
