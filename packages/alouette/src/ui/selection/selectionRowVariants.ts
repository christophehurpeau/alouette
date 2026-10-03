import { tv } from "tailwind-variants";

// A bare label row (Radio, Checkbox) wears the `soft` material: no ground at
// rest, a surface tone on hover and press, the focus ring on keyboard focus.
// Its indicator takes the press alone, so the label never moves.
export const selectionRowVariants = tv({
  slots: {
    row: "group flex-row items-center gap-xs self-start rounded-xs px-xs min-h-11 focus-visible:focus-ring",
    label: "text-base",
  },
  variants: {
    disabled: {
      true: { label: "text-disabled-sharp" },
      false: {
        row: "hover:bg-interactive-soft-hover active:bg-interactive-soft-active",
        label: "text-sharp",
      },
    },
  },
});
