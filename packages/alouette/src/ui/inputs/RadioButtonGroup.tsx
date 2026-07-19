import type { ReactNode } from "react";
import { useMemo } from "react";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { Surface } from "../containers/Surface";
import { RadioContextProvider } from "./RadioContext";
import { useControllableValue } from "./Select.shared";

export interface RadioButtonGroupProps {
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

export function RadioButtonGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  accent,
  disabled,
  children,
  ...props
}: RadioButtonGroupProps): ReactNode {
  const [value, onSelect] = useControllableValue(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const context = useMemo(
    () => ({ value, onSelect, disabled }),
    [value, onSelect, disabled],
  );

  // The lowered track is a 44px Surface with no vertical padding, so each
  // RadioButton pressable fills the full height (a 44px tap target) while
  // rendering a shorter visible chip inside it.
  return (
    <AccentScope accent={accent}>
      <RadioContextProvider value={context}>
        <Surface
          variant="lowered"
          role="radiogroup"
          size="sm"
          className="flex-row items-stretch self-start gap-xxs px-xs py-0 min-h-[44px]"
          {...props}
        >
          {children}
        </Surface>
      </RadioContextProvider>
    </AccentScope>
  );
}
