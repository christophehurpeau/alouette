import type { RefObject } from "react";
import type { View as RNView } from "react-native";

export interface UseMenuKeyboardParams {
  /**
   * The open menu's element, or null while it is closed. A node rather than a
   * ref: the anchored panel mounts a commit after the menu opens, so an effect
   * keyed on the open state would run before there is anything to focus.
   */
  menuNode: RNView | null;
  triggerRef: RefObject<RNView | null>;
}

/** Web-only: native has no keyboard to rove with. */
export function useMenuKeyboard(_params: UseMenuKeyboardParams): void {
  // Intentionally empty.
}
