import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { useMenuContext } from "./MenuContext";
import { PressableBox } from "./PressableBox";

// An accented item states its nature in the label itself: the row is a plain
// surface until hovered, and the soft variant's fill is a surface tone, so the
// label keeps its accent color throughout.
const menuItemVariants = tv({
  slots: {
    frame: "flex-row items-center gap-xs rounded-xs px-m min-h-[44px]",
    icon: "text-muted",
    label: "flex-1 text-base text-sharp",
  },
  variants: {
    accented: {
      true: { icon: "text-accent", label: "text-accent" },
      false: {},
    },
    disabled: {
      true: { icon: "text-disabled-muted", label: "text-disabled-sharp" },
      false: {},
    },
  },
  defaultVariants: { accented: false, disabled: false },
});

export interface MenuItemProps {
  label: string;
  icon?: SVGIconElement;
  /** Colours the row's label and icon — `danger` for a destructive action. */
  accent?: Accent;
  /**
   * Destination. Renders a real `<a href>` on web (native ignores it); expo
   * Router's `<Link asChild>` injects it together with `onPress`.
   */
  href?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

/** One action of a {@link Menu}. Pressing it runs `onPress` and closes the menu. */
export function MenuItem({
  label,
  icon,
  accent,
  href,
  disabled,
  onPress,
}: MenuItemProps): ReactNode {
  const { close } = useMenuContext();
  const styles = menuItemVariants({
    accented: accent !== undefined,
    disabled,
  });

  const press = (event: GestureResponderEvent): void => {
    onPress?.(event);
    close();
  };

  return (
    <PressableBox
      variant="soft"
      // The focus follows the pointer over the open menu, and the row's fill
      // already shows where the cursor is; an outline would ring every row the
      // mouse crosses.
      withFocusVisibleOutline={false}
      accent={accent}
      className={styles.frame()}
      disabled={disabled}
      // Spread, not written as props: react-native's Pressable types have no
      // href, while react-native-web forwards it as a real anchor.
      {...{
        role: "menuitem",
        // A disabled Pressable never sees the press, so dropping the href is
        // the only thing that stops the browser from following the link anyway.
        href: disabled === true ? undefined : href,
        "aria-disabled": disabled === true,
        onPress: press,
      }}
    >
      {icon ? <Icon icon={icon} size={20} className={styles.icon()} /> : null}
      <Text className={styles.label()}>{label}</Text>
    </PressableBox>
  );
}
