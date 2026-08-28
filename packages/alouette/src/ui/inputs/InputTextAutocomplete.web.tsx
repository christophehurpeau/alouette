import { type ReactNode, useRef } from "react";
import type { View as RNView } from "react-native";
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
  const anchorRef = useRef<RNView>(null);
  const { isOpen, inputProps, closeMenu, ...menu } = useAutocomplete({
    ...rest,
    disabled,
    filterOption,
    scrollIntoView: true,
    inputInPopover: false,
  });
  const { ref: inputRef, onKeyDown, onClick, ...restInputProps } = inputProps;

  return (
    <>
      <AccentScope accent={accent}>
        {/* The anchor has to be a real box (its rect positions the popover), so
            it — not the input — takes `className`: it is the element the parent
            lays out, and native has no wrapper at all. The input then stretches
            to it. */}
        <View ref={anchorRef} className={className}>
          <InputText
            ref={inputRef}
            mode={mode}
            placeholder={placeholder}
            testID={testID}
            {...restInputProps}
            // Tapping the input reopens the menu; react-native-web's TextInput
            // forwards `onClick` and drops `onPressIn`.
            onClick={onClick}
            // react-native-web's TextInput replaces `onKeyDown` with its own
            // handler and never calls the one it was given — but that handler does
            // call `onKeyPress`, with the same React keyboard event.
            onKeyPress={onKeyDown}
          />
        </View>
      </AccentScope>
      <Popover
        open={isOpen}
        anchorRef={anchorRef}
        accent="none"
        onClose={closeMenu}
      >
        <View className="pt-xxs">
          <AutocompleteMenu {...menu} emptyLabel={emptyLabel} />
        </View>
      </Popover>
    </>
  );
}
