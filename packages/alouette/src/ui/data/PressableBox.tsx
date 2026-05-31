import { forwardRef } from "react";
import type {
  PressableProps as RNPressableProps,
  View as RNView,
} from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { SemanticRole } from "../../core/AlouetteConfig";
import { InteractiveBox, interactiveBoxVariants } from "../containers/Box";
import { SemanticScope } from "../containers/SemanticScope";

const pressableBoxVariants = tv(
  {
    extend: interactiveBoxVariants,
    base: ["overflow-hidden"].join(" "),
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
          "disabled:bg-interactive-contained-disabled",
          "focus-visible:outline-border-muted",
        ].join(" "),
        outlined: [
          "border",
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
            ? ""
            : "border-interactive-outlined-pressable",
          "hover:border-interactive-outlined-hover",
          "focus:border-interactive-outlined-focus",
          "active:border-interactive-outlined-active",
          "disabled:border-interactive-outlined-disabled",
          "focus-visible:outline-interactive-outlined-outline-focus",
        ].join(" "),
      },
      ghost: {
        true: "bg-transparent border-transparent shadow-none",
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
  semanticRole?: SemanticRole;
  className?: string;
  forceStyle?: "focus" | "hover" | "press";
}

// TODO what is the diff between <Box interactive> and PressableBox ?
export const PressableBox = forwardRef<RNView, PressableBoxProps>(
  (
    { className, variant, ghost = false, forceStyle, semanticRole, ...props },
    ref,
  ) => {
    return (
      <SemanticScope semanticRole={semanticRole}>
        <InteractiveBox
          ref={ref}
          withFocusVisibleOutline
          role="button"
          className={pressableBoxVariants({
            variant,
            ghost,
            className,
            forceStyle,
          })}
          {...props}
        />
      </SemanticScope>
    );
  },
);
