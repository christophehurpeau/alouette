import { useSelect } from "downshift";
import { type ReactNode, type Ref, type RefObject, useRef } from "react";
import type { View as RNView } from "react-native";
import { useControllableValue } from "../../core/useControllableValue";
import { Box } from "../containers/Box";
import { Popover } from "../containers/Popover";
import { StableAccentScope } from "../containers/StableAccentScope";
import { ScrollView } from "../primitives/ScrollView";
import { View, type ViewProps } from "../primitives/View";
import { ListboxOption, type ListboxOptionProps } from "./ListboxOption";
import {
  type SelectOption,
  type SelectProps,
  SelectTriggerContent,
  selectTriggerVariants,
} from "./Select.shared";

// downshift's prop getters are typed against the DOM; they are re-typed here,
// where they meet the react-native-web components they are attached to.
type ListboxOptionPressHandler = ListboxOptionProps["onPress"];
type ListboxOptionHoverHandler = ListboxOptionProps["onHoverIn"];

interface SelectMenuProps extends ViewProps {
  ref: Ref<RNView>;
}

function optionToString(option: SelectOption | null): string {
  return option ? option.label : "";
}

// downshift's `useSelect` is the ARIA select-only combobox: the trigger keeps
// the focus and points at the highlighted option through
// `aria-activedescendant`, and it owns the keyboard — arrows, Home/End,
// type-ahead, Enter/Space, Escape. The trigger is a plain element because a
// react-native-web View forwards no `onKeyDown`.
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  icon,
  variant,
  disabled,
  invalid,
  accent,
  testID,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-required": ariaRequired,
}: SelectProps): ReactNode {
  const [current, setValue] = useControllableValue({
    value,
    defaultValue,
    onValueChange,
  });
  const selected = options.find((option) => option.value === current) ?? null;
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuNodeRef = useRef<HTMLElement | null>(null);

  const {
    isOpen,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    closeMenu,
  } = useSelect<SelectOption>({
    items: options,
    itemToString: optionToString,
    selectedItem: selected,
    isItemDisabled: (option) => option.disabled === true,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) setValue(selectedItem.value);
    },
    onIsOpenChange: ({ isOpen: nextIsOpen }) => {
      if (nextIsOpen) return;
      // A pressed option is a react-native-web Pressable, which takes the focus
      // from the trigger and loses it to the body as the panel goes away. Only
      // then is it handed back: a Tab out keeps going where it went.
      const active = document.activeElement;
      if (
        active === null ||
        active === document.body ||
        menuNodeRef.current?.contains(active)
      ) {
        triggerRef.current?.focus();
      }
    },
  });

  const { ref: menuRef, ...menuProps } = getMenuProps(
    {
      ref: (node: HTMLElement | null) => {
        menuNodeRef.current = node;
      },
      // This combobox renders no label element of its own, so downshift's
      // default `aria-labelledby` would point at nothing.
      "aria-labelledby": ariaLabelledby,
    },
    // The menu only exists while open: it lives in a Popover, which renders
    // nothing until then.
    { suppressRefError: !isOpen },
  ) as unknown as SelectMenuProps;

  // downshift drops its handlers for a disabled trigger but keeps it in the
  // tab order, and forwards `disabled`, which a div ignores: a disabled select
  // leaves the tab order, as a native one does.
  const { disabled: _disabled, ...toggleButtonProps } = getToggleButtonProps({
    ref: triggerRef,
    disabled,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "aria-disabled": disabled === true,
    "aria-invalid": invalid === true,
    "aria-required": ariaRequired,
    tabIndex: disabled === true ? -1 : 0,
  });

  return (
    <>
      {/* Stable: `invalid` toggles while the form is edited, and a plain
          AccentScope would remount the trigger (and downshift's ref to it). */}
      <StableAccentScope accent={invalid ? "danger" : accent}>
        <div
          {...toggleButtonProps}
          data-testid={testID}
          className={selectTriggerVariants({
            variant,
            disabled: disabled === true,
          })}
        >
          <SelectTriggerContent
            label={selected?.label}
            placeholder={placeholder}
            icon={icon}
            variant={variant}
            disabled={disabled}
          />
        </div>
      </StableAccentScope>
      <Popover
        open={isOpen}
        anchorRef={triggerRef as unknown as RefObject<RNView | null>}
        accent="neutral"
        onClose={closeMenu}
      >
        <View className="pt-xxs">
          <Box className="surface-popover">
            {/* The scroller stays inside the menu element: downshift scrolls
                the highlighted row into view with the menu as the boundary. */}
            <View ref={menuRef} {...menuProps}>
              <ScrollView
                className="max-h-[320px]"
                contentContainerClassName="gap-1"
              >
                {options.map((option, index) => {
                  const {
                    ref: itemRef,
                    onClick: onItemClick,
                    onMouseMove: onItemMouseMove,
                    onMouseDown: _onItemMouseDown,
                    onPress: _onItemPress,
                    ...itemProps
                  } = getItemProps({ item: option, index });
                  return (
                    <ListboxOption
                      key={option.value}
                      ref={itemRef}
                      {...itemProps}
                      option={option}
                      selected={option.value === current}
                      highlighted={index === highlightedIndex}
                      // react-native-web's Pressable overwrites any `onClick`
                      // with its own press responder, and drops the DOM
                      // `onMouseMove` that moves downshift's cursor.
                      onPress={
                        onItemClick as unknown as ListboxOptionPressHandler
                      }
                      onHoverIn={
                        onItemMouseMove as unknown as ListboxOptionHoverHandler
                      }
                    />
                  );
                })}
              </ScrollView>
            </View>
          </Box>
        </View>
      </Popover>
    </>
  );
}
