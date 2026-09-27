import type { ReactNode, Ref } from "react";
import type { View as RNView } from "react-native";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import type { SVGIconElement } from "../primitives/Icon";
import { InteractiveIcon } from "../primitives/InteractiveIcon";
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
        tonal: {},
        filled: {},
        soft: {},
      },
      disabled: {
        true: {},
        false: {},
      },
      forced: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      {
        variant: "tonal",
        disabled: false,
        class: { icon: "text-on-tonal" },
      },
      {
        variant: "filled",
        disabled: false,
        class: { icon: "text-on-accent" },
      },
      // No ground to carry the accent at rest, so the glyph takes it once the
      // soft fill arrives. Native resolves only the first `text-*` class.
      {
        variant: "soft",
        disabled: false,
        forced: false,
        class: {
          icon: "text-sharp transition-colors duration-fast group-hover:text-accent group-focus:text-accent group-active:text-accent",
        },
      },
      {
        variant: "soft",
        disabled: false,
        forced: true,
        class: { icon: "text-accent" },
      },
      {
        variant: ["tonal", "filled"],
        disabled: true,
        class: { icon: "text-disabled-sharp" },
      },
      {
        variant: "soft",
        disabled: true,
        class: { icon: "text-disabled-muted" },
      },
    ],
    defaultVariants: { variant: "tonal" },
  },
  { twMerge: false },
);

export interface IconButtonProps extends Omit<
  PressableBoxProps,
  "children" | "variant"
> {
  variant?: VariantProps<typeof iconButtonVariants>["variant"];
  /**
   * Forwarded to the underlying `PressableBox`, so the button can anchor a
   * `Popover` or a `Menu`. React 19 carries it in with the other props.
   */
  ref?: Ref<RNView>;
  icon: SVGIconElement;
  /** Replaces `icon` while the button is hovered, focused or pressed. */
  activeIcon?: SVGIconElement;
  /** Preset size token, or any number for a custom diameter (px). */
  size?: number | "md" | "sm";
  /** When "fill", the icon takes 80% of the button; default uses 50%. */
  iconSize?: "fill";
  "aria-label": string;
}

export function IconButton({
  icon,
  activeIcon,
  disabled,
  size = "md",
  iconSize,
  variant,
  className,
  forceStyle,
  ...pressableProps
}: IconButtonProps): ReactNode {
  const diameter = typeof size === "number" ? size : buttonHeight[size];
  const styles = iconButtonVariants({
    variant,
    disabled: disabled === true,
    forced: forceStyle !== undefined,
  });

  return (
    <PressableBox
      variant={variant}
      disabled={disabled}
      forceStyle={forceStyle}
      className={styles.frame({ className })}
      style={{ width: diameter, height: diameter }}
      {...pressableProps}
    >
      <InteractiveIcon
        icon={icon}
        activeIcon={activeIcon}
        // A pinned state in a story has to swap the glyph too, the CSS
        // hover/focus/press the swap listens on never firing there.
        active={forceStyle !== undefined}
        disabled={disabled === true}
        size={diameter * (iconSize === "fill" ? 0.8 : 0.55)}
        className={styles.icon()}
      />
    </PressableBox>
  );
}
