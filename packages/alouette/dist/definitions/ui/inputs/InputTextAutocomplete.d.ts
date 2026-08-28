import type { ReactNode } from "react";
import { type InputTextAutocompleteProps } from "./InputTextAutocomplete.shared";
/**
 * Native presents the combobox as a sheet: a `Modal` resigns the keyboard of
 * whatever is behind it, so the editable input has to live inside the overlay,
 * and the field left in the layout is a read-only trigger showing the current
 * text.
 */
export declare function InputTextAutocomplete({ filterOption, emptyLabel, placeholder, disabled, accent, mode, className, testID, ...rest }: InputTextAutocompleteProps): ReactNode;
//# sourceMappingURL=InputTextAutocomplete.d.ts.map