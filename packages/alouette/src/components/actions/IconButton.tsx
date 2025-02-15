import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import { PressableBox } from "../containers/PressableBox";
import { Icon } from "../primitives/Icon";

const IconButtonFrame = styled(PressableBox, {
  name: "IconButtonFrame",
  role: "button",
  centered: true,
  withBorder: true,
  withBackground: true,
  size: 40,
  borderWidth: 1,
  borderRadius: 10_000,
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
        color={disabled ? "$contrastTextColor:disabled" : undefined}
        icon={icon}
      />
    </IconButtonFrame>
  );
}
