import type { ReactNode } from "react";
import type { TooltipTriggerProps } from "./mergeTooltipTriggerProps";

export interface TooltipProps {
  /**
   * Plain text, since native reads it as the trigger's accessibility hint.
   * `null` or empty renders the trigger alone, in the same tree, so toggling
   * it never remounts the trigger.
   */
  content: string | null | undefined;
  render: (triggerProps: TooltipTriggerProps) => ReactNode;
}

/**
 * Describes the element `render` returns. Web shows `content` in a panel next
 * to it on hover and keyboard focus; native has no hover, so it only announces
 * `content` as the element's accessibility hint. Nesting tooltips around one
 * element is not supported.
 */
export function Tooltip({ content, render }: TooltipProps): ReactNode {
  return render(content ? { accessibilityHint: content } : {});
}
