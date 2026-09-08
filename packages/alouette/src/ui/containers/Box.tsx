import type { ReactElement } from "react";
import { Children, cloneElement, forwardRef } from "react";
import {
  Pressable,
  type PressableProps,
  View as RNView,
  type ViewProps as RNViewProps,
} from "react-native";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { useSafeAreaInsets } from "../../core/useSafeAreaInsets";
import { AccentScope } from "./AccentScope";
// Allow Box to shrink when used inside HStack/VStack (matches the original
// BoxFrame default). overflow is intentionally left off so multi-layer
// box-shadows are not clipped.
export const boxBaseClasses = "shrink";

export interface BoxProps extends RNViewProps {
  accent?: AccentOrNeutral;
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
    // `translate` is deliberately outside the transition: the press is one
    // whole pixel, so it lands instantly while the ground fades, and it never
    // animates its way onto a compositing layer — which is what would redraw
    // the label (grayscale antialiasing, baseline re-snapped) and jump it.
    "transition-[background-color,border-color] duration-fast ease-in",
    "disabled:cursor-not-allowed disabled:opacity-70 aria-disabled:cursor-not-allowed aria-disabled:opacity-70",
    // A constant displacement, not a proportional one: a scale moves every
    // point in proportion to its distance from the centre, so it grew from a
    // press on a button (~1.6px per edge) into a squeeze on a full-width row
    // (~14px). Rigid, so a row's icon and its label keep their positions, and a
    // whole pixel, so the label is re-hinted on the same subpixel phase.
    "active:translate-y-px",
  ].join(" "),
  variants: {
    withFocusVisibleOutline: {
      true: "focus-visible:outline-2 focus-visible:outline-offset-2",
      // `outline-none` cannot express this: react-native-css keeps solid,
      // dotted and dashed outline styles only and drops `none`, so the
      // browser's own focus ring is overridden with a zero-width one instead.
      false: "outline-solid outline-0",
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

export const InteractiveBoxHitSlop = forwardRef<RNView, InteractiveBoxProps>(
  ({ withFocusVisibleOutline, children, className, ...rest }, ref) => {
    const child = Children.only(children) as ReactElement<RNViewProps>;
    return (
      <Pressable
        ref={ref}
        // override default behavior of Pressable which sets pointerEvents to "none" on disabled state. However this prevents cursor to display as
        pointerEvents="auto"
        className={`flex-center ${className ?? ""}`}
        {...rest}
      >
        {cloneElement(child, {
          className: interactiveBoxVariants({
            withFocusVisibleOutline,
            className: child.props.className,
          }),
        })}
      </Pressable>
    );
  },
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
