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
// row's hover/active, driven by the `group` on the pressable. The focus ring
// lives here too: the pressable fills the bar's content box, and the bar clips
// (Surface is overflow-hidden), so an outline drawn on the pressable is cut
// away — the chip's slack holds the 2px offset + 2px ring instead (6px a side
// on a row, 2px on a stacked item, which the bar's own `py-xs` completes).
// foreground — label and icon share one color set. Native resolves the icon
// tint through useColorToken, which reads the base `text-*` only, so the hover
// tint and the stacking above the chip are web-only.
const segmentedItemVariants = tv({
  slots: {
    pressable: "group flex-center min-h-[44px] rounded-xs",
    segment:
      "relative flex-row flex-center gap-xxs min-h-[32px] rounded-xs border border-transparent transition-[border-color] duration-fast ease-in group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-interactive-outlined-outline-focus",
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
      // instead of shrinking to its own label, and stands taller: a rail reads
      // as rows, not as chips floating in a column.
      vertical: {
        pressable: "items-stretch",
        segment: "self-stretch min-h-[40px]",
      },
    },
    // A stretched bar hands its extra width to its items; a stacked one already
    // spans that width, so only a row shares it.
    stretch: { true: {}, false: {} },
  },
  defaultVariants: {
    compact: false,
    orientation: "horizontal",
    stretch: false,
  },
  compoundVariants: [
    {
      stretch: true,
      orientation: "horizontal",
      // `grow`, not `flex-1`: a zero basis would make every item an equal share
      // of the bar and truncate the longer labels the moment the bar is only as
      // wide as its content. Growing from the natural width instead leaves the
      // labels intact and only shares the space a stretched bar has to spare —
      // with the chip stretching too, so the row reads as adjacent segments
      // instead of labels floating in their own space.
      class: {
        pressable: "grow items-stretch",
        segment: "self-stretch",
      },
    },
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
  /** Set by a stretched group: the item takes an equal share of the bar. */
  stretch?: boolean;
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
  stretch,
  ...props
}: SegmentedItemProps): ReactNode {
  const styles = segmentedItemVariants({
    selected,
    disabled: disabled === true,
    compact,
    orientation,
    stretch,
  });

  return (
    <InteractiveBox
      aria-label={label}
      // The chip below draws the ring (`group-focus-visible:outline-*`), so the
      // pressable carries none — a zero-width one, because react-native-css
      // drops `outline-style: none` and the browser's own ring would stay.
      withFocusVisibleOutline={false}
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
