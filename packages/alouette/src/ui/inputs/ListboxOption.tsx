import { CheckRegularIcon } from "alouette-icons/phosphor-icons/CheckRegularIcon";
import { type ReactNode, forwardRef } from "react";
import {
  Pressable,
  type PressableProps,
  type View as RNView,
} from "react-native";
import { tv } from "tailwind-variants";
import { Icon } from "../primitives/Icon";
import { Text } from "../primitives/Text";
import type { SelectOption } from "./Select.shared";

// The background carries the cursor only: a row has no ground at rest and takes
// a fill as the cursor lands on it. That fill comes from the `interactive-soft-*`
// family — a tone of the popover's own surface rather than the accent — so the
// label keeps its color instead of flipping onto an accent ground, and an
// untouched list reads as rows on the surface. Selection shows as the check icon,
// so hovering the selected row never swaps its fill from one step to another.
const optionVariants = tv(
  {
    base: [
      "flex-row items-center justify-between gap-xxs rounded-xs px-m py-xs min-h-[44px]",
      "active:bg-interactive-soft-active",
      // The row's fill is the cursor, and the combobox input keeps the focus:
      // an outline here would ring a row the keyboard never lands on. A
      // zero-width one, because react-native-css drops `outline-style: none`
      // (`outline-none`) and leaves the browser's own ring in place.
      "outline-solid outline-0",
    ].join(" "),
    variants: {
      cursor: {
        // A listbox driving its cursor from JS owns both the pointer and the
        // keyboard position, so leaving CSS hover on would light a second row
        // while the arrow keys move elsewhere.
        rest: "",
        highlighted: "bg-interactive-soft-hover",
        hover:
          "hover:bg-interactive-soft-hover focus:bg-interactive-soft-focus",
      },
      disabled: {
        true: "opacity-50",
        false: "",
      },
    },
    defaultVariants: { cursor: "hover", disabled: false },
  },
  { twMerge: false },
);

export interface ListboxOptionProps extends Omit<
  PressableProps,
  "children" | "disabled"
> {
  option: SelectOption;
  selected: boolean;
  /**
   * Position of a JS-driven cursor (downshift's `highlightedIndex`), which
   * replaces CSS hover. Left undefined, the row lights on hover and focus.
   */
  highlighted?: boolean;
}

function cursorState(
  highlighted: boolean | undefined,
): "highlighted" | "hover" | "rest" {
  if (highlighted === undefined) return "hover";
  return highlighted ? "highlighted" : "rest";
}

/** One `role="option"` row of a listbox, shared by `Select` and `InputTextAutocomplete`. */
export const ListboxOption = forwardRef<RNView, ListboxOptionProps>(
  ({ option, selected, highlighted, ...props }, ref): ReactNode => {
    return (
      <Pressable
        ref={ref}
        role="option"
        {...props}
        // react-native-web's Pressable re-declares `aria-disabled` from its own
        // `disabled` prop, after the props it is spread, so it has to be
        // restated here — as does downshift's, which the spread carries.
        aria-disabled={option.disabled === true}
        // downshift's `getItemProps` reports the *highlighted* row as
        // `aria-selected`; the cursor is already carried by
        // `aria-activedescendant`, so the actual selection wins here — otherwise
        // it would only be conveyed by the unlabelled check icon.
        aria-selected={selected}
        disabled={option.disabled}
        className={optionVariants({
          cursor: cursorState(highlighted),
          disabled: option.disabled,
        })}
      >
        <Text numberOfLines={1} className="flex-1 text-base text-sharp">
          {option.label}
        </Text>
        {selected ? (
          <Icon icon={<CheckRegularIcon />} size={18} className="text-accent" />
        ) : null}
      </Pressable>
    );
  },
);
