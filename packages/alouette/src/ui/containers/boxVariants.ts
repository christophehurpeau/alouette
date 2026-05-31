import { type VariantProps, tv } from "tailwind-variants";

// Allow Box to shrink when used inside HStack/VStack (matches the original
// BoxFrame default). overflow is intentionally left off so multi-layer
// box-shadows are not clipped.
export const boxBaseClasses = "shrink";

export const boxVariants = tv(
  {
    base: boxBaseClasses,
    variants: {
      layer: {
        surface: "bg-surface",
        highlight: "bg-highlight",
        "highlight-accent": "bg-highlight-accent",
        lowered: "bg-lowered",
        translucent: "bg-translucent",
      },
      shadow: {
        none: "shadow-none",
        s: "shadow-s",
        m: "shadow-m",
        l: "shadow-l",
        lowered: "shadow-lowered",
      },
      tint: {
        accent: "",
      },
      absoluteFill: {
        true: "absolute inset-0",
      },
      center: {
        true: "items-center justify-center",
      },
    },
  },
  // Disable tw-merge: variants set distinct properties (bg-*, shadow-*, ...)
  // that don't actually conflict despite sharing prefixes in some cases.
  { twMerge: false },
);

export type BoxVariantProps = VariantProps<typeof boxVariants>;
