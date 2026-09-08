import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { AccentScopeProps } from "../containers/AccentScope";
import { InteractiveBox, type InteractiveBoxProps } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { InteractiveIcon } from "../primitives/InteractiveIcon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import type {
  SegmentedOrientation,
  SegmentedVariant,
} from "./SelectionContext";

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
// foreground — label and icon share one color set, and the icon's optional
// `activeIcon` layer cross-fades on the same `group`. Native resolves the icon
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
    // indicator — a badge over the glyph's top-right, not beside it: the icon
    // chip is a circle and the lunes its 20px glyph leaves in the corners are
    // ~4px wide, too narrow to hold anything. Its halo is the chip's own fill,
    // so the badge punches out of the glyph it overlaps, and these insets keep
    // its painted circle inside the chip in both sizes the icon variant takes
    // (36px in a row, 40px stacked or stretched): 1.1px and 0.3px of clearance.
    indicator:
      "absolute right-[4px] top-[4px] z-1 flex-center size-[14px] rounded-full transition-[background-color] duration-fast ease-in",
  },
  variants: {
    selected: {
      true: {
        chip: "opacity-100",
        foreground: "text-on-emphasis",
        indicator: "bg-emphasis",
      },
      false: {
        chip: "opacity-0",
        foreground: "text-muted group-hover:text-sharp",
        // The chip is transparent here, so the halo takes what shows through it:
        // the lowered SegmentedBar behind.
        indicator: "bg-lowered",
      },
    },
    disabled: {
      true: {
        chip: "bg-interactive-contained-disabled",
        foreground: "text-disabled-muted group-hover:text-disabled-muted",
        indicator: "bg-interactive-contained-disabled",
      },
      false: { chip: "bg-emphasis shadow-s" },
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
    // Declared last so its radius and padding land after the ones `compact` and
    // `orientation` set, and win the merge.
    variant: {
      segmented: {},
      // The chip is a 40px square with no label, so the pressable carries the
      // tap target's width the way it already carries its height — the chip
      // alone is 8px short of the 44px minimum. 40 and not 32: the 4px of slack
      // that leaves on every side is exactly the focus ring (2px offset + 2px
      // width), and it is the whole frame around the chip, the bar having
      // dropped its own horizontal padding.
      icon: {
        pressable: "min-w-[44px]",
        segment: "rounded-md self-center w-[36px] min-h-[36px] px-0",
        chip: "rounded-md",
      },
    },
  },
  defaultVariants: {
    compact: false,
    orientation: "horizontal",
    stretch: false,
    variant: "segmented",
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
      // A square chip stays square whatever width the item is given, so a
      // stretched or stacked icon bar centers it instead of stretching it.
      variant: "icon",
      stretch: true,
      class: { segment: "self-center w-[40px]" },
    },
    {
      variant: "icon",
      orientation: "vertical",
      class: { segment: "self-center w-[40px] min-h-[40px]" },
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
    {
      // `disabled` is declared after `selected`, so it would hand the halo the
      // disabled chip's fill on an item that has no chip showing at all.
      selected: false,
      disabled: true,
      class: { indicator: "bg-lowered" },
    },
  ],
});

export interface SegmentedItemProps extends Omit<
  InteractiveBoxProps,
  "aria-label" | "children" | "className" | "withFocusVisibleOutline"
> {
  label: string;
  icon?: SVGIconElement;
  /**
   * Replaces `icon` while the item is hovered, focused or pressed, and for as
   * long as it is selected.
   */
  activeIcon?: SVGIconElement;
  /** Accent tinting `activeIcon`, so the glyph changes color as well as weight. */
  activeAccent?: AccentScopeProps["accent"];
  /**
   * Badge glyph pinned over the chip's top-right, in the foreground's own
   * color: a secondary state the item's `label` spells out (following the
   * system, unread changes). It adds to `icon`, it never replaces it, and it
   * renders in `variant="icon"` only — a text chip has no room for it.
   */
  indicator?: SVGIconElement;
  selected: boolean;
  /** Tighter horizontal padding, set by a compact group. */
  compact?: boolean;
  /** Set by a vertical group: the item stretches to the bar's width. */
  orientation?: SegmentedOrientation;
  /** Set by a stretched group: the item takes an equal share of the bar. */
  stretch?: boolean;
  /**
   * Set by the group. `icon` hides the label — it stays the accessible name —
   * so an item in an icon group must carry an `icon` to render anything.
   */
  variant?: SegmentedVariant;
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
  activeIcon,
  activeAccent,
  indicator,
  selected,
  disabled,
  compact,
  orientation,
  stretch,
  variant,
  ...props
}: SegmentedItemProps): ReactNode {
  const styles = segmentedItemVariants({
    selected,
    disabled: disabled === true,
    compact,
    orientation,
    stretch,
    variant,
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
          <InteractiveIcon
            icon={icon}
            activeIcon={activeIcon}
            activeAccent={activeAccent}
            active={selected}
            disabled={disabled === true}
            size={20}
            className={styles.foreground()}
          />
        ) : null}
        {variant === "icon" ? null : (
          <Text
            numberOfLines={1}
            className={styles.label({ class: styles.foreground() })}
          >
            {label}
          </Text>
        )}
        {variant === "icon" && indicator ? (
          <View className={styles.indicator()}>
            <Icon icon={indicator} size={10} className={styles.foreground()} />
          </View>
        ) : null}
      </View>
    </InteractiveBox>
  );
}
