import type { ReactNode } from "react";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import type { InteractiveBoxProps } from "../containers/Box";
import type { SVGIconElement } from "../primitives/Icon";
import { LinkTextFrame } from "./LinkTextFrame";
import type { LinkTextSizeProps } from "./linkTextVariants";

export interface LinkTextProps
  extends Omit<InteractiveBoxProps, "children">, LinkTextSizeProps {
  /**
   * In-app destination. react-native-web renders a real `<a href>`, which
   * navigates on its own; native ignores it, so a native app routes from
   * `onPress` — expo Router's `<Link asChild>` injects both, and a handler that
   * navigates on web must call `event.preventDefault()`, as routers do.
   */
  href?: string;
  text: ReactNode;
  /** Leading icon, tinted with the label. */
  icon?: SVGIconElement;
  accent?: AccentOrNeutral;
}

/**
 * Text link to an in-app destination — the lightweight alternative to a Button
 * when the link is part of a text flow rather than a call to action. Use
 * `ExternalLinkText` for a destination outside the app, and a `NavBar` for the
 * primary navigation between screens.
 */
export function LinkText({
  href,
  text,
  icon,
  accent,
  size = "md",
  disabled,
  className,
  ...pressableProps
}: LinkTextProps): ReactNode {
  const isDisabled = disabled === true;

  return (
    <AccentScope accent={accent}>
      <LinkTextFrame
        // A disabled Pressable never sees the press that would cancel the
        // navigation, so the href has to go with it.
        href={isDisabled ? undefined : href}
        text={text}
        icon={icon}
        size={size}
        disabled={isDisabled}
        className={className}
        {...pressableProps}
      />
    </AccentScope>
  );
}
