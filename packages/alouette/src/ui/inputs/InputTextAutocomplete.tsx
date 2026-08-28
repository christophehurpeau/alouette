import type { ReactNode } from "react";
import { AccentScope } from "../containers/AccentScope";
import { Popover } from "../containers/Popover";
import { View } from "../primitives/View";
import { InputText } from "./InputText";
import {
  AutocompleteMenu,
  type InputTextAutocompleteProps,
  defaultFilterOption,
  useAutocomplete,
} from "./InputTextAutocomplete.shared";

/**
 * Native presents the combobox as a sheet: a `Modal` resigns the keyboard of
 * whatever is behind it, so the editable input has to live inside the overlay,
 * and the field left in the layout is a read-only trigger showing the current
 * text.
 */
export function InputTextAutocomplete({
  filterOption = defaultFilterOption,
  emptyLabel = "No result",
  placeholder,
  disabled,
  accent,
  mode,
  className,
  testID,
  ...rest
}: InputTextAutocompleteProps): ReactNode {
  const {
    isOpen,
    currentInputValue,
    inputProps,
    openMenu,
    closeMenu,
    ...menu
  } = useAutocomplete({
    ...rest,
    disabled,
    filterOption,
    scrollIntoView: false,
    inputInPopover: true,
  });
  // `onKeyDown` is web-only: on native `onKeyPress` carries an RN event
  // downshift cannot read, and there is no keyboard navigation to drive anyway.
  const { ref: inputRef, onKeyDown, onClick, ...restInputProps } = inputProps;

  return (
    <>
      <AccentScope accent={accent}>
        <InputText
          readOnly
          role="combobox"
          aria-expanded={isOpen}
          aria-label={rest["aria-label"]}
          aria-labelledby={rest["aria-labelledby"]}
          value={currentInputValue}
          mode={mode}
          placeholder={placeholder}
          disabled={disabled}
          testID={testID}
          className={className}
          onPressIn={() => {
            if (!disabled) openMenu();
          }}
        />
      </AccentScope>
      <Popover
        open={isOpen}
        placement="top"
        accent="none"
        aria-label={rest["aria-label"]}
        onClose={closeMenu}
      >
        <View className="gap-xs">
          <InputText
            ref={inputRef}
            // The sheet exists only to type in, and downshift's own focus
            // effect is a no-op on native (it needs `environment.document`).
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            mode={mode ?? "search"}
            placeholder={placeholder}
            {...restInputProps}
            // The native build returns `onPress` from `getInputProps`; RN's
            // TextInput takes `onPressIn`.
            onPressIn={onClick}
          />
          <AutocompleteMenu {...menu} emptyLabel={emptyLabel} />
        </View>
      </Popover>
    </>
  );
}
