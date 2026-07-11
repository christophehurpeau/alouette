import { useEffect, useReducer, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import type { ButtonState } from "./Button";

export const settledDisplayDurationMs = 4000;

interface PressAsyncState {
  buttonState: ButtonState | undefined;
  error: Error | null;
}

type PressAsyncAction =
  | { type: "reject"; error: Error }
  | { type: "resolve" }
  | { type: "settledTimeout" }
  | { type: "start" };

const idleState: PressAsyncState = { buttonState: undefined, error: null };

function pressAsyncReducer(
  previousState: PressAsyncState,
  action: PressAsyncAction,
): PressAsyncState {
  switch (action.type) {
    case "start":
      return { buttonState: "loading", error: null };
    case "resolve":
      return { buttonState: "success", error: null };
    case "reject":
      return { buttonState: "failed", error: action.error };
    case "settledTimeout":
      return { buttonState: undefined, error: previousState.error };
    default:
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
  }
}

export interface UsePressAsyncResult extends PressAsyncState {
  handlePress: (event: GestureResponderEvent) => void;
}

export function usePressAsync(
  onPress: (event: GestureResponderEvent) => unknown,
): UsePressAsyncResult {
  const [pressAsyncState, dispatch] = useReducer(pressAsyncReducer, idleState);
  const settledTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      clearTimeout(settledTimerRef.current);
    };
  }, []);

  function handlePress(event: GestureResponderEvent): void {
    if (pressAsyncState.buttonState === "loading") return;
    clearTimeout(settledTimerRef.current);
    const result = onPress(event);
    if (!(result instanceof Promise)) return;
    dispatch({ type: "start" });

    function scheduleSettledTimeout(): void {
      settledTimerRef.current = setTimeout(() => {
        dispatch({ type: "settledTimeout" });
      }, settledDisplayDurationMs);
    }

    result
      .then(() => {
        dispatch({ type: "resolve" });
        scheduleSettledTimeout();
      })
      .catch((caughtError: unknown) => {
        const normalizedError =
          caughtError instanceof Error
            ? caughtError
            : new Error(String(caughtError));
        // eslint-disable-next-line no-console
        console.error(
          "Unexpected error caught in ActionButton",
          normalizedError,
        );
        dispatch({ type: "reject", error: normalizedError });
        scheduleSettledTimeout();
      });
  }

  return { ...pressAsyncState, handlePress };
}
