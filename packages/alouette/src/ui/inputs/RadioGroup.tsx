import type { ReactNode } from "react";
import { twMerge } from "../../core/twMerge";
import { AccentScope } from "../containers/AccentScope";
import { View } from "../primitives/View";
import {
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { RadioContextProvider } from "./RadioContext";

export interface RadioGroupProps extends SelectionGroupProps {
  /** The group is as wide as its widest option. In a column, `self-stretch`
   * makes it (and every row) fill its container, as a list in a dialog does;
   * in a row, `flex-1` shares the row's width. */
  className?: string;
}

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  className,
  children,
  ...props
}: RadioGroupProps): ReactNode {
  const context = useSelectionValue({
    value,
    defaultValue,
    onValueChange,
    disabled,
  });

  return (
    <AccentScope accent={accent}>
      <RadioContextProvider value={context}>
        <View
          role="radiogroup"
          className={twMerge("self-start", className)}
          {...props}
        >
          {children}
        </View>
      </RadioContextProvider>
    </AccentScope>
  );
}
