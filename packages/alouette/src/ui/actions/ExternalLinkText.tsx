import { ArrowSquareOutRegularIcon } from "alouette-icons/phosphor-icons/ArrowSquareOutRegularIcon";
import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { ExternalLink } from "../../expo/ExternalLink";
import {
  type ExternalOpenLinkBehavior,
  defaultExternalOpenLinkBehavior,
} from "../../expo/ExternalLink.shared";
import { AccentScope } from "../containers/AccentScope";
import { InteractiveBox, type InteractiveBoxProps } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

// Native resolves the icon tint through useColorToken, which reads the base
// `text-*` only, so the group-driven hover/active tint is web-only.
const externalLinkTextVariants = tv(
  {
    slots: {
      frame:
        "group flex-row items-center gap-xxs self-start rounded-xs py-xxs focus-visible:outline-interactive-outlined-outline-focus",
      text: "shrink font-body-bold underline transition-[color] duration-fast ease-in",
      icon: "",
    },
    variants: {
      size: {
        sm: { text: "text-sm" },
        md: { text: "text-base" },
      },
      disabled: {
        true: {
          text: "text-disabled-muted",
          icon: "text-disabled-muted",
        },
        false: {
          text: "text-interactive-pressable group-hover:text-interactive-hover group-active:text-interactive-active",
          icon: "text-interactive-pressable group-hover:text-interactive-hover group-active:text-interactive-active",
        },
      },
    },
    defaultVariants: { size: "md", disabled: false },
  },
  { twMerge: false },
);

type ExternalLinkTextSizeProps = Pick<
  VariantProps<typeof externalLinkTextVariants>,
  "size"
>;

export interface ExternalLinkTextProps
  extends Omit<InteractiveBoxProps, "children">, ExternalLinkTextSizeProps {
  href: string;
  /** How the link opens. Defaults to an in-app browser sheet / a new tab. */
  openLinkBehavior?: ExternalOpenLinkBehavior;
  text: ReactNode;
  /** Leading affordance icon. Defaults to the external-link arrow. */
  icon?: SVGIconElement;
  accent?: Accent;
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
  const styles = externalLinkTextVariants({ size, disabled: isDisabled });

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
        <Icon
          icon={icon}
          size={size === "sm" ? 16 : 20}
          className={styles.icon()}
        />
        <Text className={styles.text()}>{text}</Text>
      </ExternalLink>
    </AccentScope>
  );
}
