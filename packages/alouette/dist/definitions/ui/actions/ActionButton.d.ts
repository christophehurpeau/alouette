import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import type { MessageVariant } from "../feedback/Message";
import { type ButtonProps } from "./Button";
export interface ActionButtonProps extends Omit<ButtonProps, "onPress" | "state"> {
    onPress: (event: GestureResponderEvent) => unknown;
    errorToMessage: (error: unknown) => string;
    /**
     * Elevation of the failure message. Defaults to the raised "surface"; pass
     * "flat" when the button already sits inside a raised surface.
     */
    errorMessageVariant?: MessageVariant;
}
export declare function ActionButton({ onPress, errorToMessage, errorMessageVariant, ...buttonProps }: ActionButtonProps): ReactNode;
//# sourceMappingURL=ActionButton.d.ts.map