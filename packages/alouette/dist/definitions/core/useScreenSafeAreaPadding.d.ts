import type { ViewStyle } from "react-native";
import { type SafeAreaEdge } from "./SafeAreaEdgesContext";
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
export declare function useScreenSafeAreaPadding(edges?: readonly SafeAreaEdge[]): ViewStyle | undefined;
//# sourceMappingURL=useScreenSafeAreaPadding.d.ts.map