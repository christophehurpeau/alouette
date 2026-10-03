import type { ReactNode } from "react";
import { Switch as RNSwitch } from "react-native";
import { useColorVariable } from "../../core/useColorToken";
import { useControllableChecked } from "../../core/useControllableChecked";
import { AccentScope, type AccentScopeProps } from "../containers/AccentScope";

export interface SwitchProps {
  accent?: AccentScopeProps["accent"];
  checked?: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
  "aria-labelledby"?: string;
  testID?: string;
}

function SwitchInner({
  checked,
  disabled,
  onValueChange,
  ...props
}: SwitchProps): ReactNode {
  const [value, setValue] = useControllableChecked({ checked, onValueChange });
  const trackBg = useColorVariable("--color-lowered");
  const thumb = useColorVariable("--color-highlight");
  const disabledTrackBg = useColorVariable(
    "--color-disabled-interactive-muted",
  );
  const disabledThumb = useColorVariable("--color-disabled-muted");
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
