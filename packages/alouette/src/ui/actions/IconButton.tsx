import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactNode } from "react";
import type { SetRequired } from "type-fest";
import { PressableBox } from "../data/PressableBox";
import type { SVGIconElement } from "../primitives/Icon";
import { Icon } from "../primitives/Icon";
import { buttonHeight } from "./Button";

const IconButtonFrame = styled(PressableBox, {
  name: "IconButtonFrame",
  role: "button",
  center: true,
  borderRadius: 10_000,
  variants: {
    size: {
      ":number": (val: number) => ({
        square: val,
      }),
      sm: { square: buttonHeight.sm },
      md: { square: buttonHeight.md },
    },
  },
});

type IconButtonFrameProps = GetProps<typeof IconButtonFrame>;

export interface IconButtonProps
  extends SetRequired<IconButtonFrameProps, "aria-label"> {
  icon: NonNullable<SVGIconElement>;
  iconSize?: "fill";
}

export function IconButton({
  icon,
  disabled,
  size = "md",
  iconSize,
  variant = "contained",
  ...pressableBoxProps
}: IconButtonProps): ReactNode {
  const sizeAsValue = typeof size === "number" ? size : buttonHeight[size];
  return (
    <IconButtonFrame
      size={size}
      variant={variant}
      disabled={disabled}
      {...pressableBoxProps}
    >
      <Icon
        size={iconSize === "fill" ? sizeAsValue * 0.8 : sizeAsValue * 0.5}
        disabled={disabled}
        icon={icon}
      />
    </IconButtonFrame>
  );
}
