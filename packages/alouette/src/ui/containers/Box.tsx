import { forwardRef } from "react";
import {
  Pressable,
  type PressableProps,
  View as RNView,
  type ViewProps as RNViewProps,
} from "react-native";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import { useSafeAreaInsets } from "../../core/useSafeAreaInsets";
import {
  type BoxVariantProps,
  boxBaseClasses,
  boxVariants,
} from "./boxVariants";

export interface BoxProps extends RNViewProps, BoxVariantProps {}

export const Box = forwardRef<RNView, BoxProps>(
  ({ className, layer, shadow, tint, absoluteFill, center, ...props }, ref) => {
    if (
      process.env.NODE_ENV !== "production" &&
      shadow === "lowered" &&
      layer !== "lowered"
    ) {
      console.error(
        'alouette Box: shadow="lowered" must only be used with layer="lowered"',
      );
    }

    return (
      <RNView
        ref={ref}
        className={boxVariants({
          layer,
          shadow,
          tint,
          absoluteFill,
          center,
          className,
        })}
        {...props}
      />
    );
  },
);

export const interactiveBoxVariants = tv({
  // TODO is it possible to define transition utilities
  base: [
    boxBaseClasses,
    "cursor-pointer",
    "transition-[transform,background-color,border-color] duration-200 ease-in",
    "disabled:cursor-not-allowed disabled:opacity-70",
    "active:scale-[0.975]",
  ].join(" "),
  variants: {
    withFocusVisibleOutline: {
      true: "focus-visible:outline-2 focus-visible:outline-offset-2",
    },
  },
});

export interface InteractiveBoxProps
  extends VariantProps<typeof interactiveBoxVariants>, PressableProps {}

export const InteractiveBox = forwardRef<RNView, InteractiveBoxProps>(
  ({ withFocusVisibleOutline, className, ...rest }, ref) => (
    <Pressable
      ref={ref}
      // override default behavior of Pressable which sets pointerEvents to "none" on disabled state. However this prevents cursor to display as
      pointerEvents="auto"
      {...rest}
      className={interactiveBoxVariants({ withFocusVisibleOutline, className })}
    />
  ),
);

export type SafeAreaBoxProps = Omit<BoxProps, "style">;

export const SafeAreaBox = forwardRef<RNView, SafeAreaBoxProps>(
  (props, ref) => {
    const insets = useSafeAreaInsets();
    return (
      <Box
        ref={ref}
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        {...props}
      />
    );
  },
);
