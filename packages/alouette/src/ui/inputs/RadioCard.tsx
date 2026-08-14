import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { PressableBox } from "../actions/PressableBox";
import { DefaultAccentScope } from "../containers/DefaultAccentScope";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { RadioIndicator } from "../selection/RadioIndicator";
import { VStack } from "../stacks/stacks";
import { useRadioCardGroupVariant } from "./RadioCardGroup";
import { useRadioContext } from "./RadioContext";

// The selected card is PressableBox's `contained` fill (raised, accent) and the
// unselected one its `outlined` surface, so every rest/hover/focus/press color
// comes from the shared interactive tokens — only the foreground follows.
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
      selected: {
        true: {
          icon: "text-on-accent",
          label: "text-on-accent",
          description: "text-on-accent-muted",
        },
        false: {
          icon: "text-muted",
          label: "text-sharp",
          description: "text-muted",
        },
      },
      disabled: {
        true: {
          icon: "text-disabled-muted",
          label: "text-disabled-sharp",
          description: "text-disabled-muted",
        },
        false: {},
      },
    },
  },
  { twMerge: false },
);

export interface RadioCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: SVGIconElement;
  disabled?: boolean;
}

export function RadioCard({
  value,
  label,
  description,
  icon,
  disabled,
}: RadioCardProps): ReactNode {
  const {
    value: selectedValue,
    onSelect,
    disabled: groupDisabled,
  } = useRadioContext();
  const layout = useRadioCardGroupVariant();
  const selected = selectedValue === value;
  const isDisabled = disabled === true || groupDisabled === true;
  const styles = radioCardVariants({ layout, selected, disabled: isDisabled });

  return (
    <DefaultAccentScope>
      <PressableBox
        variant={selected ? "contained" : "outlined"}
        role="radio"
        aria-checked={selected}
        aria-disabled={isDisabled}
        aria-label={label}
        disabled={isDisabled}
        className={styles.frame()}
        onPress={() => {
          onSelect(value);
        }}
      >
        {icon ? <Icon icon={icon} size={24} className={styles.icon()} /> : null}
        <VStack className="flex-1 gap-xxs">
          <Text className={styles.label()}>{label}</Text>
          {description ? (
            <Text className={styles.description()}>{description}</Text>
          ) : null}
        </VStack>
        <RadioIndicator
          selected={selected}
          disabled={isDisabled}
          onAccent={selected}
        />
      </PressableBox>
    </DefaultAccentScope>
  );
}
