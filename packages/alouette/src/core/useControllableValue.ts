import { useCallback, useState } from "react";

export interface UseControllableValueParams {
  value: string | undefined;
  defaultValue: string | undefined;
  onValueChange?: (value: string) => void;
}

export function useControllableValue({
  value: controlledValue,
  defaultValue,
  onValueChange,
}: UseControllableValueParams): readonly [
  string | undefined,
  (next: string) => void,
] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const setValue = useCallback(
    (next: string) => {
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
