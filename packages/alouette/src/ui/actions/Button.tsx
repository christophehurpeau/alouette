import type { ReactNode } from "react";
import { Platform } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { SemanticRole } from "../../core/AlouetteConfig";
import { PressableBox, type PressableBoxProps } from "../data/PressableBox";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

export const buttonHeight = {
  sm: 38,
  md: 44,
} as const;

const buttonFrameVariants = tv(
  {
    base: "flex-row items-center justify-center",
    variants: {
      size: {
        sm: "rounded-sm px-xs gap-xxs min-h-[38px]",
        md: "rounded-sm px-m gap-xs min-h-[44px]",
      },
    },
    defaultVariants: { size: "md" },
  },
  { twMerge: false },
);

const buttonTextVariants = tv(
  {
    base: "font-bold text-center text-sharp shrink",
    variants: {
      size: {
        sm: "body-sm py-xxs",
        md: "body-md py-xs",
      },
      variant: {
        contained: "text-on-accent disabled:text-disabled-sharp",
        outlined: "text-sharp disabled:text-disabled-muted",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "contained",
    },
  },
  // { twMerge: false },
);

type ButtonSizeProps = VariantProps<typeof buttonFrameVariants>;

export interface ButtonProps
  extends Omit<PressableBoxProps, "children">, ButtonSizeProps {
  icon?: SVGIconElement;
  semanticRole?: SemanticRole;
  text: ReactNode;
}

export function Button({
  icon,
  text,
  disabled,
  semanticRole = "brand",
  variant = "contained",
  size = "md",
  className,
  ...pressableProps
}: ButtonProps): ReactNode {
  const onAccent = variant === "contained";
  return (
    <PressableBox
      semanticRole={semanticRole}
      variant={variant}
      disabled={disabled}
      className={buttonFrameVariants({ size, className })}
      {...pressableProps}
    >
      {icon ? (
        <Icon
          icon={icon}
          tint={onAccent ? "onAccent" : "sharp"}
          disabled={disabled === true}
          disabledSharp={onAccent}
          size={size === "sm" ? 16 : 20}
        />
      ) : null}
      <Text
        aria-disabled={disabled === true}
        className={buttonTextVariants({ size, variant })}
      >
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
