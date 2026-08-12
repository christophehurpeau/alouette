import type { ReactNode } from "react";
import { AccentScope } from "../containers/AccentScope";
import { View } from "../primitives/View";
import {
  type SelectionGroupProps,
  useSelectionValue,
} from "../selection/SelectionContext";
import { RadioContextProvider } from "./RadioContext";

export type RadioGroupProps = SelectionGroupProps;

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  accent,
  disabled,
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
        <View role="radiogroup" {...props}>
          {children}
        </View>
      </RadioContextProvider>
    </AccentScope>
  );
}
