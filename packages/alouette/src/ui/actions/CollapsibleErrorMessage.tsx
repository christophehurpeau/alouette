import type { ReactNode } from "react";
import { ErrorMessage, type MessageVariant } from "../feedback/Message";
import { View } from "../primitives/View";

export interface CollapsibleErrorMessageProps {
  error: Error | null;
  errorToMessage: (error: unknown) => string;
  /** Forwarded to the message: "flat" when the caller is inside a surface. */
  variant?: MessageVariant;
}

// Collapsed, the message is taken out of the flow rather than merely zero-
// height: an in-flow child would still lend its parent its own intrinsic width,
// sizing a button to the width of a message nobody can see — and in a row (a
// modal footer) that width squeezes the sibling buttons.
export function CollapsibleErrorMessage({
  error,
  errorToMessage,
  variant,
}: CollapsibleErrorMessageProps): ReactNode {
  return (
    <View
      role="alert"
      className={`overflow-hidden transition-[height,opacity] duration-collapse ${
        error ? "p-sm h-auto opacity-100" : "absolute h-0 opacity-0"
      }`}
    >
      {/* Mounted empty rather than filled-and-hidden: a live region only
          announces content added after it exists, and `errorToMessage` is never
          called with a null error. */}
      {error === null ? null : (
        <ErrorMessage size="sm" variant={variant}>
          {errorToMessage(error)}
        </ErrorMessage>
      )}
    </View>
  );
}
