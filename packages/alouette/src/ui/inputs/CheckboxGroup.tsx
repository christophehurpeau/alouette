import type { ReactNode } from "react";
import { twMerge } from "../../core/twMerge";
import { AccentScope } from "../containers/AccentScope";
import { View } from "../primitives/View";
import {
  type MultiSelectionGroupProps,
  useMultiSelectionValue,
} from "../selection/MultiSelectionContext";
import { CheckboxContextProvider } from "./CheckboxContext";

export interface CheckboxGroupProps extends MultiSelectionGroupProps {
  /** The group is as wide as its widest option; `self-stretch` makes it (and
   * every row) fill its container, as a list in a dialog does. */
  className?: string;
}

export function CheckboxGroup({
  values,
  defaultValues,
  onValuesChange,
  accent,
  disabled,
  className,
  children,
  ...props
}: CheckboxGroupProps): ReactNode {
  const context = useMultiSelectionValue({
    values,
    defaultValues,
    onValuesChange,
    disabled,
  });

  return (
    <AccentScope accent={accent}>
      <CheckboxContextProvider value={context}>
        <View
          role="group"
          className={twMerge("self-start", className)}
          {...props}
        >
          {children}
        </View>
      </CheckboxContextProvider>
    </AccentScope>
  );
}
