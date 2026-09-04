import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { tv } from "tailwind-variants";
import {
  LinkText,
  type LinkTextProps,
  linkTextIconSize,
} from "../actions/LinkText";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text, type TextProps } from "../primitives/Text";
import { View } from "../primitives/View";
import { useBreadcrumbItemContext } from "./BreadcrumbsContext";

// An ancestor is a LinkText, so a crumb is styled like every other link in the
// system; the row around it only holds the 44px tap target. The current page is
// that same row without the link — bold and sharp, since it labels what is
// already on screen.
const breadcrumbItemVariants = tv({
  slots: {
    // LinkText is already the row; it only needs the tap target around it.
    link: "min-h-[44px] px-xxs",
    page: "flex-row items-center gap-xxs min-h-[44px] px-xxs",
    icon: "text-sharp",
    label: "select-none font-body-bold text-base text-sharp",
  },
});

// react-native's Text types have no `aria-current`, but react-native-web
// forwards it — it marks the page being viewed — while native ignores it.
interface CurrentCrumbTextProps extends TextProps {
  "aria-current": "page";
}

function CurrentCrumbText(props: CurrentCrumbTextProps): ReactNode {
  return <Text {...props} />;
}

export interface BreadcrumbItemProps {
  /**
   * Destination of the crumb. Renders a real `<a href>` on web (native ignores
   * it); expo Router's `<Link asChild>` injects it, so it does not have to be
   * written twice. The last crumb is the current page — give it its own href
   * anyway, it is rendered as plain text.
   */
  href?: string;
  label: string;
  /** Leading icon, typically on the root crumb. */
  icon?: SVGIconElement;
  disabled?: boolean;
  /**
   * Handles the press instead of the trail's `onNavigate` — this is what
   * `<Link asChild>` injects. A handler that navigates on web must call
   * `event.preventDefault()`, as routers do.
   */
  onPress?: LinkTextProps["onPress"];
}

/**
 * One crumb of a `Breadcrumbs` trail: a link to an ancestor. The last one is the
 * current page instead — plain text carrying `aria-current="page"`.
 */
export function BreadcrumbItem({
  href,
  label,
  icon,
  disabled,
  onPress,
}: BreadcrumbItemProps): ReactNode {
  const {
    current,
    disabled: breadcrumbsDisabled,
    onNavigate,
  } = useBreadcrumbItemContext();
  const isDisabled = disabled === true || breadcrumbsDisabled;
  const styles = breadcrumbItemVariants();

  if (current) {
    return (
      <View className={styles.page()}>
        {icon ? (
          <Icon
            icon={icon}
            size={linkTextIconSize("md")}
            className={styles.icon()}
          />
        ) : null}
        <CurrentCrumbText aria-current="page" className={styles.label()}>
          {label}
        </CurrentCrumbText>
      </View>
    );
  }

  // Routing is the app's job, through the trail's onNavigate or an item
  // onPress, so the anchor must not navigate on its own once one is set.
  const navigate =
    onNavigate === undefined || href === undefined
      ? undefined
      : (event: GestureResponderEvent) => {
          event.preventDefault();
          onNavigate(href);
        };

  return (
    <LinkText
      href={href}
      text={label}
      icon={icon}
      aria-label={label}
      disabled={isDisabled}
      className={styles.link()}
      onPress={onPress ?? navigate}
    />
  );
}
