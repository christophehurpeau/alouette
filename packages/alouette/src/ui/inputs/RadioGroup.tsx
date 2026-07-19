import type { ReactNode } from "react";
import { useMemo } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { View } from "../primitives/View";
import { RadioContextProvider } from "./RadioContext";
import { useControllableValue } from "./Select.shared";

export interface RadioGroupProps {
  /** Controlled selected value. */
  value?: string;
  /** Initial value for uncontrolled usage. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  accent?: Accent;
  disabled?: boolean;
  "aria-labelledby"?: string;
  children: ReactNode;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  children,
  ...props
}: RadioGroupProps): ReactNode {
  const [value, onSelect] = useControllableValue(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const context = useMemo(
    () => ({ value, onSelect, disabled }),
    [value, onSelect, disabled],
  );

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
