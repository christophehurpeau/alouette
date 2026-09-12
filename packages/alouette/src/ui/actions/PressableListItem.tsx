import { CaretRightRegularIcon } from "alouette-icons/phosphor-icons/CaretRightRegularIcon";
import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { View } from "react-native";
import { tv } from "tailwind-variants";
import { Icon } from "../primitives/Icon";
import { PressableBox, type PressableBoxProps } from "./PressableBox";

const pressableListItemVariants = tv(
  {
    slots: {
      row: "flex-row items-center justify-between rounded-sm mx-xs my-xxs px-m py-m",
      content: "flex-1",
      actions: "flex-row items-center flex-wrap gap-xs mt-xs",
      caretContainer: "justify-center",
      caret: "",
    },
    variants: {
      variant: {
        contained: { caret: "text-on-accent-muted" },
        list: { caret: "text-on-list" },
        outlined: { caret: "text-muted" },
        ghost: { caret: "text-muted" },
      },
    },
    defaultVariants: { variant: "list" },
  },
  { twMerge: false },
);

export interface PressableListItemProps {
  variant?: Exclude<PressableBoxProps["variant"], "soft">;
  accent?: PressableBoxProps["accent"];
  role?: PressableBoxProps["role"];
  className?: string;
  /**
   * Names the row. Without it the row is announced by its contents — every
   * label, badge and date it holds, in one breath — so a row carrying more
   * than a title needs one ("Open Add dark mode").
   */
  "aria-label"?: string;
  /**
   * Destination, making the row a real `<a>` on web (cmd-click, middle-click,
   * a visible target in the status bar); native ignores it and routes from
   * `onPress`, which expo Router's `<Link asChild>` injects alongside it.
   *
   * Only for a row that holds no link of its own: `actions` — and any link in
   * `children` — would then nest inside the anchor, which is invalid HTML and
   * loses the inner link to assistive tech. Such a row stays a `button`.
   */
  href?: string;
  children: ReactNode;
  /**
   * Buttons pinned to the bottom end of the row. They are nested pressables:
   * each one takes the press for itself and the row's `onPress` does not fire,
   * so give every action its own handler.
   *
   * Same nesting caveat as `href`, from the other side: react-native-web turns
   * `role="button"` into a real `<button>`, so an action nests a `<button>` in
   * the row's own one. Pass a `role` the DOM does not map to an element
   * (`"menuitem"` in a menu, `"listitem"` in a list that owns the keyboard) for
   * a row that must stay valid markup.
   */
  actions?: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

export function PressableListItem({
  variant = "list",
  role,
  accent,
  className,
  "aria-label": ariaLabel,
  href,
  children,
  actions,
  onPress,
}: PressableListItemProps): ReactNode {
  const styles = pressableListItemVariants({ variant });
  return (
    <PressableBox
      variant={variant}
      role={role}
      accent={accent}
      aria-label={ariaLabel}
      href={href}
      className={styles.row({ className })}
      onPress={onPress}
    >
      <View className={styles.content()}>
        {children}
        {actions ? <View className={styles.actions()}>{actions}</View> : null}
      </View>
      <View className={styles.caretContainer()}>
        <Icon
          className={styles.caret()}
          icon={<CaretRightRegularIcon />}
          size={18}
        />
      </View>
    </PressableBox>
  );
}
