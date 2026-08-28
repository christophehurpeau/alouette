import { type PressableProps, type View as RNView } from "react-native";
import type { SelectOption } from "./Select.shared";
export interface ListboxOptionProps extends Omit<PressableProps, "children" | "disabled"> {
    option: SelectOption;
    selected: boolean;
    /**
     * Position of a JS-driven cursor (downshift's `highlightedIndex`), which
     * replaces CSS hover. Left undefined, the row lights on hover and focus.
     */
    highlighted?: boolean;
}
/** One `role="option"` row of a listbox, shared by `Select` and `InputTextAutocomplete`. */
export declare const ListboxOption: import("react").ForwardRefExoticComponent<ListboxOptionProps & import("react").RefAttributes<RNView>>;
//# sourceMappingURL=ListboxOption.d.ts.map