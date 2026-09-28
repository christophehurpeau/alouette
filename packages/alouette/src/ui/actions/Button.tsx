import { CheckCircleRegularIcon } from "alouette-icons/phosphor-icons/CheckCircle";
import { WarningDuotoneIcon } from "alouette-icons/phosphor-icons/Warning";
import { type ReactNode, type Ref, useEffect, useState } from "react";
import type { View as RNView } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent, AccentOrNeutral } from "../../core/AlouetteConfig";
import { useAccentOrInheritedOrBrand } from "../../core/ThemeContext";
import { ExternalLink } from "../../expo/ExternalLink";
import {
  type ExternalOpenLinkBehavior,
  defaultExternalOpenLinkBehavior,
} from "../../expo/ExternalLink.shared";
import { AccentScope } from "../containers/AccentScope";
import { IndeterminateCircularProgress } from "../feedback/CircularProgress";
import { indeterminateExitDurationMs } from "../feedback/useSimulatedProgress";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { InteractiveIcon } from "../primitives/InteractiveIcon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { PressableBox, type PressableBoxProps } from "./PressableBox";

export const buttonHeight = {
  sm: 38,
  md: 44,
} as const;

const buttonVariants = tv(
  {
    slots: {
      frame: "flex-row flex-center relative",
      text: "font-body-bold text-center shrink transition-opacity duration-fade",
      icon: "",
      terminalIcon: "text-accent",
      overlayIconContainer: "absolute inset-0 flex-center",
    },
    variants: {
      size: {
        sm: {
          frame: "rounded-full px-sm gap-xxs min-h-[38px]",
          text: "text-sm py-xxs",
        },
        md: {
          frame: "rounded-full px-m gap-xs min-h-[44px]",
          text: "text-base py-xs",
        },
      },
      variant: {
        tonal: {},
        filled: {},
        outlined: {},
        soft: {},
      },
      disabled: { true: {}, false: {} },
      dimmed: {
        true: { text: "opacity-30", icon: "opacity-30" },
        false: {},
      },
    },
    compoundVariants: [
      {
        variant: "tonal",
        disabled: false,
        class: { text: "text-on-tonal", icon: "text-on-tonal" },
      },
      {
        variant: "filled",
        disabled: false,
        class: { text: "text-on-accent", icon: "text-on-accent" },
      },
      {
        variant: "outlined",
        disabled: false,
        class: { text: "text-sharp", icon: "text-sharp" },
      },
      {
        variant: "soft",
        disabled: false,
        class: { text: "text-accent underline", icon: "text-accent" },
      },
      {
        variant: "tonal",
        disabled: true,
        class: { icon: "text-disabled-sharp", text: "text-disabled-sharp" },
      },
      {
        variant: "filled",
        disabled: true,
        class: { icon: "text-disabled-sharp", text: "text-disabled-sharp" },
      },
      {
        variant: "outlined",
        disabled: true,
        class: { icon: "text-disabled-muted", text: "text-disabled-muted" },
      },
      {
        variant: "soft",
        disabled: true,
        class: { icon: "text-disabled-muted", text: "text-disabled-muted" },
      },
    ],
    defaultVariants: { size: "md", variant: "tonal" },
  },
  { twMerge: false },
);

type ButtonSizeProps = Pick<VariantProps<typeof buttonVariants>, "size">;

export type ButtonState = "failed" | "loading" | "success";

function resolveTerminalIcon(state: ButtonState | undefined): {
  terminalIcon: SVGIconElement | undefined;
  terminalIconAccent: Accent | undefined;
} {
  if (state === "success") {
    return {
      terminalIcon: <CheckCircleRegularIcon />,
      terminalIconAccent: "success",
    };
  }
  if (state === "failed") {
    return {
      terminalIcon: <WarningDuotoneIcon />,
      terminalIconAccent: "danger",
    };
  }
  return { terminalIcon: undefined, terminalIconAccent: undefined };
}

export interface ButtonProps
  extends Omit<PressableBoxProps, "children" | "variant">, ButtonSizeProps {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: SVGIconElement;
  /** Replaces `icon` while the button is hovered, focused or pressed. */
  activeIcon?: SVGIconElement;
  /** Defaults to the inherited accent, or `brand` outside an accent scope. */
  accent?: AccentOrNeutral;
  text: ReactNode;
  state?: ButtonState;
  /**
   * Forwarded to the underlying `PressableBox`, so the button can anchor a
   * `Popover` or a `Menu`. React 19 carries it in with the other props.
   */
  ref?: Ref<RNView>;
}

interface IsButtonDisabledParams {
  disabled?: boolean | null;
  state?: ButtonState;
}

function isButtonDisabled({
  disabled,
  state,
}: IsButtonDisabledParams): boolean {
  return disabled === true || state != null;
}

export function Button({
  icon,
  activeIcon,
  text,
  disabled,
  state,
  accent: accentProp,
  variant,
  size = "md",
  className,
  forceStyle,
  ...pressableProps
}: ButtonProps): ReactNode {
  const accent = useAccentOrInheritedOrBrand(accentProp);
  const isLoading = state === "loading";

  // Keep the spinner (and the disabled look) mounted past `state` leaving
  // "loading" so the ring's complete-then-fade animation can finish, and the
  // background transitions back in step with it, instead of both being cut
  // off mid-animation.
  const [showSpinner, setShowSpinner] = useState(isLoading);
  useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);
      return undefined;
    }
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, indeterminateExitDurationMs);
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  const { terminalIcon, terminalIconAccent } = resolveTerminalIcon(state);
  const hasOverlayIcon = showSpinner || terminalIcon !== undefined;

  const isDisabled = isButtonDisabled({ disabled, state });
  const styles = buttonVariants({
    size,
    variant,
    disabled: isDisabled,
    dimmed: hasOverlayIcon,
  });

  return (
    <PressableBox
      accent={accent}
      variant={variant}
      disabled={isDisabled}
      forceStyle={forceStyle}
      className={styles.frame({ className })}
      {...pressableProps}
    >
      {hasOverlayIcon ? (
        <View className={styles.overlayIconContainer()}>
          {showSpinner || !terminalIcon ? (
            <IndeterminateCircularProgress
              loading={isLoading}
              accent={accent}
              size={size === "sm" ? "xs" : "sm"}
            />
          ) : (
            <AccentScope accent={terminalIconAccent}>
              <Icon
                icon={terminalIcon}
                className={styles.terminalIcon()}
                size={size === "sm" ? 24 : 32}
              />
            </AccentScope>
          )}
        </View>
      ) : null}
      {icon ? (
        <InteractiveIcon
          icon={icon}
          activeIcon={activeIcon}
          // A pinned state in a story has to swap the glyph too, the CSS
          // hover/focus/press the swap listens on never firing there.
          active={forceStyle !== undefined}
          disabled={isDisabled}
          className={styles.icon()}
          size={size === "sm" ? 16 : 20}
        />
      ) : null}
      <Text aria-disabled={isDisabled} className={styles.text()}>
        {text}
      </Text>
    </PressableBox>
  );
}

export interface ExternalLinkButtonProps extends ButtonProps {
  href: string;
  /** How the link opens. Defaults to an in-app browser sheet / a new tab. */
  openLinkBehavior?: ExternalOpenLinkBehavior;
}

export function ExternalLinkButton({
  href,
  openLinkBehavior = defaultExternalOpenLinkBehavior,
  onPress,
  ...buttonProps
}: ExternalLinkButtonProps): ReactNode {
  return (
    <ExternalLink
      as={Button}
      // A disabled Pressable never sees the press that would cancel the
      // navigation, so the href has to go with it — ExternalLink drops a falsy
      // one on both platforms.
      href={isButtonDisabled(buttonProps) ? "" : href}
      openLinkBehavior={openLinkBehavior}
      role="link"
      onPress={onPress ?? undefined}
      {...buttonProps}
    />
  );
}

export interface InternalLinkButtonProps extends ButtonProps {
  href: string;
}

export function InternalLinkButton({
  href: _href,
  ...buttonProps
}: InternalLinkButtonProps): ReactNode {
  return <Button {...buttonProps} role="link" />;
}
