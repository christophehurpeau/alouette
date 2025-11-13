import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactNode } from "react";
import type { Except } from "type-fest";
import { PressableBox } from "../containers/PressableBox";
import type { SVGIconElement } from "../primitives/Icon";
import { Icon } from "../primitives/Icon";
import { HStack } from "../primitives/stacks";
import { Typography } from "../typography/Typography";

const ButtonFrame = styled(PressableBox, {
  name: "ButtonFrame",
  role: "button",
  center: true,
  minHeight: 42,

  variants: {
    size: {
      sm: {
        paddingHorizontal: "$sm",
        borderRadius: "$3",
        minHeight: 32,
      },
      md: {
        paddingHorizontal: "$md",
        borderRadius: "$sm",
        minHeight: 42,
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
} as const);

type ButtonFrameProps = GetProps<typeof ButtonFrame>;

export interface ButtonProps extends Except<ButtonFrameProps, "size"> {
  icon?: NonNullable<SVGIconElement>;
  text: ReactNode;
  size?: "md" | "sm";
}

export function Button({
  icon,
  text,
  disabled,
  variant = "contained",
  size = "md",
  ...pressableProps
}: ButtonProps): ReactNode {
  return (
    <ButtonFrame
      disabled={disabled}
      variant={variant}
      size={size}
      {...pressableProps}
    >
      <HStack gap="$xs" alignItems="center">
        {icon && (
          <Icon
            disabled={disabled}
            icon={icon}
            size={size === "sm" ? 16 : 20}
          />
        )}
        <Typography
          size={size === "sm" ? "$sm" : "$md"}
          weight="$bold"
          paddingVertical={size === "sm" ? "$1" : "$xs"}
          disabled={disabled}
        >
          {text}
        </Typography>
      </HStack>
    </ButtonFrame>
  );
}

export function ExternalLinkButton(
  props: Except<ButtonProps, "href" | "role" | "tag"> & { href: string },
): ReactNode {
  return (
    <Button
      {...props}
      tag="a"
      role="link"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecorationLine: "none" }}
    />
  );
}

export function InternalLinkButton(
  props: Except<ButtonProps, "href" | "role" | "tag"> & { href: string },
): ReactNode {
  return <Button {...props} tag="a" role="link" />;
}
