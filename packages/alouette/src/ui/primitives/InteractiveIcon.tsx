import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { AccentScopeProps } from "../containers/AccentScope";
import { AccentScope } from "../containers/AccentScope";
import { Icon, type IconProps, type SVGIconElement } from "./Icon";
import { View } from "./View";

// Two stacked glyphs cross-fading on opacity, the same material as the
// SegmentedItem chip: the swap has to be CSS, driven by the `group` on the
// enclosing pressable, because a JS hover state would re-render the whole row.
// The opacity classes live on wrapping Views and never on Icon — Icon drops its
// className on native and only resolves the `text-*` tint from it.
const interactiveIconVariants = tv({
  slots: {
    frame: "relative shrink-0",
    rest: "transition-opacity duration-fast ease-in group-hover:opacity-0 group-focus:opacity-0 group-active:opacity-0",
    active:
      "absolute inset-0 opacity-0 transition-opacity duration-fast ease-in group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100",
  },
  variants: {
    active: {
      true: { rest: "opacity-0", active: "opacity-100" },
      false: {},
    },
  },
  defaultVariants: { active: false },
});

export interface InteractiveIconProps extends IconProps {
  /**
   * Rendered in place of `icon` while the enclosing pressable group is hovered,
   * focused or pressed, and permanently when `active`. Typically the duotone
   * twin of `icon`.
   */
  activeIcon?: SVGIconElement;
  /**
   * Accent tinting `activeIcon`, so the glyph changes color as well as weight.
   * `none` resets to the base mode's accent under an accented ancestor.
   */
  activeAccent?: AccentScopeProps["accent"];
  /** Persistent active state: the current page, the selected segment. */
  active?: boolean;
  /** A disabled control gives no affordance, so it never swaps. */
  disabled?: boolean;
}

/**
 * Icon that swaps to `activeIcon` on the enclosing pressable's
 * hover/focus/press state. The pressable must carry the `group` class —
 * `PressableBox` and `SegmentedItem` both do.
 */
export function InteractiveIcon({
  icon,
  activeIcon,
  activeAccent,
  active = false,
  disabled = false,
  size = 20,
  className = "text-sharp",
}: InteractiveIconProps): ReactNode {
  if (activeIcon === undefined || disabled) {
    return (
      <Icon
        icon={active && activeIcon ? activeIcon : icon}
        size={size}
        className={className}
      />
    );
  }

  const styles = interactiveIconVariants({ active });
  // An accent only reaches a glyph through `text-accent`: the resting tints
  // (`text-sharp`, `text-muted`) are grayscale-only tokens that an accent theme
  // never redeclares, so scoping alone would be inert. Same pairing as Button's
  // terminal icon.
  const activeClassName = activeAccent ? "text-accent" : className;

  return (
    <View
      className={styles.frame({ className })}
      style={{ width: size, height: size }}
    >
      <View className={styles.rest()}>
        <Icon icon={icon} size={size} className={className} />
      </View>
      <View className={styles.active()}>
        <AccentScope accent={activeAccent}>
          <Icon icon={activeIcon} size={size} className={activeClassName} />
        </AccentScope>
      </View>
    </View>
  );
}
