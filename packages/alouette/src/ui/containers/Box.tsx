import { forwardRef } from "react";
import {
  Pressable,
  type PressableProps,
  View as RNView,
  type ViewProps as RNViewProps,
} from "react-native";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { useSafeAreaInsets } from "../../core/useSafeAreaInsets";
import { AccentScope } from "./AccentScope";
// Allow Box to shrink when used inside HStack/VStack (matches the original
// BoxFrame default). overflow is intentionally left off so multi-layer
// box-shadows are not clipped.
export const boxBaseClasses = "shrink";

export interface BoxProps extends RNViewProps {
  accent?: Accent;
}

export const Box = forwardRef<RNView, BoxProps>(
  ({ className, accent, ...props }, ref) => {
    return (
      <AccentScope accent={accent}>
        <RNView
          ref={ref}
          className={`${boxBaseClasses} ${className ?? ""}`}
          {...props}
        />
      </AccentScope>
    );
  },
);

export const interactiveBoxVariants = tv({
  base: [
    boxBaseClasses,
    "cursor-pointer",
    "transition-[transform,background-color,border-color] duration-200 ease-in",
    "disabled:cursor-not-allowed disabled:opacity-70 aria-disabled:cursor-not-allowed aria-disabled:opacity-70",
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
