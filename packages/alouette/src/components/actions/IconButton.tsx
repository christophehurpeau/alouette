import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactNode } from "react";
import { PressableBox } from "../containers/PressableBox";
import type { SVGIconElement } from "../primitives/Icon";
import { Icon } from "../primitives/Icon";

const IconButtonFrame = styled(PressableBox, {
  name: "IconButtonFrame",
  role: "button",
  center: true,
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

type IconButtonFrameProps = GetProps<typeof IconButtonFrame>;

export interface IconButtonProps extends IconButtonFrameProps {
  icon: NonNullable<SVGIconElement>;
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
      <Icon size={size / 2} disabled={disabled} icon={icon} />
    </IconButtonFrame>
  );
}
