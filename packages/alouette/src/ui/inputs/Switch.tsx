import { type ReactNode, useCallback, useState } from "react";
import { Switch as RNSwitch } from "react-native";
import { useCSSVariable } from "uniwind";
import {
  SemanticScope,
  type SemanticScopeProps,
} from "../containers/SemanticScope";

export interface SwitchProps {
  semanticRole?: SemanticScopeProps["semanticRole"];
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

// TODO(uniwind-themes): Switch colours are wrong on native — the resolved
// CSS variables don't match the Tamagui-era track/thumb tones. Likely the
// same root cause as the global theme issue documented in build-css.ts
// (native vars[theme] map ends up empty for accent themes). Revisit once
// native theme switching is resolved.
function SwitchInner({
  checked,
  disabled,
  onValueChange,
  ...props
}: SwitchProps): ReactNode {
  const [value, setValue] = useControllableChecked(checked, onValueChange);
  const [trackBg, thumb, disabledTrackBg, disabledThumb] = useCSSVariable([
    "--color-lowered",
    "--color-highlight",
    "--color-form-bg-disabled",
    "--color-disabled-muted",
  ]);
  const track = (disabled ? disabledTrackBg : trackBg) as string | undefined;
  const thumbColor = (disabled ? disabledThumb : thumb) as string | undefined;
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

export function Switch({ semanticRole, ...rest }: SwitchProps): ReactNode {
  return (
    <SemanticScope semanticRole={semanticRole}>
      <SwitchInner {...rest} />
    </SemanticScope>
  );
}
