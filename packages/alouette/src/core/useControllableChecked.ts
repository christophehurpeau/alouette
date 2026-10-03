import { useCallback, useState } from "react";

export interface UseControllableCheckedParams {
  checked: boolean | undefined;
  defaultChecked?: boolean;
  onValueChange?: (value: boolean) => void;
}

export function useControllableChecked({
  checked: controlled,
  defaultChecked,
  onValueChange,
}: UseControllableCheckedParams): readonly [boolean, (next: boolean) => void] {
  const [internal, setInternal] = useState(
    defaultChecked ?? controlled ?? false,
  );
  const value = controlled ?? internal;
  const onChange = useCallback(
    (next: boolean) => {
      if (controlled === undefined) {
        setInternal(next);
      }
      if (next !== value) {
        onValueChange?.(next);
      }
    },
    [controlled, onValueChange, value],
  );
  return [value, onChange] as const;
}
