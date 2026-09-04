import { forwardRef } from "react";
import type {
  PressableProps as RNPressableProps,
  View as RNView,
} from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { InteractiveBox, interactiveBoxVariants } from "../containers/Box";

const pressableBoxVariants = tv(
  {
    extend: interactiveBoxVariants,
    base: "overflow-hidden",
    variants: {
      variant: {
        contained: [
          "rounded-sm",
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
            ? ""
            : "shadow-s bg-interactive-contained-pressable",
          "hover:bg-interactive-contained-hover",
          "focus:bg-interactive-contained-focus",
          "active:bg-interactive-contained-active",
          "disabled:bg-interactive-contained-disabled disabled:shadow-none",
          "aria-disabled:bg-interactive-contained-disabled aria-disabled:shadow-none",
          "focus-visible:outline-border-muted",
        ].join(" "),
        outlined: [
          "border bg-highlight",
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
            ? ""
            : "border-interactive-outlined-pressable",
          "hover:border-interactive-outlined-hover",
          "focus:border-interactive-outlined-focus",
          "active:border-interactive-outlined-active",
          "disabled:border-interactive-outlined-disabled",
          "aria-disabled:border-interactive-outlined-disabled",
          "focus-visible:outline-interactive-outlined-outline-focus",
        ].join(" "),
        ghost: [
          "border border-transparent",
          "hover:border hover:border-interactive-outlined-hover",
          "focus:border focus:border-interactive-outlined-focus",
          "active:border active:border-interactive-outlined-active",
          "disabled:border-interactive-outlined-disabled",
          "aria-disabled:border-interactive-outlined-disabled",
          "focus-visible:outline-interactive-outlined-outline-focus",
        ].join(" "),
        // No ground and no border at rest: the affordance is the fill arriving
        // on hover, like a listbox row (ListboxOption). The fill is a tone of
        // the surrounding surface, not the accent, so the label keeps its own
        // color. No radius either (twMerge is off here, so a variant radius
        // would collide with the caller's own).
        soft: [
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED ? "" : "bg-transparent",
          "hover:bg-interactive-soft-hover",
          "focus:bg-interactive-soft-focus",
          "active:bg-interactive-soft-active",
          "disabled:bg-transparent",
          "aria-disabled:bg-transparent",
          "focus-visible:outline-offset-0 focus-visible:outline-interactive-outlined-outline-focus",
        ].join(" "),
      },
      forceStyle: {
        hover: "",
        focus: "",
        press: "scale-[0.975]",
      },
    },
    compoundVariants: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
      ? [
          /* contained */
          {
            variant: "contained",
            forceStyle: undefined,
            ghost: false,
            className: "shadow-s bg-interactive-contained-pressable",
          },
          {
            variant: "contained",
            forceStyle: "hover",
            className: "shadow-s bg-interactive-contained-hover",
          },
          {
            variant: "contained",
            forceStyle: "focus",
            className: "shadow-s bg-interactive-contained-focus",
          },
          {
            variant: "contained",
            forceStyle: "press",
            className: "shadow-s bg-interactive-contained-active",
          },
          /* outlined */
          {
            variant: "outlined",
            forceStyle: undefined,
            ghost: false,
            className: "border-interactive-outlined-pressable",
          },
          {
            variant: "outlined",
            forceStyle: "hover",
            className: "border-interactive-outlined-hover",
          },
          {
            variant: "outlined",
            forceStyle: "focus",
            className: "border-interactive-outlined-focus",
          },
          {
            variant: "outlined",
            forceStyle: "press",
            className: "border-interactive-outlined-active",
          },
          /* ghost */
          {
            variant: "ghost",
            forceStyle: undefined,
            className: "border-transparent",
          },
          {
            variant: "ghost",
            forceStyle: "hover",
            className: "border-interactive-outlined-hover",
          },
          {
            variant: "ghost",
            forceStyle: "focus",
            className: "border-interactive-outlined-focus",
          },
          {
            variant: "ghost",
            forceStyle: "press",
            className: "border-interactive-outlined-active",
          },
          /* soft */
          {
            variant: "soft",
            forceStyle: undefined,
            className: "bg-transparent",
          },
          {
            variant: "soft",
            forceStyle: "hover",
            className: "bg-interactive-soft-hover",
          },
          {
            variant: "soft",
            forceStyle: "focus",
            className: "bg-interactive-soft-focus",
          },
          {
            variant: "soft",
            forceStyle: "press",
            className: "bg-interactive-soft-active",
          },
        ]
      : undefined,
    defaultVariants: {
      variant: "contained",
    },
  },
  { twMerge: false },
);

type PressableBoxVariantProps = VariantProps<typeof pressableBoxVariants>;

export interface PressableBoxProps
  extends RNPressableProps, PressableBoxVariantProps {
  accent?: Accent;
  className?: string;
  forceStyle?: "focus" | "hover" | "press";
  /**
   * Set it to `false` on a row of a list that already paints its cursor (a
   * menu item, a listbox option): the focus moves with the pointer there, so
   * the outline would ring whatever the mouse is over.
   */
  withFocusVisibleOutline?: boolean;
}

// TODO what is the diff between <Box interactive> and PressableBox ?
export const PressableBox = forwardRef<RNView, PressableBoxProps>(
  (
    {
      className,
      variant,
      forceStyle,
      accent,
      withFocusVisibleOutline = true,
      ...props
    },
    ref,
  ) => {
    return (
      <AccentScope accent={accent}>
        <InteractiveBox
          ref={ref}
          withFocusVisibleOutline={withFocusVisibleOutline}
          role="button"
          className={pressableBoxVariants({
            variant,

            className,
            forceStyle,
          })}
          {...props}
        />
      </AccentScope>
    );
  },
);
