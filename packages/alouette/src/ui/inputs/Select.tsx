import { type ReactNode, useState } from "react";
import { useWindowDimensions } from "react-native";
import { tv } from "tailwind-variants";
import { useControllableValue } from "../../core/useControllableValue";
import { AccentScope } from "../containers/AccentScope";
import { InteractiveBox } from "../containers/Box";
import { Popover } from "../containers/Popover";
import { Surface } from "../containers/Surface";
import { ScrollView } from "../primitives/ScrollView";
import { ListboxOption } from "./ListboxOption";
import {
  type SelectProps,
  SelectTriggerContent,
  selectTriggerBaseClassName,
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
  const [current, setValue] = useControllableValue({
    value,
    defaultValue,
    onValueChange,
  });
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
      <Popover
        open={open}
        aria-label={ariaLabel}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Surface variant="highlight" shadow="l" size="sm" className="py-xs">
          {/* Pixel maxHeight (not a %) so the ScrollView sizes to its
              content and only scrolls once it exceeds ~70% of the screen. */}
          <ScrollView
            contentContainerClassName="gap-1"
            style={{ maxHeight: windowHeight * 0.7 }}
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                option={option}
                selected={option.value === current}
                onPress={() => {
                  onSelect(option.value);
                }}
              />
            ))}
          </ScrollView>
        </Surface>
      </Popover>
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
