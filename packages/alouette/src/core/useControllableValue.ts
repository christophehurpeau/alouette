import { useCallback, useState } from "react";

export interface UseControllableValueParams<TValue extends string> {
  value: TValue | undefined;
  defaultValue: TValue | undefined;
  onValueChange?: (value: TValue) => void;
}

export function useControllableValue<TValue extends string = string>({
  value: controlledValue,
  defaultValue,
  onValueChange,
}: UseControllableValueParams<TValue>): readonly [
  TValue | undefined,
  (next: TValue) => void,
] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const setValue = useCallback(
    (next: TValue) => {
      if (controlledValue === undefined) {
        setInternalValue(next);
      }
      if (next !== value) {
        onValueChange?.(next);
      }
    },
    [controlledValue, onValueChange, value],
  );
  return [value, setValue] as const;
}
