import type { GetProps } from "@tamagui/core";
import { styled } from "@tamagui/core";
import type { ReactNode } from "react";
import type { Except } from "type-fest";
import { PressableBox } from "../data/PressableBox";
import { Icon } from "../primitives/Icon";
import type { SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";

const ButtonFrame = styled(PressableBox, {
  name: "ButtonFrame",
  render: "button",
  // @ts-expect-error missing type definition
  type: "button",
  center: true,
  flexDirection: "row",

  variants: {
    size: {
      sm: {
        paddingHorizontal: "$0.5",
        gap: "$0.25",
        borderRadius: "$sm",
        minHeight: 38,
      },
      md: {
        paddingHorizontal: "$1.0",
        gap: "$0.5",
        borderRadius: "$sm",
        minHeight: 44,
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
} as const);

const ButtonText = styled(Text, {
  textAlign: "center",
  weight: "$bold",
  flexShrink: 1,

  variants: {
    "button-size": {
      sm: {
        paddingVertical: "$0.25",
        size: "$sm",
      },
      md: {
        paddingVertical: "$0.5",
        size: "$md",
      },
    },
  },
});

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
      variant={variant}
      size={size}
      disabled={disabled}
      {...pressableProps}
    >
      {icon && (
        <Icon
          tint={variant === "contained" ? "onAccent" : undefined}
          disabled={disabled}
          disabledSharp={variant === "contained"}
          icon={icon}
          size={size === "sm" ? 16 : 20}
        />
      )}
      <ButtonText
        tint={variant === "contained" ? "onAccent" : undefined}
        button-size={size}
        disabled={disabled}
        disabledSharp={variant === "contained"}
        textAlign={icon ? "left" : "center"}
      >
        {text}
      </ButtonText>
    </ButtonFrame>
  );
}

export function ExternalLinkButton(
  props: Except<ButtonProps, "render" | "role"> & { href: string },
): ReactNode {
  return (
    <Button
      {...props}
      render="a"
      role="link"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecorationLine: "none" }}
    />
  );
}

export function InternalLinkButton(
  props: Except<ButtonProps, "render" | "role"> & { href: string },
): ReactNode {
  return <Button {...props} render="a" role="link" />;
}
