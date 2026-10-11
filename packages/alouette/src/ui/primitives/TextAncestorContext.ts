/**
 * React Native's own: `Text` sets it and `View` resets it, so a Text inside an
 * inline View — which breaks native style inheritance — reads false.
 */

export { unstable_TextAncestorContext as TextAncestorContext } from "react-native";
