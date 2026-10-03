import {
  type ReactNode,
  type Ref,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import type { View as RNView } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
import { Box } from "../containers/Box";
import { Popover, type PopoverProps } from "../containers/Popover";
import { View } from "../primitives/View";
import { MenuContextProvider } from "./MenuContext";
import { useMenuKeyboard } from "./useMenuKeyboard";

export interface MenuTriggerParams {
  ref: Ref<RNView>;
  onPress: () => void;
  "aria-haspopup": "menu";
  "aria-expanded": boolean;
}

export interface MenuProps {
  /** Renders the pressable that opens the menu; spread the params onto it. */
  render: (params: MenuTriggerParams) => ReactNode;
  /** Names the menu for assistive tech. */
  label: string;
  /**
   * Rendered above the items, outside the `menu` element — an identity row, a
   * section title. A menu owns menu items only, so a loose text node inside it
   * is announced as one.
   */
  header?: ReactNode;
  accent?: Accent;
  /**
   * Which edge of the trigger the panel lines up with — `end` (the default)
   * suits a small trigger at the end of a row, `start` a full-width one.
   * Anchored web only.
   */
  align?: PopoverProps["align"];
  /**
   * `top` opens the panel above the trigger, for one pinned at the bottom of
   * the viewport. Anchored web only.
   */
  side?: PopoverProps["side"];
  /**
   * `content` (the default) sizes the panel to its items, for a trigger
   * narrower than them; `anchor` makes it exactly as wide as a full-width
   * trigger. Anchored web only.
   */
  width?: PopoverProps["width"];
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/**
 * A pressable that opens a list of actions: anchored under its trigger on web,
 * an overlay on native. Prefer it over a row of buttons for actions that are
 * secondary, rare or destructive.
 */
export function Menu({
  render,
  label,
  header,
  accent,
  align = "end",
  side = "bottom",
  width = "content",
  onOpenChange,
  children,
}: MenuProps): ReactNode {
  const triggerRef = useRef<RNView>(null);
  const [menuNode, setMenuNode] = useState<RNView | null>(null);
  const [open, setOpen] = useState(false);

  const setOpenState = useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );
  const close = useCallback(() => {
    setOpenState(false);
  }, [setOpenState]);
  const toggle = useCallback(() => {
    setOpenState(!open);
  }, [open, setOpenState]);

  useMenuKeyboard({ menuNode, triggerRef });

  const contextValue = useMemo(() => ({ close }), [close]);

  return (
    <>
      {render({
        ref: triggerRef,
        onPress: toggle,
        "aria-haspopup": "menu",
        "aria-expanded": open,
      })}
      <Popover
        open={open}
        anchorRef={triggerRef}
        align={align}
        width={width}
        side={side}
        placement="top"
        accent={accent ?? "neutral"}
        onClose={close}
      >
        <View className={side === "top" ? "pb-xxs" : "pt-xxs"}>
          <Box className="surface-popover min-w-[220px]">
            {header === undefined ? null : (
              <View className="px-m py-xs">{header}</View>
            )}
            <MenuContextProvider value={contextValue}>
              <View ref={setMenuNode} role="menu" aria-label={label}>
                {children}
              </View>
            </MenuContextProvider>
          </Box>
        </View>
      </Popover>
    </>
  );
}
