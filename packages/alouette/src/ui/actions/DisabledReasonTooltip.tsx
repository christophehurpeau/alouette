import type { ReactNode } from "react";
import { Tooltip } from "../containers/Tooltip";
import type { TooltipTriggerProps } from "../containers/mergeTooltipTriggerProps";

export interface DisabledReasonTriggerProps extends TooltipTriggerProps {
  disabled?: true;
}

export interface DisabledReasonTooltipProps {
  disabledReason: string | null | undefined;
  render: (triggerProps: DisabledReasonTriggerProps) => ReactNode;
}

export function hasDisabledReason(
  disabledReason: string | null | undefined,
): boolean {
  return disabledReason != null && disabledReason !== "";
}

/**
 * A non-empty `disabledReason` disables the pressable `render` returns and
 * describes it with the reason. The tree is the same with or without one, so
 * the pressable is not remounted when the reason comes and goes. It cannot
 * keep the pressable in the tab order: react-native-web renders it as a
 * `<button>` and sets the native `disabled` attribute whichever prop disables
 * it, and a disabled `<button>` takes no focus.
 */
export function DisabledReasonTooltip({
  disabledReason,
  render,
}: DisabledReasonTooltipProps): ReactNode {
  const disabled = hasDisabledReason(disabledReason);
  return (
    <Tooltip
      content={disabled ? disabledReason : null}
      render={(triggerProps) =>
        render(disabled ? { ...triggerProps, disabled: true } : triggerProps)
      }
    />
  );
}
