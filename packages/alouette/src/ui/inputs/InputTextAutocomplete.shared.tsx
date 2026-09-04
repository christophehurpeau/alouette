import { type ReactNode, type Ref, useMemo } from "react";
import type {
  PressableProps,
  TextInput as RNTextInput,
  View as RNView,
} from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
import { useControllableValue } from "../../core/useControllableValue";
import { Surface } from "../containers/Surface";
import { ScrollView } from "../primitives/ScrollView";
import { Text } from "../primitives/Text";
import { View, type ViewProps } from "../primitives/View";
import type { InputTextMode, InputTextProps } from "./InputText";
import { ListboxOption } from "./ListboxOption";
import type { SelectOption } from "./Select.shared";
import { useCombobox } from "./useCombobox";

// downshift's prop getters are typed against the DOM, while its `react-native`
// build returns RN handlers (`onChangeText`, `onPress`) from those same getters.
// Both shapes are re-typed here, at the single boundary where they are read, and
// attached to the alouette components explicitly.
export interface ComboboxInputProps extends Omit<
  InputTextProps,
  "onKeyDown" | "onKeyPress"
> {
  ref: Ref<RNTextInput>;
  /**
   * Web only. Typed as the `onKeyPress` handler rather than as a DOM one
   * because that is the prop it ends up on — react-native-web hands it the same
   * React keyboard event downshift expects.
   */
  onKeyDown?: InputTextProps["onKeyPress"];
  /** Web only; the native build opens the menu from `onPressIn` instead. */
  onClick?: () => void;
}

interface ComboboxMenuProps extends ViewProps {
  ref: Ref<RNView>;
}

interface ComboboxItemProps extends Omit<PressableProps, "onPress"> {
  ref: Ref<RNView>;
  onClick?: () => void;
  onPress?: () => void;
  /** Web only: how downshift moves its cursor with the pointer. */
  onMouseMove?: () => void;
}

interface ComboboxItemParams {
  item: AutocompleteOption;
  index: number;
}

// The menu scrolls itself, and on native there is no DOM node to scroll into
// view — downshift's default implementation is `compute-scroll-into-view`.
function noScrollIntoView(): void {
  /* no-op */
}

export type AutocompleteOption = SelectOption;

export interface InputTextAutocompleteProps {
  options: AutocompleteOption[];
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value, for uncontrolled usage. */
  defaultValue?: string;
  /** Called with the newly selected value, or `""` when the selection is cleared. */
  onValueChange?: (value: string) => void;
  /** Controlled input text. */
  inputValue?: string;
  /** Initial input text; defaults to the label of `defaultValue`. */
  defaultInputValue?: string;
  onInputValueChange?: (inputValue: string) => void;
  /**
   * Keeps an option in the menu for the current text. Defaults to a
   * case-insensitive substring match on the label.
   */
  filterOption?: (option: AutocompleteOption, inputValue: string) => boolean;
  /** Shown in place of the list when nothing matches. */
  emptyLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  accent?: Accent;
  mode?: InputTextMode;
  className?: string;
  testID?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function defaultFilterOption(
  option: AutocompleteOption,
  inputValue: string,
): boolean {
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
}

function optionToString(option: AutocompleteOption | null): string {
  return option ? option.label : "";
}

interface UseAutocompleteParams extends Pick<
  InputTextAutocompleteProps,
  | "aria-label"
  | "aria-labelledby"
  | "defaultInputValue"
  | "defaultValue"
  | "disabled"
  | "inputValue"
  | "onInputValueChange"
  | "onValueChange"
  | "options"
  | "value"
> {
  filterOption: (option: AutocompleteOption, inputValue: string) => boolean;
  /** Native has no DOM node to scroll to, and its menu scrolls itself. */
  scrollIntoView: boolean;
  /**
   * Native renders the editable input inside the overlay, so it only exists
   * while the menu is open — downshift has no ref to hold in between.
   */
  inputInPopover: boolean;
}

export interface UseAutocompleteResult {
  isOpen: boolean;
  visibleOptions: AutocompleteOption[];
  currentValue: string | undefined;
  currentInputValue: string;
  highlightedIndex: number;
  inputProps: ComboboxInputProps;
  menuProps: ComboboxMenuProps;
  getItemProps: (params: ComboboxItemParams) => ComboboxItemProps;
  openMenu: () => void;
  closeMenu: () => void;
}

export function useAutocomplete({
  options,
  value,
  defaultValue,
  onValueChange,
  inputValue,
  defaultInputValue,
  onInputValueChange,
  disabled,
  filterOption,
  scrollIntoView,
  inputInPopover,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: UseAutocompleteParams): UseAutocompleteResult {
  const [currentValue, setCurrentValue] = useControllableValue({
    value,
    defaultValue,
    onValueChange,
  });
  const selectedOption =
    options.find((option) => option.value === currentValue) ?? null;

  const [currentInputValue = "", setCurrentInputValue] = useControllableValue({
    value: inputValue,
    defaultValue:
      defaultInputValue ??
      // `value` as well as `defaultValue`: a caller controlling the selection
      // without controlling the text still expects the field to start on the
      // selected label rather than empty.
      options.find((option) => option.value === (defaultValue ?? value))?.label,
    onValueChange: onInputValueChange,
  });

  const selectedLabel = selectedOption?.label;
  const visibleOptions = useMemo(() => {
    // Right after a selection the text *is* the selected label; filtering on it
    // would reopen the menu on a single-item list.
    if (currentInputValue === "" || currentInputValue === selectedLabel) {
      return options;
    }
    return options.filter((option) => filterOption(option, currentInputValue));
  }, [options, currentInputValue, selectedLabel, filterOption]);

  const {
    isOpen,
    highlightedIndex,
    getInputProps,
    getMenuProps,
    getItemProps,
    openMenu,
    closeMenu,
  } = useCombobox<AutocompleteOption>({
    items: visibleOptions,
    itemToString: optionToString,
    inputValue: currentInputValue,
    selectedItem: selectedOption,
    isItemDisabled: (option) => option.disabled === true,
    onInputValueChange: ({ inputValue: nextInputValue }) => {
      setCurrentInputValue(nextInputValue);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      setCurrentValue(selectedItem ? selectedItem.value : "");
    },
    ...(scrollIntoView ? null : { scrollIntoView: noScrollIntoView }),
  });

  return {
    isOpen,
    visibleOptions,
    currentValue,
    currentInputValue,
    highlightedIndex,
    inputProps: getInputProps(
      {
        disabled,
        "aria-label": ariaLabel,
        // Overrides the id downshift points at by default: this combobox
        // renders no label element of its own, so that id would dangle.
        "aria-labelledby": ariaLabelledby,
      },
      { suppressRefError: inputInPopover && !isOpen },
    ) as unknown as ComboboxInputProps,
    menuProps: getMenuProps(
      {
        // Same override as the input: without a label element of our own,
        // downshift's default `aria-labelledby` would point at nothing. The
        // listbox is left unnamed unless the caller supplies a real label.
        "aria-labelledby": ariaLabelledby,
      },
      // The menu only exists while open — it lives in a Popover, which renders
      // nothing until then, so downshift has no ref to hold in between.
      { suppressRefError: !isOpen },
    ) as unknown as ComboboxMenuProps,
    getItemProps: (params) =>
      getItemProps(params) as unknown as ComboboxItemProps,
    openMenu,
    closeMenu,
  };
}

interface AutocompleteMenuProps extends Pick<
  UseAutocompleteResult,
  | "currentValue"
  | "getItemProps"
  | "highlightedIndex"
  | "menuProps"
  | "visibleOptions"
> {
  emptyLabel: string;
}

export function AutocompleteMenu({
  visibleOptions,
  currentValue,
  highlightedIndex,
  menuProps,
  getItemProps,
  emptyLabel,
}: AutocompleteMenuProps): ReactNode {
  const { ref: menuRef, ...restMenuProps } = menuProps;
  return (
    <Surface variant="highlight" shadow="l" size="sm" className="p-xs pl-md">
      {/* Sibling of the listbox, not a child of it: a listbox owns options
          only, so a bare text node in there is announced as "0 items" and the
          message itself is skipped. */}
      {visibleOptions.length === 0 ? (
        <Text role="status" className="px-m py-xs text-base text-muted">
          {emptyLabel}
        </Text>
      ) : null}
      {/* The scroller stays inside the menu element: downshift scrolls the
          highlighted row into view with the menu as the boundary, so the
          scrollable box has to be a descendant of it. */}
      <View ref={menuRef} {...restMenuProps}>
        <ScrollView
          className="max-h-[240px] pr-xs"
          contentContainerClassName="gap-1"
          keyboardShouldPersistTaps="handled"
        >
          {visibleOptions.map((option, index) => {
            const {
              ref: itemRef,
              onClick: onItemClick,
              onPress: onItemPress,
              onMouseMove: onItemMouseMove,
              ...itemProps
            } = getItemProps({ item: option, index });
            const selected = option.value === currentValue;
            return (
              <ListboxOption
                key={option.value}
                ref={itemRef}
                {...itemProps}
                option={option}
                selected={selected}
                highlighted={index === highlightedIndex}
                // The web build returns `onClick`, the react-native one
                // `onPress`; react-native-web's Pressable overwrites any
                // `onClick` it is handed with its own press responder.
                onPress={onItemPress ?? onItemClick}
                // Same for the cursor: the row paints from downshift's
                // `highlightedIndex`, and its `onMouseMove` is the only thing
                // that moves it with the pointer — a DOM handler a
                // react-native-web Pressable drops, hence `onHoverIn`.
                onHoverIn={onItemMouseMove}
              />
            );
          })}
        </ScrollView>
      </View>
    </Surface>
  );
}
