import type { ViewStyle } from "react-native";
import {
  type SafeAreaEdge,
  allSafeAreaEdges,
  useConsumedSafeAreaEdges,
} from "./SafeAreaEdgesContext";
import { useSafeAreaInsets } from "./useSafeAreaInsets";

/**
 * Safe-area padding a screen-level scroll container adds to its scrolled
 * content: every edge, minus the ones an ancestor `SafeAreaScope` declares
 * consumed, unless `edges` picks them explicitly.
 *
 * Zero-inset edges are left out and an empty result is `undefined` (always the
 * case on web, where `useSafeAreaInsets` is stubbed to zeros), so the caller can
 * leave `contentContainerStyle` untouched: on native an inline style wins over
 * the className, so an inset edge would otherwise override a same-edge padding
 * class even when the device has no such inset.
 */
export function useScreenSafeAreaPadding(
  edges?: readonly SafeAreaEdge[],
): ViewStyle | undefined {
  const insets = useSafeAreaInsets();
  const consumedEdges = useConsumedSafeAreaEdges();
  const appliedEdges =
    edges ?? allSafeAreaEdges.filter((edge) => !consumedEdges.includes(edge));

  const padding: ViewStyle = {};
  if (insets.top > 0 && appliedEdges.includes("top")) {
    padding.paddingTop = insets.top;
  }
  if (insets.bottom > 0 && appliedEdges.includes("bottom")) {
    padding.paddingBottom = insets.bottom;
  }
  if (insets.left > 0 && appliedEdges.includes("left")) {
    padding.paddingLeft = insets.left;
  }
  if (insets.right > 0 && appliedEdges.includes("right")) {
    padding.paddingRight = insets.right;
  }

  return Object.keys(padding).length === 0 ? undefined : padding;
}
