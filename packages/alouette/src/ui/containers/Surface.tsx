import { forwardRef } from "react";
import type { View as RNView } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { Accent } from "../../core/AlouetteConfig";
import { AccentScope } from "./AccentScope";
import { Box, type BoxProps } from "./Box";

const surfaceVariants = tv(
  {
    // overflow-hidden so the multi-layer shadow respects the rounded corners.
    base: "overflow-hidden",
    variants: {
      size: {
        sm: "p-m rounded-xs",
        md: "p-xl rounded-sm",
        lg: "p-xxl rounded-md",
      },
      variant: {
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
    },
    defaultVariants: {
      size: "md",
      variant: "surface",
    },
  },
  { twMerge: false },
);

type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;

export interface SurfaceProps extends BoxProps, SurfaceVariantProps {
  accent?: Accent;
}

export const Surface = forwardRef<RNView, SurfaceProps>(
  ({ className, size, variant, shadow, accent, ...props }, ref) => {
    // shadow defaults to "s", or "lowered" when variant="lowered".
    const resolvedShadow = shadow ?? (variant === "lowered" ? "lowered" : "s");
    return (
      <AccentScope accent={accent}>
        <Box
          ref={ref}
          className={surfaceVariants({
            size,
            variant,
            shadow: resolvedShadow,
            className,
          })}
          {...props}
        />
      </AccentScope>
    );
  },
);
