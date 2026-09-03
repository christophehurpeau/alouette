import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { InteractiveBox, type InteractiveBoxProps } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import type { SegmentedOrientation } from "./SelectionContext";

// chip — the selected layer is raised and cross-fades on opacity so the
// background and shadow animate together with no border. Swapping a bordered
// variant instead would flash a border on the outgoing segment mid-transition.
// segment — the visible chip is shorter than the 44px pressable, so the lowered
// SegmentedBar shows around it as an inset frame while the tap target stays
// 44px. Its border is permanently transparent and only animates color on the
// row's hover/active, driven by the `group` on the pressable.
// foreground — label and icon share one color set. Native resolves the icon
// tint through useColorToken, which reads the base `text-*` only, so the hover
// tint and the stacking above the chip are web-only.
const segmentedItemVariants = tv({
  slots: {
    pressable:
      "group flex-center min-h-[44px] rounded-xs focus-visible:outline-interactive-outlined-outline-focus",
    segment:
      "relative flex-row flex-center gap-xxs min-h-[32px] rounded-xs border border-transparent transition-[border-color] duration-fast ease-in",
    chip: "absolute inset-0 rounded-xs transition-opacity duration-fast ease-in",
    foreground: "z-1 transition-[color] duration-fast ease-in",
    label: "select-none font-body-bold text-base text-center",
  },
  variants: {
    selected: {
      true: { chip: "opacity-100", foreground: "text-on-accent" },
      false: {
        chip: "opacity-0",
        foreground: "text-muted group-hover:text-sharp",
      },
    },
    disabled: {
      true: {
        chip: "bg-interactive-contained-disabled",
        foreground: "text-disabled-muted group-hover:text-disabled-muted",
      },
      false: { chip: "bg-interactive-contained-pressable shadow-s" },
    },
    compact: { true: { segment: "px-xs" }, false: { segment: "px-m" } },
    orientation: {
      horizontal: {},
      // A stacked item spans the bar's width, so the chip stretches with it
      // instead of shrinking to its own label.
      vertical: { pressable: "items-stretch", segment: "self-stretch" },
    },
  },
  defaultVariants: { compact: false, orientation: "horizontal" },
  compoundVariants: [
    {
      selected: false,
      disabled: false,
      class: {
        segment:
          "group-hover:border-interactive-outlined-hover group-active:border-interactive-outlined-active",
      },
    },
    {
      selected: true,
      disabled: true,
      class: {
        foreground: "text-disabled-sharp group-hover:text-disabled-sharp",
      },
    },
  ],
});

export interface SegmentedItemProps extends Omit<
  InteractiveBoxProps,
  "aria-label" | "children" | "className" | "withFocusVisibleOutline"
> {
  label: string;
  icon?: SVGIconElement;
  selected: boolean;
  /** Tighter horizontal padding, set by a compact group. */
  compact?: boolean;
  /** Set by a vertical group: the item stretches to the bar's width. */
  orientation?: SegmentedOrientation;
  /**
   * react-native's types have no `aria-current` / `aria-controls` / `href`, but
   * react-native-web forwards all three (an `href` makes it render an `<a>`) and
   * native ignores unknown props — declared here for `NavBarItem` and `Tab`.
   */
  "aria-current"?: "page";
  "aria-controls"?: string;
  href?: string;
}

export function SegmentedItem({
  label,
  icon,
  selected,
  disabled,
  compact,
  orientation,
  ...props
}: SegmentedItemProps): ReactNode {
  const styles = segmentedItemVariants({
    selected,
    disabled: disabled === true,
    compact,
    orientation,
  });

  return (
    <InteractiveBox
      withFocusVisibleOutline
      aria-label={label}
      disabled={disabled}
      className={styles.pressable()}
      {...props}
    >
      <View className={styles.segment()}>
        <View className={styles.chip()} />
        {icon ? (
          <Icon icon={icon} size={20} className={styles.foreground()} />
        ) : null}
        <Text
          numberOfLines={1}
          className={styles.label({ class: styles.foreground() })}
        >
          {label}
        </Text>
      </View>
    </InteractiveBox>
  );
}
