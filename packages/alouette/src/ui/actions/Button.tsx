import type { ReactNode } from "react";
import { Platform } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { PressableBox, type PressableBoxProps } from "../data/PressableBox";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

export const buttonHeight = {
  sm: 38,
  md: 44,
} as const;

const buttonVariants = tv(
  {
    slots: {
      frame: "flex-row flex-center",
      text: "font-body-bold text-center shrink",
      icon: "",
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
      },
      disabled: { true: {}, false: {} },
    },
    compoundVariants: [
      {
        variant: "contained",
        disabled: false,
        class: { icon: "text-on-accent" },
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

export interface ButtonProps
  extends Omit<PressableBoxProps, "children">, ButtonSizeProps {
  icon?: SVGIconElement;
  accent?: Accent;
  text: ReactNode;
}

export function Button({
  icon,
  text,
  disabled,
  accent = "brand",
  variant = "contained",
  size = "md",
  className,
  ...pressableProps
}: ButtonProps): ReactNode {
  const styles = buttonVariants({ size, variant, disabled: disabled === true });
  return (
    <PressableBox
      accent={accent}
      variant={variant}
      disabled={disabled}
      className={styles.frame({ className })}
      {...pressableProps}
    >
      {icon ? (
        <Icon
          icon={icon}
          className={styles.icon()}
          size={size === "sm" ? 16 : 20}
        />
      ) : null}
      <Text aria-disabled={disabled === true} className={styles.text()}>
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
