import { forwardRef } from "react";
import type { View as RNView } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { twMergeConfig } from "../../core/twMerge";
import { Box, type BoxProps } from "./Box";

const surfaceVariants = tv(
  {
    base: "surface",
    variants: {
      size: {
        xxs: "surface-xxs",
        xs: "surface-xs",
        sm: "surface-sm",
        md: "surface-md",
        lg: "surface-lg",
      },
      variant: {
        surface: "bg-surface",
        highlight: "bg-highlight",
        "highlight-accent": "bg-highlight-accent",
        lowered: "lowered",
        translucent: "bg-translucent",
      },
      shadow: {
        none: "shadow-none",
        s: "shadow-s",
        m: "shadow-m",
        l: "shadow-l",
        lowered: "shadow-lowered",
      },
    },
  },
  { twMergeConfig },
);

type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;

export interface SurfaceProps extends BoxProps {
  accent?: Accent;
  /**
   * @deprecated Write the size utility, which takes a breakpoint prefix:
   * `size="sm"` is `surface-sm` (`surface-xxs` … `surface-lg`).
   */
  size?: SurfaceVariantProps["size"];
  /**
   * @deprecated Write the ground class: `variant="highlight"` is
   * `bg-highlight`, and `variant="lowered"` is the `lowered` utility (ground and
   * inset shadow together).
   */
  variant?: SurfaceVariantProps["variant"];
  /** @deprecated Write the shadow class: `shadow="l"` is `shadow-l`. */
  shadow?: SurfaceVariantProps["shadow"];
}

/**
 * @deprecated Write `<Box className="surface">`: the `surface` utility is this
 * component's defaults (ground, shadow, padding, radius, overflow-hidden), and
 * every class after it — `lowered`, `bg-highlight`, `shadow-m`, `surface-sm`,
 * `md:surface-lg` — overrides its own part.
 */
export const Surface = forwardRef<RNView, SurfaceProps>(
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- still honoured until removal
  ({ className, size, variant, shadow, accent, ...props }, ref) => (
    <Box
      ref={ref}
      accent={accent}
      className={surfaceVariants({ size, variant, shadow, className })}
      {...props}
    />
  ),
);
