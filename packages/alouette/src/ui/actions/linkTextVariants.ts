import type { VariantProps } from "tailwind-variants";
import { tv } from "../../core/tv";

// The link treatment of the whole system, shared with ExternalLinkText: an
// underlined label drawn from the `interactive-*` foreground tokens, tinted on
// hover and press. Native resolves the icon tint through useColorToken, which
// reads the base `text-*` only, so the group-driven hover/active tint is
// web-only.
//
// `inline` (web only, a link inside a Text): react-native-web renders the frame
// `inline-flex`, whose baseline comes from its first item — the icon, whose
// baseline is its bottom edge — so the label would sit above the surrounding
// line. `self-baseline` on the label hands the frame its baseline instead. Only
// inline: a lone baseline item is pinned to the top of a frame taller than its
// line (a crumb's tap target). Native renders an inline link as a nested Text.
export const linkTextVariants = tv(
  {
    slots: {
      frame:
        "group flex-row items-center gap-xxs self-start focus-visible:focus-ring",
      text: "shrink font-body-bold underline transition-[color] duration-fast ease-in",
      icon: "",
    },
    variants: {
      size: {
        sm: { text: "text-sm" },
        md: { text: "text-base" },
      },
      inline: {
        true: { text: "self-baseline" },
        false: {},
      },
      disabled: {
        true: {
          text: "text-disabled-muted",
          icon: "text-disabled-muted",
        },
        false: {
          text: "text-interactive-pressable group-hover:text-interactive-hover group-active:text-interactive-active",
          icon: "text-interactive-pressable group-hover:text-interactive-hover group-active:text-interactive-active",
        },
      },
    },
    defaultVariants: { size: "md", disabled: false, inline: false },
  },
  { twMerge: false },
);

export type LinkTextSizeProps = Pick<
  VariantProps<typeof linkTextVariants>,
  "size"
>;

/** Icon size matching a link's text size. */
export function linkTextIconSize(size: LinkTextSizeProps["size"]): number {
  return size === "sm" ? 16 : 20;
}
