import type { ReactNode } from "react";

/**
 * React Native's own: `Text` sets it and `View` resets it, so a Text inside an
 * inline View — which breaks native style inheritance — reads false.
 */
export { unstable_TextAncestorContext as TextAncestorContext } from "react-native";

interface TextAncestorScopeProps {
  children: ReactNode;
}

/**
 * React Native's `Text` already provides the context to its children. Never
 * provide it around one: a `Text` that reads `true` renders a virtual text
 * with no host view of its own, so a root Text would draw nothing.
 */
export function TextAncestorScope({
  children,
}: TextAncestorScopeProps): ReactNode {
  return children;
}
