import { useEffect } from "react";
import type { UseMenuKeyboardParams } from "./useMenuKeyboard";

const enabledItemSelector = '[role="menuitem"]:not([aria-disabled="true"])';

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
export function useMenuKeyboard({
  menuNode,
  triggerRef,
}: UseMenuKeyboardParams): void {
  useEffect(() => {
    const menu = menuNode as HTMLElement | null;
    if (!menu) return undefined;
    // The trigger outlives the panel, so the element to hand the focus back to
    // is the one that was there when the menu opened.
    const trigger = triggerRef.current as HTMLElement | null;

    const readItems = (): HTMLElement[] => [
      ...menu.querySelectorAll<HTMLElement>(enabledItemSelector),
    ];
    const focusItem = (index: number): void => {
      const items = readItems();
      if (items.length === 0) return;
      items[(index + items.length) % items.length]?.focus();
    };

    focusItem(0);

    const onKeyDown = (event: KeyboardEvent): void => {
      const items = readItems();
      const current = items.indexOf(document.activeElement as HTMLElement);
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusItem(current + 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          focusItem(current - 1);
          break;
        case "Home":
          event.preventDefault();
          focusItem(0);
          break;
        case "End":
          event.preventDefault();
          focusItem(items.length - 1);
          break;
        default:
          break;
      }
    };

    // The pointer moves the roving focus too: the focused row is painted, so a
    // hovered item would otherwise light up next to the one holding the focus.
    const onMouseOver = (event: MouseEvent): void => {
      const item = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        enabledItemSelector,
      );
      if (item && item !== document.activeElement) item.focus();
    };

    menu.addEventListener("keydown", onKeyDown);
    menu.addEventListener("mouseover", onMouseOver);
    return () => {
      menu.removeEventListener("keydown", onKeyDown);
      menu.removeEventListener("mouseover", onMouseOver);
      // Only when the menu still holds the focus (or already lost it to the
      // body as its panel went away): a press that lands on another control
      // closes the menu too, and that control keeps what it was given.
      const active = document.activeElement;
      if (
        active === null ||
        active === document.body ||
        menu.contains(active)
      ) {
        trigger?.focus();
      }
    };
  }, [menuNode, triggerRef]);
}
