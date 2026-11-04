import type { ViewStyle } from "react-native";
import {
  type SafeAreaEdge,
  useConsumedSafeAreaEdges,
  useSafeAreaTopOverlayHeight,
} from "./SafeAreaEdgesContext";
import { resolveScreenSafeAreaPadding } from "./resolveScreenSafeAreaPadding";
import { useSafeAreaInsets } from "./useSafeAreaInsets";

export function useResolvedScreenSafeAreaPadding(
  edges: readonly SafeAreaEdge[] | undefined,
  verticalEdgesAdjustedNatively: boolean,
): ViewStyle | undefined {
  return resolveScreenSafeAreaPadding({
    insets: useSafeAreaInsets(),
    consumedEdges: useConsumedSafeAreaEdges(),
    topOverlayHeight: useSafeAreaTopOverlayHeight(),
    edges,
    verticalEdgesAdjustedNatively,
  });
}

/**
 * Safe-area padding a screen-level scroll container adds to its scrolled
 * content: every edge, minus the ones an ancestor `SafeAreaScope` declares
 * consumed, unless `edges` picks them explicitly. The top is at least the
 * scope's `topOverlayHeight` (a transparent header laid over the content).
 *
 * Zero-inset edges are left out and an empty result is `undefined` (always the
 * case on web, where `useSafeAreaInsets` is stubbed to zeros), so the caller can
 * leave `contentContainerStyle` untouched: on native an inline style wins over
 * the className, so an inset edge would otherwise override a same-edge padding
 * class even when the device has no such inset.
 *
 * It knows nothing of a native header that is not declared through
 * `topOverlayHeight`: the `Screen*` containers rely on iOS for that, which a
 * custom container can do with `contentInsetAdjustmentBehavior="automatic"`.
 */
export function useScreenSafeAreaPadding(
  edges?: readonly SafeAreaEdge[],
): ViewStyle | undefined {
  return useResolvedScreenSafeAreaPadding(edges, false);
}
