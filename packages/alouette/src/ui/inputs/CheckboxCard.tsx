import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { PressableBox } from "../actions/PressableBox";
import { DefaultAccentScope } from "../containers/DefaultAccentScope";
import { Icon, type SVGIconElement } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import { View } from "../primitives/View";
import { CheckboxIndicator } from "../selection/CheckboxIndicator";
import { SelectionAccentScope } from "../selection/SelectionAccentScope";
import { useCheckboxCardGroupAppearance } from "./CheckboxCardGroup";
import { useCheckboxContext } from "./CheckboxContext";

// Same material as RadioCard: every card is the group's PressableBox variant,
// a checked card keeps the accent and an unchecked one takes the neutral theme.
const checkboxCardVariants = tv(
  {
    slots: {
      frame: "flex-row gap-m rounded-sm p-m min-h-[44px]",
      icon: "",
      label: "font-body-bold text-base",
      description: "text-sm",
    },
    variants: {
      layout: {
        list: { frame: "items-center" },
        stack: { frame: "items-start grow shrink basis-[240px]" },
      },
      variant: {
        contained: {
          icon: "text-on-accent",
          label: "text-on-accent",
          description: "text-on-accent-muted",
        },
        outlined: {
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
    // Same as RadioCard: `on-accent-muted` falls under 4.5:1 on the hover fill.
    compoundVariants: [
      {
        variant: "contained",
        disabled: false,
        class: {
          description:
            "group-hover:text-on-accent group-focus:text-on-accent group-active:text-on-accent",
        },
      },
    ],
  },
  { twMerge: false },
);

export interface CheckboxCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: SVGIconElement;
  disabled?: boolean;
  className?: string;
}

export function CheckboxCard({
  value,
  label,
  description,
  icon,
  disabled,
  className,
}: CheckboxCardProps): ReactNode {
  const { values, onToggle, disabled: groupDisabled } = useCheckboxContext();
  const { layout, variant } = useCheckboxCardGroupAppearance();
  const selected = values.includes(value);
  const isDisabled = disabled === true || groupDisabled === true;
  const styles = checkboxCardVariants({
    layout,
    variant,
    disabled: isDisabled,
  });

  return (
    <DefaultAccentScope>
      <SelectionAccentScope selected={selected}>
        <PressableBox
          variant={variant}
          role="checkbox"
          aria-checked={selected}
          aria-disabled={isDisabled}
          aria-label={label}
          disabled={isDisabled}
          className={styles.frame({ className })}
          onPress={() => {
            onToggle(value);
          }}
        >
          {icon ? (
            <Icon icon={icon} size={24} className={styles.icon()} />
          ) : null}
          <View className="flex-1 gap-xxs">
            <Text className={styles.label()}>{label}</Text>
            {description ? (
              <Text className={styles.description()}>{description}</Text>
            ) : null}
          </View>
          <CheckboxIndicator
            selected={selected}
            disabled={isDisabled}
            onAccent={variant === "contained"}
          />
        </PressableBox>
      </SelectionAccentScope>
    </DefaultAccentScope>
  );
}
