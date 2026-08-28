import { type ReactNode, type Ref } from "react";
import type { PressableProps, TextInput as RNTextInput, View as RNView } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
import { type ViewProps } from "../primitives/View";
import type { InputTextMode, InputTextProps } from "./InputText";
import type { SelectOption } from "./Select.shared";
export interface ComboboxInputProps extends Omit<InputTextProps, "onKeyDown" | "onKeyPress"> {
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
}
interface ComboboxItemParams {
    item: AutocompleteOption;
    index: number;
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
export declare function defaultFilterOption(option: AutocompleteOption, inputValue: string): boolean;
interface UseAutocompleteParams extends Pick<InputTextAutocompleteProps, "aria-label" | "aria-labelledby" | "defaultInputValue" | "defaultValue" | "disabled" | "inputValue" | "onInputValueChange" | "onValueChange" | "options" | "value"> {
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
export declare function useAutocomplete({ options, value, defaultValue, onValueChange, inputValue, defaultInputValue, onInputValueChange, disabled, filterOption, scrollIntoView, inputInPopover, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, }: UseAutocompleteParams): UseAutocompleteResult;
interface AutocompleteMenuProps extends Pick<UseAutocompleteResult, "currentValue" | "getItemProps" | "highlightedIndex" | "menuProps" | "visibleOptions"> {
    emptyLabel: string;
}
export declare function AutocompleteMenu({ visibleOptions, currentValue, highlightedIndex, menuProps, getItemProps, emptyLabel, }: AutocompleteMenuProps): ReactNode;
export {};
//# sourceMappingURL=InputTextAutocomplete.shared.d.ts.map