import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { settledDisplayDurationMs, usePressAsync } from "./usePressAsync.ts";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it("does not load for synchronous handlers or promises settled within the microtask queue", async () => {
  vi.useFakeTimers();
  for (const onPress of [
    () => {},
    () => Promise.resolve(),
    async () => {
      await Promise.resolve();
      await Promise.resolve();
    },
  ]) {
    const states: unknown[] = [];
    const { result, unmount } = renderHook(() => {
      const action = usePressAsync(onPress);
      states.push(action.buttonState);
      return action;
    });
    await act(async () => {
      result.current.handlePress({} as never);
      await Promise.resolve();
    });
    await act(() => vi.advanceTimersByTime(0));
    expect(states).not.toContain("loading");
    unmount();
  }
});

it("reports an immediate rejection without loading", async () => {
  vi.useFakeTimers();
  vi.spyOn(console, "error").mockImplementation(() => {});
  const error = new Error("Invalid value");
  const states: unknown[] = [];
  const { result } = renderHook(() => {
    const action = usePressAsync(() => Promise.reject(error));
    states.push(action.buttonState);
    return action;
  });
  await act(async () => {
    result.current.handlePress({} as never);
    await Promise.resolve();
  });
  await act(() => vi.advanceTimersByTime(0));
  expect(states).not.toContain("loading");
  expect(result.current.error).toBe(error);
  expect(result.current.buttonState).toBe("failed");
});

it("blocks duplicate presses before loading, loads pending work, and clears its success state", async () => {
  vi.useFakeTimers();
  let resolve!: () => void;
  const pending = new Promise<void>((resolvePromise) => {
    resolve = resolvePromise;
  });
  const onPress = vi.fn(() => pending);
  const { result } = renderHook(() => usePressAsync(onPress));

  await act(async () => {
    result.current.handlePress({} as never);
    result.current.handlePress({} as never);
    await Promise.resolve();
  });
  expect(onPress).toHaveBeenCalledTimes(1);
  expect(result.current.buttonState).toBeUndefined();
  await act(() => vi.advanceTimersByTime(0));
  expect(result.current.buttonState).toBe("loading");
  await act(async () => {
    result.current.handlePress({} as never);
    await Promise.resolve();
  });
  expect(onPress).toHaveBeenCalledTimes(1);

  await act(async () => {
    resolve();
    await Promise.resolve();
  });
  expect(result.current.buttonState).toBe("success");
  await act(() => vi.advanceTimersByTime(settledDisplayDurationMs));
  expect(result.current.buttonState).toBeUndefined();
});

it("cleans up the loading timer and does not schedule more timers after unmount", async () => {
  vi.useFakeTimers();
  let resolve!: () => void;
  const pending = new Promise<void>((resolvePromise) => {
    resolve = resolvePromise;
  });
  const { result, unmount } = renderHook(() => usePressAsync(() => pending));
  await act(async () => {
    result.current.handlePress({} as never);
    await Promise.resolve();
  });
  unmount();
  expect(vi.getTimerCount()).toBe(0);
  await act(async () => {
    resolve();
    await Promise.resolve();
  });
  expect(vi.getTimerCount()).toBe(0);
});
