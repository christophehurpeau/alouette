import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactNode } from "react";
import type { SetRequired } from "type-fest";
import { PressableBox } from "../data/PressableBox";
import type { SVGIconElement } from "../primitives/Icon";
import { Icon } from "../primitives/Icon";

const IconButtonFrame = styled(PressableBox, {
  name: "IconButtonFrame",
  role: "button",
  center: true,
  borderRadius: 10_000,
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
  size = 40,
  iconSize,
  variant = "contained",
  ...pressableBoxProps
}: IconButtonProps): ReactNode {
  return (
    <IconButtonFrame
      size={size}
      variant={variant}
      disabled={disabled}
      {...pressableBoxProps}
    >
      <Icon
        size={iconSize === "fill" ? size * 0.8 : size * 0.5}
        disabled={disabled}
        icon={icon}
      />
    </IconButtonFrame>
  );
}
