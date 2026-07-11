import { CheckCircleRegularIcon } from "alouette-icons/phosphor-icons/CheckCircleRegularIcon";
import { WarningDuotoneIcon } from "alouette-icons/phosphor-icons/WarningDuotoneIcon";
import { type ReactNode, useEffect, useState } from "react";
import { Platform } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { PressableBox, type PressableBoxProps } from "../data/PressableBox";
import { IndeterminateCircularProgress } from "../feedback/CircularProgress";
import { indeterminateExitDurationMs } from "../feedback/useSimulatedProgress";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";

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
          frame: "rounded-sm px-xs gap-xxs min-h-[38px]",
          text: "text-sm py-xxs",
        },
        md: {
          frame: "rounded-sm px-m gap-xs min-h-[44px]",
          text: "text-base py-xs",
        },
      },
      variant: {
        contained: { text: "text-on-accent" },
        outlined: { text: "text-sharp" },
        ghost: { text: "text-sharp" },
      },
      disabled: { true: {}, false: {} },
      dimmed: {
        true: { text: "opacity-30", icon: "opacity-30" },
        false: {},
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        disabled: false,
        ghost: false,
        class: { icon: "text-on-accent" },
      },
      {
        variant: "contained",
        disabled: false,
        ghost: true,
        class: {
          text: "text-sharp hover:text-on-accent",
          icon: "text-sharp hover:text-on-accent",
        },
      },
      { variant: "outlined", disabled: false, class: { icon: "text-sharp" } },
      {
        variant: "contained",
        disabled: true,
        class: { icon: "text-disabled-sharp", text: "text-disabled-sharp" },
      },
      {
        variant: "outlined",
        disabled: true,
        class: { icon: "text-disabled-muted", text: "text-disabled-muted" },
      },
    ],
    defaultVariants: { size: "md", variant: "contained" },
  },
  { twMerge: false },
);

type ButtonSizeProps = Pick<VariantProps<typeof buttonVariants>, "size">;

export type ButtonState = "failed" | "loading" | "success";

/** Icon shown above the text for a terminal `state`, once the spinner's
 * finish animation has played out. */
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
  extends Omit<PressableBoxProps, "children">, ButtonSizeProps {
  icon?: SVGIconElement;
  accent?: Accent;
  text: ReactNode;
  state?: ButtonState;
}

export function Button({
  icon,
  text,
  disabled,
  state,
  accent = "brand",
  variant = "contained",
  size = "md",
  className,
  ...pressableProps
}: ButtonProps): ReactNode {
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

  const isDisabled = disabled === true || state != null;
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
        <Icon
          icon={icon}
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
}

export function ExternalLinkButton({
  href,
  onPress,
  ...buttonProps
}: ExternalLinkButtonProps): ReactNode {
  return (
    <Button
      {...buttonProps}
      role="link"
      onPress={(event) => {
        onPress?.(event);
        if (event.defaultPrevented) return;
        if (Platform.OS === "web") {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          throw new Error("todo");
          // Linking.openURL(href);
        }
      }}
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
