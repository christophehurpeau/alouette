import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import type { Except } from "type-fest";
import { PressableBox } from "../containers/PressableBox";
import { Icon } from "../primitives/Icon";
import { HStack } from "../primitives/stacks";
import { Typography } from "../typography/Typography";

const ButtonFrame = styled(PressableBox, {
  name: "ButtonFrame",
  role: "button",
  centered: true,
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
    variant: {
      contained: {
        withBackground: true,
      },
      outlined: {
        withBackground: true,
        withBorder: true,
      },
      elevated: {
        withBackground: true,
        withElevation: true,
        withBorder: true,
        borderColor: "$contrastBorderColor",
      },
      "ghost-contained": {
        withBackground: true,
      },
      "ghost-outlined": {
        withBorder: 1,
        withBackground: true,
      },
    },
  },

  defaultVariants: {
    variant: "contained",
    size: "md",
  },
});

type ButtonFrameProps = GetProps<typeof ButtonFrame>;

export interface ButtonProps extends Except<ButtonFrameProps, "size"> {
  icon?: NonNullable<ReactElement>;
  text: ReactNode;
  size?: "md" | "sm";
}

const getDisabledColor = (
  variant:
    | "contained"
    | "elevated"
    | "ghost-contained"
    | "ghost-outlined"
    | "outlined",
) => {
  return variant === "contained" || variant === "ghost-contained"
    ? "$contrastTextColor:disabled"
    : "$textColor:disabled";
};

// eslint-disable-next-line complexity
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
            color={disabled ? getDisabledColor(variant) : undefined}
            contrast={
              (variant === "contained" || variant === "ghost-contained") &&
              !disabled
            }
            icon={icon}
            size={size === "sm" ? 16 : 20}
          />
        )}
        <Typography
          size={size}
          weight="bold"
          paddingVertical={size === "sm" ? "$1" : "$xs"}
          color={disabled ? getDisabledColor(variant) : undefined}
          contrast={
            (variant === "contained" || variant === "ghost-contained") &&
            !disabled
          }
        >
          {text}
        </Typography>
      </HStack>
    </ButtonFrame>
  );
}
