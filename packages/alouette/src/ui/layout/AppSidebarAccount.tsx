import { CaretUpRegularIcon } from "alouette-icons/phosphor-icons/CaretUp";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { Menu } from "../actions/Menu";
import { PressableBox } from "../actions/PressableBox";
import { Avatar } from "../data/Avatar";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";

const appSidebarAccountVariants = tv({
  slots: {
    frame:
      "flex-row items-center gap-sm rounded-full px-xs py-xxs min-h-[44px]",
    identity: "flex-1",
    name: "text-base text-sharp",
    description: "text-sm text-muted",
    caret: "text-muted",
  },
});

export interface AppSidebarAccountProps {
  /** Account name: drives the initials and labels the trigger. */
  name: string;
  /** Second line under the name — the email, the role. */
  description?: string;
  /** Replaces the initials in the disc. */
  icon?: SVGIconElement;
  /** Accent of the disc. Defaults to the inherited accent, or `brand` outside
   * an accent scope. */
  accent?: Accent;
  /**
   * Rendered above the items — typically the `ColorModePicker`, the identity
   * being on the row already. A press there leaves the menu open.
   */
  header?: ReactNode;
  /** `MenuItem`s, and `Separator`s between groups. */
  children: ReactNode;
}

/**
 * Footer of an `AppSidebar`: the signed-in account, as a row opening a menu
 * of session actions. The row is pinned at the bottom of the viewport, so the
 * menu opens above it, as wide as the row.
 */
export function AppSidebarAccount({
  name,
  description,
  icon,
  accent,
  header,
  children,
}: AppSidebarAccountProps): ReactNode {
  const styles = appSidebarAccountVariants();

  return (
    <Menu
      label={name}
      header={header}
      side="top"
      width="anchor"
      render={(triggerProps) => (
        <PressableBox
          variant="soft"
          aria-label={name}
          className={styles.frame()}
          {...triggerProps}
        >
          <Avatar name={name} icon={icon} accent={accent} variant="enabled" />
          <View className={styles.identity()}>
            <Text numberOfLines={1} className={styles.name()}>
              {name}
            </Text>
            {description === undefined ? null : (
              <Text numberOfLines={1} className={styles.description()}>
                {description}
              </Text>
            )}
          </View>
          <Icon
            icon={<CaretUpRegularIcon />}
            size={18}
            className={styles.caret()}
          />
        </PressableBox>
      )}
    >
      {children}
    </Menu>
  );
}
