import { type ReactNode, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useControllableValue } from "../../core/useControllableValue";
import { Box, InteractiveBox } from "../containers/Box";
import { Popover } from "../containers/Popover";
import { StableAccentScope } from "../containers/StableAccentScope";
import { ScrollView } from "../primitives/ScrollView";
import { ListboxOption } from "./ListboxOption";
import {
  type SelectProps,
  SelectTriggerContent,
  selectTriggerVariants,
} from "./Select.shared";

function SelectInner({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  icon,
  variant,
  disabled,
  invalid,
  testID,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-required": ariaRequired,
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

  // Untyped by react-native, which ignores them; declared on SelectProps for
  // the web build and kept here so both platforms take the same props.
  const webAriaProps = {
    "aria-invalid": invalid === true,
    "aria-describedby": ariaDescribedby,
    "aria-required": ariaRequired,
  };

  return (
    <>
      <InteractiveBox
        withFocusVisibleOutline
        // oxlint-disable-next-line jsx-a11y/role-has-required-aria-props -- React Native has no aria-controls (Select.web.tsx renders a native <select>)
        role="combobox"
        aria-expanded={open}
        aria-disabled={disabled === true}
        disabled={disabled}
        testID={testID}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        {...webAriaProps}
        className={selectTriggerVariants({
          variant,
          disabled: disabled === true,
        })}
        onPress={() => {
          setOpen(true);
        }}
      >
        <SelectTriggerContent
          label={selected?.label}
          placeholder={placeholder}
          icon={icon}
          variant={variant}
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
        <Box className="surface-popover">
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
        </Box>
      </Popover>
    </>
  );
}

// Stable: `invalid` toggles while the form is edited, and a plain AccentScope
// would remount the trigger with it.
export function Select({ accent, ...rest }: SelectProps): ReactNode {
  return (
    <StableAccentScope accent={rest.invalid ? "danger" : accent}>
      <SelectInner {...rest} />
    </StableAccentScope>
  );
}
