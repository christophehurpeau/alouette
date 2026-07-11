import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { ErrorMessage } from "../feedback/Message";
import { View } from "../primitives/View";
import { VStack } from "../stacks/stacks";
import { Button, type ButtonProps } from "./Button";
import { usePressAsync } from "./usePressAsync";

export interface ActionButtonProps extends Omit<
  ButtonProps,
  "onPress" | "state"
> {
  onPress: (event: GestureResponderEvent) => unknown;
  errorToMessage: (error: unknown) => string;
}

export function ActionButton({
  onPress,
  errorToMessage,
  ...buttonProps
}: ActionButtonProps): ReactNode {
  const { buttonState, error, handlePress } = usePressAsync(onPress);

  return (
    <VStack>
      <Button {...buttonProps} state={buttonState} onPress={handlePress} />
      <View
        className={`overflow-hidden transition-[height,opacity] duration-collapse p-sm ${
          error ? "h-auto opacity-100" : "h-0 opacity-0"
        }`}
      >
        <ErrorMessage size="sm">{errorToMessage(error)}</ErrorMessage>
      </View>
    </VStack>
  );
}
