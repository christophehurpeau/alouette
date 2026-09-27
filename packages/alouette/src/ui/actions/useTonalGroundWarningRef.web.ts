import {
  type ForwardedRef,
  type RefCallback,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type { View as RNView } from "react-native";
import type { TonalGroundWarningParams } from "./useTonalGroundWarningRef";

export type { TonalGroundWarningParams } from "./useTonalGroundWarningRef";

// Only a zero alpha channel: `rgba(r, g, b, 0)` or `… / 0)`, never an opaque
// `rgb(255, 200, 0)` whose blue channel happens to be 0.
const transparentAlpha = /^rgba\((?:[^,]*,){3}\s*0\)$|\/\s*0\)$/;

const isTransparent = (color: string): boolean =>
  color === "" || color === "transparent" || transparentAlpha.test(color);

function findGroundBehind(element: HTMLElement): string | undefined {
  for (
    let ancestor = element.parentElement;
    ancestor;
    ancestor = ancestor.parentElement
  ) {
    const color = getComputedStyle(ancestor).backgroundColor;
    if (!isTransparent(color)) return color;
  }
  return undefined;
}

function warnIfOnOwnGround(element: HTMLElement): void {
  const ground = getComputedStyle(element).backgroundColor;
  if (isTransparent(ground) || ground !== findGroundBehind(element)) return;
  console.warn(
    `[Alouette] A tonal pressable rests on its own ground (${ground}), so it dissolves into the surface behind it. On an accented surface pass accent="neutral"; on a neutral one use variant="soft" (or variant="filled").`,
  );
}

/**
 * Forwards `ref`, and warns outside production when a `tonal` pressable rests
 * on the very ground it is painted with, so that only its shadow still sets it
 * apart: an accented one on its own accented surface in light mode, a neutral
 * one on a white `bg-highlight` panel.
 *
 * The returned callback depends on `ref` alone, as passing `ref` straight
 * through would: a state change (disabled, loading) re-runs the check without
 * detaching and re-attaching the caller's ref.
 */
export function useTonalGroundWarningRef(
  ref: ForwardedRef<RNView>,
  { variant, disabled, forced }: TonalGroundWarningParams,
): RefCallback<RNView> {
  const elementRef = useRef<HTMLElement | null>(null);
  const isTonalAtRest =
    (variant ?? "tonal") === "tonal" && !disabled && !forced;

  useEffect(() => {
    if (process.env.NODE_ENV === "production" || !isTonalAtRest) return;
    if (elementRef.current) warnIfOnOwnGround(elementRef.current);
  }, [isTonalAtRest]);

  return useCallback(
    (node: RNView | null) => {
      elementRef.current = node as unknown as HTMLElement | null;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );
}
