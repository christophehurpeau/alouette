import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import { PressableBox } from "../containers/PressableBox";
import { Icon } from "../primitives/Icon";

const IconButtonFrame = styled(PressableBox, {
  name: "IconButtonFrame",
  role: "button",
  centered: true,
  borderRadius: 10_000,

  variants: {
    variant: {
      contained: {
        withBackground: true,
      },
      outlined: {
        withBackground: true,
        withBorder: 1,
      },
      elevated: {
        withBackground: true,
        withElevation: true,
        withBorder: 1,
      },
      "ghost-contained": {
        withBackground: true,
      },
      "ghost-outlined": {
        withBackground: true,
        withBorder: 1,
      },
    },
  },

  defaultVariants: {
    variant: "contained",
  },
});

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

type IconButtonFrameProps = GetProps<typeof IconButtonFrame>;

export interface IconButtonProps extends IconButtonFrameProps {
  icon: NonNullable<ReactElement>;
}

export function IconButton({
  icon,
  disabled,
  size = 40,
  variant = "contained",
  ...pressableProps
}: IconButtonProps): ReactNode {
  return (
    <IconButtonFrame
      size={size}
      variant={variant}
      disabled={disabled}
      {...pressableProps}
    >
      <Icon
        size={size / 2}
        color={disabled ? getDisabledColor(variant) : undefined}
        contrast={
          (variant === "contained" || variant === "ghost-contained") &&
          !disabled
        }
        icon={icon}
      />
    </IconButtonFrame>
  );
}
