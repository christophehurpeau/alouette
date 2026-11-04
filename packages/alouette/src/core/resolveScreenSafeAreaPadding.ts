import type { ViewStyle } from "react-native";
import type { Writable } from "type-fest";
import { type SafeAreaEdge, allSafeAreaEdges } from "./SafeAreaEdgesContext";

export interface ScreenSafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ResolveScreenSafeAreaPaddingParams {
  insets: ScreenSafeAreaInsets;
  consumedEdges: readonly SafeAreaEdge[];
  topOverlayHeight: number;
  edges?: readonly SafeAreaEdge[];
  /** iOS `contentInsetAdjustmentBehavior="automatic"` already insets them. */
  verticalEdgesAdjustedNatively?: boolean;
}

export function resolveScreenSafeAreaPadding({
  insets,
  consumedEdges,
  topOverlayHeight,
  edges,
  verticalEdgesAdjustedNatively = false,
}: ResolveScreenSafeAreaPaddingParams): ViewStyle | undefined {
  const appliedEdges =
    edges ?? allSafeAreaEdges.filter((edge) => !consumedEdges.includes(edge));
  const overlayApplies = edges === undefined || edges.includes("top");
  const top = Math.max(
    appliedEdges.includes("top") ? insets.top : 0,
    overlayApplies ? topOverlayHeight : 0,
  );

  const padding: Writable<ViewStyle> = {};
  if (!verticalEdgesAdjustedNatively) {
    if (top > 0) {
      padding.paddingTop = top;
    }
    if (insets.bottom > 0 && appliedEdges.includes("bottom")) {
      padding.paddingBottom = insets.bottom;
    }
  }
  if (insets.left > 0 && appliedEdges.includes("left")) {
    padding.paddingLeft = insets.left;
  }
  if (insets.right > 0 && appliedEdges.includes("right")) {
    padding.paddingRight = insets.right;
  }

  return Object.keys(padding).length === 0 ? undefined : padding;
}
