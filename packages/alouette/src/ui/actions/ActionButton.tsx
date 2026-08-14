import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import type { MessageVariant } from "../feedback/Message";
import { VStack } from "../stacks/stacks";
import { Button, type ButtonProps } from "./Button";
import { CollapsibleErrorMessage } from "./CollapsibleErrorMessage";
import { usePressAsync } from "./usePressAsync";

export interface ActionButtonProps extends Omit<
  ButtonProps,
  "onPress" | "state"
> {
  onPress: (event: GestureResponderEvent) => unknown;
  errorToMessage: (error: unknown) => string;
  /**
   * Elevation of the failure message. Defaults to the raised "surface"; pass
   * "flat" when the button already sits inside a raised surface.
   */
  errorMessageVariant?: MessageVariant;
}

export function ActionButton({
  onPress,
  errorToMessage,
  errorMessageVariant,
  ...buttonProps
}: ActionButtonProps): ReactNode {
  const { buttonState, error, handlePress } = usePressAsync(onPress);

  return (
    <VStack className="shrink">
      <Button {...buttonProps} state={buttonState} onPress={handlePress} />
      <CollapsibleErrorMessage
        error={error}
        errorToMessage={errorToMessage}
        variant={errorMessageVariant}
      />
    </VStack>
  );
}
