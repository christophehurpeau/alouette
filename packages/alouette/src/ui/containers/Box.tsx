import type { ReactElement, ReactNode, Ref } from "react";
import { Children, cloneElement } from "react";
import {
  Pressable,
  type PressableProps,
  View as RNView,
  type ViewProps as RNViewProps,
} from "react-native";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { twMerge } from "../../core/twMerge";
import { useSafeAreaInsets } from "../../core/useSafeAreaInsets";
import { AccentScope } from "./AccentScope";
// Allow Box to shrink inside a flex row or column (react-native-web's View
// defaults to flex-shrink: 0). overflow is intentionally left off so multi-layer
// box-shadows are not clipped.
export const boxBaseClasses = "shrink";

export interface BoxProps extends RNViewProps {
  accent?: AccentOrNeutral;
  ref?: Ref<RNView>;
}

export function Box({ className, accent, ...props }: BoxProps): ReactNode {
  return (
    <AccentScope accent={accent}>
      <RNView className={twMerge(boxBaseClasses, className)} {...props} />
    </AccentScope>
  );
}

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
  ].join(" "),
  variants: {
    // A constant displacement, not a proportional one: a scale moves every
    // point in proportion to its distance from the centre, so it would grow from
    // a press on a button (~1.6px per edge) into a squeeze on a full-width row
    // (~14px). Rigid, so a row's icon and its label keep their positions, and a
    // whole pixel, so the label is re-hinted on the same subpixel phase.
    // Off for a bare label row (Radio, Checkbox): its indicator takes the press
    // through `group-active:` instead, so the text never moves.
    withPressEffect: {
      true: "active:translate-y-px",
      false: "",
    },
    // The keyboard focus ring (`focus-ring`, in the accent ink), on
    // `focus-visible` only so a mouse click leaves no residue. `inset` draws it inside the edge: for a raised control
    // (PressableBox's tonal material picks it) and for a pressable whose
    // parent clips (`surface` is overflow-hidden).
    withFocusVisibleOutline: {
      true: "focus-visible:focus-ring",
      inset: "focus-visible:focus-ring-inset",
      // `outline-none` cannot express this: react-native-css keeps solid,
      // dotted and dashed outline styles only and drops `none`, so the
      // browser's own focus ring is overridden with a zero-width one instead.
      false: "outline-solid outline-0",
    },
  },
  defaultVariants: { withPressEffect: true },
});

export interface InteractiveBoxProps
  extends VariantProps<typeof interactiveBoxVariants>, PressableProps {
  ref?: Ref<RNView>;
}

export function InteractiveBox({
  withFocusVisibleOutline,
  withPressEffect,
  className,
  ...rest
}: InteractiveBoxProps): ReactNode {
  return (
    <Pressable
      // Pressable sets pointerEvents to "none" while disabled, which would hide
      // the not-allowed cursor.
      pointerEvents="auto"
      {...rest}
      className={interactiveBoxVariants({
        withFocusVisibleOutline,
        withPressEffect: rest.disabled ? false : withPressEffect,
        className,
      })}
    />
  );
}

export function InteractiveBoxHitSlop({
  withFocusVisibleOutline,
  withPressEffect,
  children,
  className,
  ...rest
}: InteractiveBoxProps): ReactNode {
  const child = Children.only(children) as ReactElement<RNViewProps>;
  return (
    <Pressable
      // Pressable sets pointerEvents to "none" while disabled, which would hide
      // the not-allowed cursor.
      pointerEvents="auto"
      className={`flex-center ${className ?? ""}`}
      {...rest}
    >
      {cloneElement(child, {
        className: interactiveBoxVariants({
          withFocusVisibleOutline,
          withPressEffect: rest.disabled ? false : withPressEffect,
          className: child.props.className,
        }),
      })}
    </Pressable>
  );
}

export type SafeAreaBoxProps = Omit<BoxProps, "style">;

export function SafeAreaBox(props: SafeAreaBoxProps): ReactNode {
  const insets = useSafeAreaInsets();
  return (
    <Box
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      {...props}
    />
  );
}
