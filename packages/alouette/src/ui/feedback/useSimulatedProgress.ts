import { useEffect, useState } from "react";
import { animationDurationsMs } from "../../animationDurationsMs";

const startDelayMs = 100;
const stepIntervalMs = 500;
const completeDelayMs = 500;
const resetDelayMs = 1000;

/**
 * Time from `loading` going false until the ring has finished completing to
 * 100% and faded out — how long a consumer must keep the component mounted
 * to see the finish animation instead of cutting it off.
 */
export const indeterminateExitDurationMs =
  resetDelayMs + animationDurationsMs.fade;

const random = (): number => Math.ceil(Math.random() * 100) / 100;

/**
 * Advances toward 100 in decreasing increments so the bar appears to slow
 * down as it approaches completion, without ever reaching it on its own
 * (e.g. ~20% at 100ms, ~40% at 1s, ~60% at 2s, ~80% at 3s).
 */
function nextSimulatedProgress(progress: number): number {
  if (progress < 60) return progress + random() * 10 + 5;
  if (progress < 70) return progress + random() * 10 + 3;
  if (progress < 80) return progress + random() + 5;
  if (progress < 90) return progress + random() + 1;
  if (progress < 95) return progress + 0.1;
  return progress;
}

export function useSimulatedProgress(loading: boolean): {
  progress: number;
  hidden: boolean;
} {
  const [progress, setProgress] = useState(1);
  const [hidden, setHidden] = useState(!loading);

  useEffect(() => {
    if (!loading) return undefined;

    setHidden(false);
    const startTimer = setTimeout(() => {
      setProgress(20);
    }, startDelayMs);
    const stepTimer = setInterval(() => {
      setProgress(nextSimulatedProgress);
    }, stepIntervalMs);

    return () => {
      clearTimeout(startTimer);
      clearInterval(stepTimer);
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return undefined;

    const completeTimer = setTimeout(() => {
      setProgress(100);
    }, completeDelayMs);
    const resetTimer = setTimeout(() => {
      setHidden(true);
      setProgress(1);
    }, resetDelayMs);

    return () => {
      clearTimeout(completeTimer);
      clearTimeout(resetTimer);
    };
  }, [loading]);

  return { progress, hidden };
}
