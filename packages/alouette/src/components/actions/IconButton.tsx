import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import { type ReactElement, type ReactNode } from "react";
import { Icon } from "../primitives/Icon";
import { Pressable } from "../containers/Pressable";

const IconButtonFrame = styled(Pressable, {
  name: "IconButtonFrame",
  role: "button",
  centered: true,
  withBorder: true,
  withBackground: true,
  size: 40,
  borderWidth: 1,
  borderRadius: 10000,
});

type IconButtonFrameProps = GetProps<typeof IconButtonFrame>;

export interface IconButtonProps extends IconButtonFrameProps {
  icon: NonNullable<ReactElement>;
}

export function IconButton({
  icon,
  disabled,
  size = 40,
  ...pressableProps
}: IconButtonProps): ReactNode {
  return (
    <IconButtonFrame size={size} disabled={disabled} {...pressableProps}>
      <Icon
        size={size / 2}
        color={disabled ? "$contrastDisabled" : undefined}
        contrast={!disabled}
        icon={icon}
      />
    </IconButtonFrame>
  );
}