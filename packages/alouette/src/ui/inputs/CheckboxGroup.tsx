import type { ReactNode } from "react";
import { AccentScope } from "../containers/AccentScope";
import { View } from "../primitives/View";
import {
  type MultiSelectionGroupProps,
  useMultiSelectionValue,
} from "../selection/MultiSelectionContext";
import { CheckboxContextProvider } from "./CheckboxContext";

export type CheckboxGroupProps = MultiSelectionGroupProps;

export function CheckboxGroup({
  values,
  defaultValues,
  onValuesChange,
  accent,
  disabled,
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
        <View role="group" {...props}>
          {children}
        </View>
      </CheckboxContextProvider>
    </AccentScope>
  );
}
