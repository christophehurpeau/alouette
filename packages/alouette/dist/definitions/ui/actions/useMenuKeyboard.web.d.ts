import type { UseMenuKeyboardParams } from "./useMenuKeyboard";
/**
 * Roving focus over the open menu's items: the first one takes focus when the
 * menu opens, the arrow keys and Home/End move between them, the pointer moves
 * it as it goes over a row, and the trigger takes focus back on close. Escape
 * and outside presses are `Popover`'s.
 *
 * The listener goes on the menu element itself rather than through props: a
 * react-native-web `View` forwards no `onKeyDown`, and the node is already there
 * to anchor the roving focus.
 */
export declare function useMenuKeyboard({ menuNode, triggerRef, }: UseMenuKeyboardParams): void;
//# sourceMappingURL=useMenuKeyboard.web.d.ts.map