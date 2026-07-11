import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { type ButtonProps } from "./Button";
export interface ActionButtonProps extends Omit<ButtonProps, "onPress" | "state"> {
    onPress: (event: GestureResponderEvent) => unknown;
    errorToMessage: (error: unknown) => string;
}
export declare function ActionButton({ onPress, errorToMessage, ...buttonProps }: ActionButtonProps): ReactNode;
//# sourceMappingURL=ActionButton.d.ts.map