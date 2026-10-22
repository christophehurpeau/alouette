import { ArrowSquareOutRegularIcon } from "alouette-icons/phosphor-icons/ArrowSquareOut";
import type { ReactNode } from "react";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { ExternalLink } from "../../expo/ExternalLink";
import {
  type ExternalOpenLinkBehavior,
  defaultExternalOpenLinkBehavior,
} from "../../expo/ExternalLink.shared";
import { AccentScope } from "../containers/AccentScope";
import type { InteractiveBoxProps } from "../containers/Box";
import type { SVGIconElement } from "../primitives/Icon";
import { LinkTextFrame } from "./LinkTextFrame";
import type { LinkTextSizeProps } from "./linkTextVariants";

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

  return (
    <AccentScope accent={accent}>
      <ExternalLink
        as={LinkTextFrame}
        // A disabled Pressable never sees the press that would cancel the
        // navigation, so the href has to go with it — ExternalLink drops a
        // falsy one on both platforms.
        href={isDisabled ? "" : href}
        openLinkBehavior={openLinkBehavior}
        text={text}
        icon={icon}
        size={size}
        disabled={isDisabled}
        className={className}
        onPress={onPress ?? undefined}
        {...pressableProps}
      />
    </AccentScope>
  );
}
