import type { ReactElement, ReactNode } from "react";
import { twMerge } from "../../core/twMerge";
import { View } from "../primitives/View";
import { Button } from "./Button";

export interface DecisionBarProps {
  /**
   * The action the bar exists for, always rightmost: an `ActionButton` when it
   * runs a promise, a `FormSubmitButton` in a `Form`, a plain `Button` for a
   * synchronous one ("Close", "OK").
   */
  primary: ReactElement;
  /**
   * Another way to end the decision, committing differently from `primary`
   * ("Save draft" beside "Publish"). Rendered between the dismiss action and
   * `primary`. One element: several alternatives belong in a `SplitButton` or
   * a `Menu`.
   */
  alternative?: ReactElement;
  /**
   * Ends the decision without committing — Cancel, Discard, Not now. The bar
   * renders it, leftmost of the row, so a dismissal always looks the same.
   */
  onDismiss?: () => void;
  /** Label of the dismiss action. Defaults to "Cancel". */
  dismissText?: ReactNode;
  /** Disables the dismiss action, e.g. while the primary one is pending. */
  dismissDisabled?: boolean;
  /**
   * Which action carries the button material. "primary" (default) renders
   * the dismiss action as a neutral `soft` text button. "dismiss" renders it
   * neutral `filled`, for an irreversible decision where backing out is the
   * expected answer — pass a `soft` `primary` with it.
   */
  emphasis?: "dismiss" | "primary";
  className?: string;
}

/**
 * The row of actions ending a decision — a dialog's footer, an inline form's
 * Cancel and Save. It owns their order and alignment, so every decision reads
 * the same: right-aligned, dismiss, alternative, then primary.
 */
export function DecisionBar({
  primary,
  alternative,
  onDismiss,
  dismissText,
  dismissDisabled,
  emphasis = "primary",
  className,
}: DecisionBarProps): ReactNode {
  return (
    <View
      className={twMerge(
        "w-full flex-row flex-wrap items-center justify-end gap-m",
        className,
      )}
    >
      {onDismiss === undefined ? null : (
        <Button
          accent="neutral"
          variant={emphasis === "dismiss" ? "filled" : "soft"}
          text={dismissText ?? "Cancel"}
          disabled={dismissDisabled}
          onPress={onDismiss}
        />
      )}
      {alternative}
      {primary}
    </View>
  );
}
