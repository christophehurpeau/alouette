import { tv } from "../../core/tv";

// A bare label row (Radio, Checkbox) wears the `soft` material: no ground at
// rest, a surface tone on hover and press, the focus ring on keyboard focus.
// Its indicator takes the press alone, so the label never moves. A grouped row
// stretches to its group, which shrinks to its widest row, so every option of
// a group has the same target; a standalone one keeps its own width.
export const selectionRowVariants = tv({
  slots: {
    row: "group flex-row items-center gap-xs rounded-xs px-xs min-h-control-md focus-visible:focus-ring",
    label: "text-base",
  },
  variants: {
    standalone: {
      true: { row: "self-start" },
      false: {},
    },
    disabled: {
      true: { label: "text-disabled-sharp" },
      false: {
        row: "hover:bg-interactive-soft-hover active:bg-interactive-soft-active",
        label: "text-sharp",
      },
    },
  },
});
