import { useCallback, useState } from "react";

export interface UseControllableValuesParams {
  values: readonly string[] | undefined;
  defaultValues: readonly string[] | undefined;
  onValuesChange?: (values: string[]) => void;
}

const emptyValues: readonly string[] = [];

export function useControllableValues({
  values: controlledValues,
  defaultValues,
  onValuesChange,
}: UseControllableValuesParams): readonly [
  readonly string[],
  (value: string) => void,
] {
  const [internalValues, setInternalValues] = useState(
    defaultValues ?? emptyValues,
  );
  const values = controlledValues ?? internalValues;
  const toggle = useCallback(
    (value: string) => {
      const next = values.includes(value)
        ? values.filter((current) => current !== value)
        : [...values, value];
      if (controlledValues === undefined) {
        setInternalValues(next);
      }
      onValuesChange?.(next);
    },
    [controlledValues, onValuesChange, values],
  );
  return [values, toggle] as const;
}
