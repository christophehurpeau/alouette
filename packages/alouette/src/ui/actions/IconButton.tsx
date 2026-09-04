import type { ReactNode, Ref } from "react";
import type { View as RNView } from "react-native";
import { tv } from "tailwind-variants";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { buttonHeight } from "./Button";
import { PressableBox, type PressableBoxProps } from "./PressableBox";

const iconButtonVariants = tv(
  {
    slots: {
      frame: "shrink-0 flex-center rounded-full",
      icon: "",
    },
    variants: {
      variant: {
        contained: {},
        outlined: {},
        ghost: {},
        soft: {},
      },
      disabled: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        disabled: false,
        class: { icon: "text-on-accent" },
      },
      {
        variant: "outlined",
        disabled: false,
        class: { icon: "text-sharp" },
      },
      {
        variant: "ghost",
        disabled: false,
        class: { icon: "text-sharp" },
      },
      {
        variant: "soft",
        disabled: false,
        class: { icon: "text-sharp" },
      },
      {
        variant: "contained",
        disabled: true,
        class: { icon: "text-disabled-sharp" },
      },
      {
        variant: "outlined",
        disabled: true,
        class: { icon: "text-disabled-muted" },
      },
      {
        variant: "ghost",
        disabled: true,
        class: { icon: "text-disabled-muted" },
      },
      {
        variant: "soft",
        disabled: true,
        class: { icon: "text-disabled-muted" },
      },
    ],
    defaultVariants: { variant: "contained" },
  },
  { twMerge: false },
);

export interface IconButtonProps extends Omit<PressableBoxProps, "children"> {
  /**
   * Forwarded to the underlying `PressableBox`, so the button can anchor a
   * `Popover` or a `Menu`. React 19 carries it in with the other props.
   */
  ref?: Ref<RNView>;
  icon: SVGIconElement;
  /** Preset size token, or any number for a custom diameter (px). */
  size?: number | "md" | "sm";
  /** When "fill", the icon takes 80% of the button; default uses 50%. */
  iconSize?: "fill";
  "aria-label": string;
}

export function IconButton({
  icon,
  disabled,
  size = "md",
  iconSize,
  variant = "contained",
  className,
  ...pressableProps
}: IconButtonProps): ReactNode {
  const diameter = typeof size === "number" ? size : buttonHeight[size];
  const styles = iconButtonVariants({ variant, disabled: disabled === true });

  return (
    <PressableBox
      variant={variant}
      disabled={disabled}
      className={styles.frame({ className })}
      style={{ width: diameter, height: diameter }}
      {...pressableProps}
    >
      <Icon
        icon={icon}
        size={diameter * (iconSize === "fill" ? 0.8 : 0.55)}
        className={styles.icon()}
      />
    </PressableBox>
  );
}
