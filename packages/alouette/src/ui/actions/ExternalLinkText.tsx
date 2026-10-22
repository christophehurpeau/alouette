import { ArrowSquareOutRegularIcon } from "alouette-icons/phosphor-icons/ArrowSquareOut";
import { type ReactNode, use } from "react";
import { Platform } from "react-native";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { ExternalLink } from "../../expo/ExternalLink";
import {
  type ExternalOpenLinkBehavior,
  defaultExternalOpenLinkBehavior,
} from "../../expo/ExternalLink.shared";
import { AccentScope } from "../containers/AccentScope";
import { InteractiveBox, type InteractiveBoxProps } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { TextAncestorContext } from "../primitives/TextAncestorContext";
import {
  type LinkTextSizeProps,
  linkTextIconSize,
  linkTextVariants,
} from "./LinkText";

export interface ExternalLinkTextProps
  extends Omit<InteractiveBoxProps, "children">, LinkTextSizeProps {
  href: string;
  /** How the link opens. Defaults to an in-app browser sheet / a new tab. */
  openLinkBehavior?: ExternalOpenLinkBehavior;
  text: ReactNode;
  /**
   * Leading affordance icon. Defaults to the external-link arrow; `null`
   * renders the label alone.
   */
  icon?: SVGIconElement | null;
  accent?: AccentOrNeutral;
}

/**
 * Inline text link to an external destination — the lightweight alternative to
 * `ExternalLinkButton` when the link is part of a text flow rather than a call
 * to action.
 */
export function ExternalLinkText({
  href,
  openLinkBehavior = defaultExternalOpenLinkBehavior,
  text,
  icon = <ArrowSquareOutRegularIcon />,
  accent,
  size = "md",
  disabled,
  className,
  onPress,
  ...pressableProps
}: ExternalLinkTextProps): ReactNode {
  const isDisabled = disabled === true;
  const styles = linkTextVariants({ size, disabled: isDisabled });
  const hasTextAncestor = use(TextAncestorContext);

  // On native a View inside a Text is laid out as one inline block, so its
  // label cannot share the line's baseline: a nested Text does.
  if (Platform.OS !== "web" && hasTextAncestor) {
    return (
      <AccentScope accent={accent}>
        <ExternalLink
          as={Text}
          href={isDisabled ? "" : href}
          openLinkBehavior={openLinkBehavior}
          role="link"
          aria-disabled={isDisabled}
          disabled={isDisabled}
          className={styles.text()}
          onPress={onPress ?? undefined}
        >
          {icon ? (
            <Icon
              icon={icon}
              size={linkTextIconSize(size)}
              className={styles.icon()}
            />
          ) : null}
          {icon ? " " : null}
          {text}
        </ExternalLink>
      </AccentScope>
    );
  }

  return (
    <AccentScope accent={accent}>
      <ExternalLink
        withFocusVisibleOutline
        as={InteractiveBox}
        // A disabled Pressable never sees the press that would cancel the
        // navigation, so the href has to go with it — ExternalLink drops a
        // falsy one on both platforms.
        href={isDisabled ? "" : href}
        openLinkBehavior={openLinkBehavior}
        role="link"
        aria-disabled={isDisabled}
        disabled={disabled}
        className={styles.frame({ className })}
        onPress={onPress ?? undefined}
        {...pressableProps}
      >
        {icon ? (
          <Icon
            icon={icon}
            size={linkTextIconSize(size)}
            className={styles.icon()}
          />
        ) : null}
        <Text className={styles.text()}>{text}</Text>
      </ExternalLink>
    </AccentScope>
  );
}
