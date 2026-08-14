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

  // Collapsed, the message is taken out of the flow rather than merely zero-
  // height: an in-flow child would still lend the stack its own intrinsic
  // width, sizing the button to the width of a message nobody can see — and in
  // a row (a modal footer) that width squeezes the sibling buttons.
  return (
    <VStack className="shrink">
      <Button {...buttonProps} state={buttonState} onPress={handlePress} />
      <View
        className={`overflow-hidden transition-[height,opacity] duration-collapse ${
          error ? "p-sm h-auto opacity-100" : "absolute h-0 opacity-0"
        }`}
      >
        <ErrorMessage size="sm">{errorToMessage(error)}</ErrorMessage>
      </View>
    </VStack>
  );
}
