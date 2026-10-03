import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { PressableBox } from "../actions/PressableBox";
import { DefaultAccentScope } from "../containers/DefaultAccentScope";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { RadioIndicator } from "../selection/RadioIndicator";
import { SelectionAccentScope } from "../selection/SelectionAccentScope";
import { useRadioCardGroupAppearance } from "./RadioCardGroup";
import { useRadioContext } from "./RadioContext";

// Every card is the group's PressableBox material (`tonal` or `outlined`) and
// selection only swaps the accent: the selected card keeps it, the others take
// the neutral theme. Every rest/hover/focus/press color comes from the shared
// interactive tokens — only the foreground follows the material.
const radioCardVariants = tv(
  {
    slots: {
      frame: "flex-row gap-m rounded-sm p-m min-h-[44px]",
      icon: "",
      label: "font-body-bold text-base",
      description: "text-sm",
    },
    variants: {
      // In a wrapping group the cards share each row instead of sizing to text,
      // and the icon and the indicator hold the card's top corners.
      layout: {
        list: { frame: "items-center" },
        stack: { frame: "items-start grow shrink basis-[240px]" },
      },
      variant: { tonal: {}, outlined: {} },
      selected: { true: {}, false: {} },
      disabled: {
        true: {
          icon: "text-disabled-muted",
          label: "text-disabled-sharp",
          description: "text-disabled-muted",
        },
        false: {},
      },
    },
    // The material's inks are enabled-only: without tailwind-merge, the
    // stylesheet order would let them win over the disabled ones, and a disabled
    // selected card would keep the accent's.
    compoundVariants: [
      {
        variant: "tonal",
        disabled: false,
        class: { icon: "text-on-tonal", label: "text-on-tonal" },
      },
      // `muted` is too dim for an accented tonal ground: the selected card's
      // description takes the label's ink.
      {
        variant: "tonal",
        selected: true,
        disabled: false,
        class: { description: "text-on-tonal" },
      },
      {
        variant: "tonal",
        selected: false,
        disabled: false,
        class: { description: "text-muted" },
      },
      {
        variant: "outlined",
        disabled: false,
        class: {
          icon: "text-muted",
          label: "text-sharp",
          description: "text-muted",
        },
      },
    ],
  },
  { twMerge: false },
);

export interface RadioCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: SVGIconElement;
  disabled?: boolean;
  className?: string;
}

export function RadioCard({
  value,
  label,
  description,
  icon,
  disabled,
  className,
}: RadioCardProps): ReactNode {
  const {
    value: selectedValue,
    onSelect,
    disabled: groupDisabled,
  } = useRadioContext();
  const { layout, variant } = useRadioCardGroupAppearance();
  const selected = selectedValue === value;
  const isDisabled = disabled === true || groupDisabled === true;
  const styles = radioCardVariants({
    layout,
    variant,
    selected,
    disabled: isDisabled,
  });

  return (
    <DefaultAccentScope>
      <SelectionAccentScope selected={selected}>
        <PressableBox
          variant={variant}
          role="radio"
          aria-checked={selected}
          aria-disabled={isDisabled}
          aria-label={label}
          disabled={isDisabled}
          className={styles.frame({ className })}
          onPress={() => {
            onSelect(value);
          }}
        >
          {icon ? (
            <View className="self-start">
              <Icon icon={icon} size={24} className={styles.icon()} />
            </View>
          ) : null}
          <View className="flex-1 gap-xxs">
            <Text className={styles.label()}>{label}</Text>
            {description ? (
              <Text className={styles.description()}>{description}</Text>
            ) : null}
          </View>
          <RadioIndicator selected={selected} disabled={isDisabled} />
        </PressableBox>
      </SelectionAccentScope>
    </DefaultAccentScope>
  );
}
