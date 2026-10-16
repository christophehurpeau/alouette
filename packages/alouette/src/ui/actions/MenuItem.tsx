import { CheckRegularIcon } from "alouette-icons/phosphor-icons/Check";
import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { InteractiveIcon } from "../primitives/InteractiveIcon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { useMenuContext } from "./MenuContext";
import { PressableBox, type PressableBoxProps } from "./PressableBox";

// An accented item states its nature in the label itself: the row is a plain
// surface until hovered, and the soft variant's fill is a surface tone, so the
// label keeps its accent color throughout.
const menuItemVariants = tv({
  slots: {
    frame: "flex-row gap-xs rounded-xs px-m min-h-[44px]",
    check: "size-[20px]",
    checkIcon: "text-accent",
    icon: "text-muted",
    label: "flex-1 text-base text-sharp",
    description: "text-sm text-muted",
  },
  variants: {
    accented: {
      true: { icon: "text-accent", label: "text-accent" },
      false: {},
    },
    disabled: {
      true: {
        checkIcon: "text-disabled-muted",
        icon: "text-disabled-muted",
        label: "text-disabled-sharp",
        description: "text-disabled-muted",
      },
      false: {},
    },
    // The check lines up with the label's first line, above the description.
    withDescription: {
      true: {
        frame: "items-start py-xs max-w-[360px]",
        check: "mt-[2px]",
      },
      false: { frame: "items-center" },
    },
  },
  defaultVariants: { accented: false, disabled: false, withDescription: false },
});

export interface MenuItemProps {
  label: string;
  /** What the action does, under the label. */
  description?: string;
  icon?: SVGIconElement;
  /** Replaces `icon` while the row is hovered, focused or pressed. */
  activeIcon?: SVGIconElement;
  /** Colours the row's label and icon — `danger` for a destructive action. */
  accent?: Accent;
  /**
   * Makes the row one choice of a set (`menuitemradio`), checked or not; the
   * check column is kept on every row of the set so the labels line up.
   */
  checked?: boolean;
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
  description,
  icon,
  activeIcon,
  accent,
  checked,
  href,
  disabled,
  onPress,
}: MenuItemProps): ReactNode {
  const { close } = useMenuContext();
  const styles = menuItemVariants({
    accented: accent !== undefined,
    disabled,
    withDescription: description !== undefined,
  });

  const press = (event: GestureResponderEvent): void => {
    onPress?.(event);
    close();
  };

  const labelText = <Text className={styles.label()}>{label}</Text>;

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
        // `menuitemradio` is missing from react-native's Role union;
        // react-native-web forwards it.
        role: (checked === undefined
          ? "menuitem"
          : "menuitemradio") as PressableBoxProps["role"],
        "aria-checked": checked,
        // A disabled Pressable never sees the press, so dropping the href is
        // the only thing that stops the browser from following the link anyway.
        href: disabled === true ? undefined : href,
        "aria-disabled": disabled === true,
        onPress: press,
      }}
    >
      {checked === undefined ? null : (
        <View className={styles.check()}>
          {checked ? (
            <Icon
              icon={<CheckRegularIcon />}
              size={20}
              className={styles.checkIcon()}
            />
          ) : null}
        </View>
      )}
      {icon ? (
        <InteractiveIcon
          icon={icon}
          activeIcon={activeIcon}
          disabled={disabled === true}
          size={20}
          className={styles.icon()}
        />
      ) : null}
      {description === undefined ? (
        labelText
      ) : (
        <View className="flex-1 gap-xxs">
          {labelText}
          <Text className={styles.description()}>{description}</Text>
        </View>
      )}
    </PressableBox>
  );
}
