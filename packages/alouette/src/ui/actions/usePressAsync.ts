import { useEffect, useReducer, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import type { ButtonState } from "./Button";

export const settledDisplayDurationMs = 4000;

interface PressAsyncState {
  buttonState: ButtonState | undefined;
  error: Error | null;
}

type PressAsyncAction =
  | { type: "pending" }
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
    case "pending":
      return idleState;
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
  const settledTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pendingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(loadingTimerRef.current);
      clearTimeout(settledTimerRef.current);
    };
  }, []);

  function handlePress(event: GestureResponderEvent): void {
    if (pendingRef.current) return;
    clearTimeout(settledTimerRef.current);
    const result = onPress(event);
    if (!(result instanceof Promise)) return;
    pendingRef.current = true;
    dispatch({ type: "pending" });
    // Let the current microtask queue finish first. Synchronous work wrapped
    // in a Promise (including field validation) needs no loading indicator.
    loadingTimerRef.current = setTimeout(() => {
      dispatch({ type: "start" });
    }, 0);

    function finishPending(): boolean {
      pendingRef.current = false;
      clearTimeout(loadingTimerRef.current);
      return mountedRef.current;
    }

    function scheduleSettledTimeout(): void {
      settledTimerRef.current = setTimeout(() => {
        dispatch({ type: "settledTimeout" });
      }, settledDisplayDurationMs);
    }

    result
      .then(() => {
        if (!finishPending()) return;
        dispatch({ type: "resolve" });
        scheduleSettledTimeout();
      })
      .catch((caughtError: unknown) => {
        if (!finishPending()) return;
        const normalizedError =
          caughtError instanceof Error
            ? caughtError
            : new Error(String(caughtError));
        // oxlint-disable-next-line no-console
        console.error(
          "Unexpected error caught in usePressAsync",
          normalizedError,
        );
        dispatch({ type: "reject", error: normalizedError });
        scheduleSettledTimeout();
      });
  }

  return { ...pressAsyncState, handlePress };
}
