import type { GestureResponderEvent } from "react-native";
import type { ButtonState } from "./Button";
export declare const settledDisplayDurationMs = 4000;
interface PressAsyncState {
    buttonState: ButtonState | undefined;
    error: Error | null;
}
export interface UsePressAsyncResult extends PressAsyncState {
    handlePress: (event: GestureResponderEvent) => void;
}
export declare function usePressAsync(onPress: (event: GestureResponderEvent) => unknown): UsePressAsyncResult;
export {};
//# sourceMappingURL=usePressAsync.d.ts.map