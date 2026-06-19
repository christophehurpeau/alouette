import { type ReactNode, useCallback, useState } from "react";
import { Switch as RNSwitch } from "react-native";
import { useThemeToken } from "../../core/useThemeToken";
import { AccentScope, type AccentScopeProps } from "../containers/AccentScope";

export interface SwitchProps {
  accent?: AccentScopeProps["accent"];
  checked?: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
  "aria-labelledby"?: string;
  testID?: string;
}

function useControllableChecked(
  controlled: boolean | undefined,
  onValueChange?: (value: boolean) => void,
): readonly [boolean, (next: boolean) => void] {
  const [internal, setInternal] = useState(controlled ?? false);
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

function SwitchInner({
  checked,
  disabled,
  onValueChange,
  ...props
}: SwitchProps): ReactNode {
  const [value, setValue] = useControllableChecked(checked, onValueChange);
  const [trackBg, thumb, disabledTrackBg, disabledThumb] = useThemeToken([
    "--color-lowered",
    "--color-highlight",
    "--color-disabled-interactive-muted",
    "--color-disabled-muted",
  ]);
  const track = disabled ? disabledTrackBg : trackBg;
  const thumbColor = disabled ? disabledThumb : thumb;
  return (
    <RNSwitch
      value={value}
      disabled={disabled}
      ios_backgroundColor={track}
      trackColor={{ false: track, true: track }}
      thumbColor={thumbColor}
      onValueChange={setValue}
      {...props}
    />
  );
}

export function Switch({ accent, ...rest }: SwitchProps): ReactNode {
  return (
    <AccentScope accent={accent}>
      <SwitchInner {...rest} />
    </AccentScope>
  );
}
