import { forwardRef } from "react";
import type {
  PressableProps as RNPressableProps,
  View as RNView,
} from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { AccentOrNeutral } from "../../core/AlouetteConfig";
import { AccentScope } from "../containers/AccentScope";
import { InteractiveBox, interactiveBoxVariants } from "../containers/Box";
import { useTonalGroundWarningRef } from "./useTonalGroundWarningRef";

const pressableBoxVariants = tv(
  {
    extend: interactiveBoxVariants,
    // `group`: a child styles itself from the pressable's state — the icon
    // swapped by InteractiveIcon, and anything an app composes on top.
    base: "group overflow-hidden",
    variants: {
      variant: {
        // Lifted off the page it sits on: the ground is a tone of the theme —
        // the lightest step when neutral, a pale tone of the accent when
        // accented — and the accent is carried by the `text-on-tonal` ink.
        tonal: [
          "rounded-sm",
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
            ? ""
            : "shadow-s bg-interactive-tonal-pressable",
          "hover:bg-interactive-tonal-hover",
          "focus:bg-interactive-tonal-focus",
          "active:shadow-lowered active:bg-interactive-tonal-active",
          "disabled:bg-interactive-tonal-disabled disabled:shadow-none",
          "aria-disabled:bg-interactive-tonal-disabled aria-disabled:shadow-none",
          "focus-visible:outline-border-muted",
        ].join(" "),
        // The accent's own fill, flat, under `text-on-accent` ink — the neutral
        // one is the grayscale accent, a dark ground carrying white ink.
        filled: [
          "rounded-sm",
          process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
            ? ""
            : "bg-interactive-filled-pressable",
          "hover:bg-interactive-filled-hover",
          "focus:bg-interactive-filled-focus",
          "active:shadow-lowered active:bg-interactive-filled-active",
          "disabled:bg-interactive-filled-disabled",
          "aria-disabled:bg-interactive-filled-disabled",
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
        press: "translate-y-px",
      },
    },
    compoundVariants: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED
      ? [
          /* tonal */
          {
            variant: "tonal",
            forceStyle: undefined,
            className: "shadow-s bg-interactive-tonal-pressable",
          },
          {
            variant: "tonal",
            forceStyle: "hover",
            className: "shadow-s bg-interactive-tonal-hover",
          },
          {
            variant: "tonal",
            forceStyle: "focus",
            className: "shadow-s bg-interactive-tonal-focus",
          },
          {
            variant: "tonal",
            forceStyle: "press",
            className: "shadow-lowered bg-interactive-tonal-active",
          },
          /* filled */
          {
            variant: "filled",
            forceStyle: undefined,
            className: "bg-interactive-filled-pressable",
          },
          {
            variant: "filled",
            forceStyle: "hover",
            className: "bg-interactive-filled-hover",
          },
          {
            variant: "filled",
            forceStyle: "focus",
            className: "bg-interactive-filled-focus",
          },
          {
            variant: "filled",
            forceStyle: "press",
            className: "shadow-lowered bg-interactive-filled-active",
          },
          /* outlined */
          {
            variant: "outlined",
            forceStyle: undefined,
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
      variant: "tonal",
    },
  },
  { twMerge: false },
);

type PressableBoxVariantProps = VariantProps<typeof pressableBoxVariants>;

export type PressableBoxVariant = NonNullable<
  PressableBoxVariantProps["variant"]
>;

export interface PressableBoxProps
  extends RNPressableProps, PressableBoxVariantProps {
  /** `"neutral"` drops an accent inherited from an ancestor and renders the
   * neutral interactive tokens — the secondary action beside an accented one. */
  accent?: AccentOrNeutral;
  className?: string;
  /**
   * Destination. react-native-web renders a real `<a>` for it; native ignores
   * it, so a native app routes from `onPress` — expo Router's `<Link asChild>`
   * injects both. Giving one turns the default `role` into `"link"`; a
   * component that needs another one (a `menuitem`) still passes its own.
   */
  href?: string;
  /**
   * Defaults to `"link"` when `href` is set and `"button"` otherwise.
   */
  role?: RNPressableProps["role"];
  forceStyle?: "focus" | "hover" | "press";
  /**
   * Set it to `false` on a row of a list that already paints its cursor (a
   * menu item, a listbox option): the focus moves with the pointer there, so
   * the outline would ring whatever the mouse is over.
   */
  withFocusVisibleOutline?: boolean;
}

/**
 * `InteractiveBox` with a material: the `variant`'s `interactive-*` states, an
 * accent scope, and a `link` role when it has an `href`.
 */
export const PressableBox = forwardRef<RNView, PressableBoxProps>(
  (
    {
      className,
      variant,
      forceStyle,
      accent,
      href,
      role,
      withFocusVisibleOutline = true,
      ...props
    },
    ref,
  ) => {
    const warningRef = useTonalGroundWarningRef(ref, {
      variant,
      disabled: props.disabled === true,
      forced: forceStyle !== undefined,
    });

    return (
      <AccentScope accent={accent}>
        <InteractiveBox
          ref={warningRef}
          withFocusVisibleOutline={withFocusVisibleOutline}
          role={role ?? (href === undefined ? "button" : "link")}
          className={pressableBoxVariants({
            variant,
            withPressEffect: !props.disabled,
            className,
            forceStyle,
          })}
          href={href}
          {...props}
        />
      </AccentScope>
    );
  },
);
