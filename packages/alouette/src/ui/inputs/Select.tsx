import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";
import { type ReactNode, useState } from "react";
import { Modal, Pressable, useWindowDimensions } from "react-native";
import { tv } from "tailwind-variants";
import { AccentScope } from "../containers/AccentScope";
import { InteractiveBox } from "../containers/Box";
import { Surface } from "../containers/Surface";
import { Icon } from "../primitives/Icon";
import { ScrollView } from "../primitives/ScrollView";
import { Text } from "../primitives/Text";
import {
  type SelectOption,
  type SelectProps,
  SelectTriggerContent,
  selectTriggerBaseClassName,
  useControllableValue,
} from "./Select.shared";

const triggerVariants = tv(
  {
    base: selectTriggerBaseClassName,
    variants: {
      // bg lives in each branch (not the shared base) so the disabled bg never
      // competes with bg-highlight at equal specificity.
      disabled: {
        true: "bg-disabled-interactive-muted border-interactive-outlined-disabled",
        false: [
          "bg-highlight",
          "border-interactive-outlined-pressable",
          "hover:border-interactive-outlined-hover",
          "focus:border-interactive-outlined-focus",
          "active:border-interactive-outlined-active",
        ].join(" "),
      },
    },
    defaultVariants: { disabled: false },
  },
  { twMerge: false },
);

const optionVariants = tv(
  {
    base: [
      "flex-row items-center justify-between gap-xxs rounded-xs px-m py-m my-xxs",
      "hover:bg-interactive-contained-hover focus:bg-interactive-contained-focus active:bg-interactive-contained-active",
    ].join(" "),
    variants: {
      selected: {
        true: "bg-interactive-contained-active",
        false: "bg-interactive-contained-pressable",
      },
      disabled: {
        true: "opacity-50",
        false: "",
      },
    },
    defaultVariants: { selected: false, disabled: false },
  },
  { twMerge: false },
);

interface SelectOptionRowProps {
  option: SelectOption;
  selected: boolean;
  onSelect: (value: string) => void;
}

function SelectOptionRow({
  option,
  selected,
  onSelect,
}: SelectOptionRowProps): ReactNode {
  return (
    <Pressable
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled === true}
      disabled={option.disabled}
      className={optionVariants({ selected, disabled: option.disabled })}
      onPress={() => {
        onSelect(option.value);
      }}
    >
      <Text numberOfLines={1} className="flex-1 text-base text-on-accent">
        {option.label}
      </Text>
      {selected ? (
        <Icon
          icon={<CheckRegularIcon />}
          size={18}
          className="text-on-accent"
        />
      ) : null}
    </Pressable>
  );
}

function SelectInner({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  testID,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: Omit<SelectProps, "accent">): ReactNode {
  const [current, setValue] = useControllableValue(
    value,
    defaultValue,
    onValueChange,
  );
  const [open, setOpen] = useState(false);
  const { height: windowHeight } = useWindowDimensions();
  const selected = options.find((option) => option.value === current);

  const onSelect = (next: string) => {
    setValue(next);
    setOpen(false);
  };

  return (
    <>
      <InteractiveBox
        withFocusVisibleOutline
        role="combobox"
        aria-expanded={open}
        aria-disabled={disabled === true}
        disabled={disabled}
        testID={testID}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={triggerVariants({ disabled })}
        onPress={() => {
          setOpen(true);
        }}
      >
        <SelectTriggerContent
          label={selected?.label}
          placeholder={placeholder}
          disabled={disabled}
        />
      </InteractiveBox>
      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <Pressable
          className="flex-1 justify-center bg-translucent px-xl"
          onPress={() => {
            setOpen(false);
          }}
        >
          {/* Captures presses so tapping the list does not dismiss the modal. */}
          <Pressable className="w-full" aria-label={ariaLabel}>
            <Surface variant="highlight" shadow="l" size="sm" className="py-xs">
              {/* Pixel maxHeight (not a %) so the ScrollView sizes to its
                  content and only scrolls once it exceeds ~70% of the screen. */}
              <ScrollView
                style={{ maxHeight: windowHeight * 0.7 }}
                showsVerticalScrollIndicator={false}
              >
                {options.map((option) => (
                  <SelectOptionRow
                    key={option.value}
                    option={option}
                    selected={option.value === current}
                    onSelect={onSelect}
                  />
                ))}
              </ScrollView>
            </Surface>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

export function Select({ accent, ...rest }: SelectProps): ReactNode {
  return (
    <AccentScope accent={accent}>
      <SelectInner {...rest} />
    </AccentScope>
  );
}
