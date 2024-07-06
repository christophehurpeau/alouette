import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactElement, ReactNode } from "react";
import { PressableBox } from "../containers/PressableBox";
import { Icon } from "../primitives/Icon";
import { HStack } from "../primitives/stacks";
import { Typography } from "../typography/Typography";

const ButtonFrame = styled(PressableBox, {
  name: "ButtonFrame",
  role: "button",
  centered: true,
  minHeight: 42,
  borderRadius: "$sm",
  paddingHorizontal: "$md",

  variants: {
    variant: {
      contained: {
        withBackground: true,
      },
      outlined: {
        withBackground: true,
        withBorder: true,
      },
    },
  },

  defaultVariants: {
    variant: "contained",
  },
});

type ButtonFrameProps = GetProps<typeof ButtonFrame>;

export interface ButtonProps extends ButtonFrameProps {
  icon?: NonNullable<ReactElement>;
  text: ReactNode;
}

export function Button({
  icon,
  text,
  disabled,
  variant,
  ...pressableProps
}: ButtonProps): ReactNode {
  return (
    <ButtonFrame disabled={disabled} variant={variant} {...pressableProps}>
      <HStack gap="$xs" alignItems="center">
        {icon && (
          <Icon
            color={disabled ? "$contrastDisabled" : undefined}
            contrast={variant === "contained" && !disabled}
            icon={icon}
          />
        )}
        <Typography
          size="md"
          weight="bold"
          paddingVertical="$xs"
          color={disabled ? "$contrastDisabled" : undefined}
          contrast={variant === "contained" && !disabled}
        >
          {text}
        </Typography>
      </HStack>
    </ButtonFrame>
  );
}
