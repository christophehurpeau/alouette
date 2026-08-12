import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { InteractiveBox, type InteractiveBoxProps } from "../containers/Box";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";

// The selected chip is a raised layer that cross-fades on opacity so the
// background and shadow animate together with no border. Swapping a bordered
// variant instead would flash a border on the outgoing segment mid-transition.
const chipVariants = tv({
  base: "absolute inset-0 rounded-xs transition-opacity duration-fast ease-in",
  variants: {
    selected: {
      true: "opacity-100",
      false: "opacity-0",
    },
    disabled: {
      true: "bg-interactive-contained-disabled",
      false: "bg-interactive-contained-pressable shadow-s",
    },
  },
});

// The visible chip is shorter than the 44px pressable, so the lowered
// SegmentedBar shows around it as an inset frame while the tap target stays
// 44px. Its border is permanently transparent and only animates color on the
// row's hover/active, driven by the `group` on the pressable.
const segmentVariants = tv({
  base: "relative flex-row flex-center gap-xxs min-h-[32px] rounded-xs border border-transparent px-m transition-[border-color] duration-fast ease-in",
  variants: {
    selected: { true: "", false: "" },
    disabled: { true: "", false: "" },
  },
  compoundVariants: [
    {
      selected: false,
      disabled: false,
      class:
        "group-hover:border-interactive-outlined-hover group-active:border-interactive-outlined-active",
    },
  ],
});

// Label and icon share one color set. Native resolves the icon tint through
// useColorToken, which reads the base `text-*` only, so the hover tint and the
// stacking above the chip are web-only.
const foregroundVariants = tv({
  base: "z-1 transition-[color] duration-fast ease-in",
  variants: {
    selected: {
      true: "text-on-accent",
      false: "text-muted group-hover:text-sharp",
    },
    disabled: {
      true: "text-disabled-muted group-hover:text-disabled-muted",
      false: "",
    },
  },
  compoundVariants: [
    {
      selected: true,
      disabled: true,
      class: "text-disabled-sharp group-hover:text-disabled-sharp",
    },
  ],
});

const labelVariants = tv({
  extend: foregroundVariants,
  base: "select-none font-body-bold text-base text-center",
});

export interface SegmentedItemProps extends Omit<
  InteractiveBoxProps,
  "aria-label" | "children" | "className" | "withFocusVisibleOutline"
> {
  label: string;
  icon?: SVGIconElement;
  selected: boolean;
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
  ...props
}: SegmentedItemProps): ReactNode {
  const isDisabled = disabled === true;

  return (
    <InteractiveBox
      withFocusVisibleOutline
      aria-label={label}
      disabled={disabled}
      className="group flex-center min-h-[44px] rounded-xs focus-visible:outline-interactive-outlined-outline-focus"
      {...props}
    >
      <View className={segmentVariants({ selected, disabled: isDisabled })}>
        <View className={chipVariants({ selected, disabled: isDisabled })} />
        {icon ? (
          <Icon
            icon={icon}
            size={20}
            className={foregroundVariants({ selected, disabled: isDisabled })}
          />
        ) : null}
        <Text
          numberOfLines={1}
          className={labelVariants({ selected, disabled: isDisabled })}
        >
          {label}
        </Text>
      </View>
    </InteractiveBox>
  );
}
