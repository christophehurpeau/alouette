import { forwardRef } from "react";
import type { View as RNView } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";
import type { SemanticRole } from "../../core/AlouetteConfig";
import { Box, type BoxProps } from "./Box";
import { SemanticScope } from "./SemanticScope";

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
    },
    defaultVariants: {
      size: "md",
    },
  },
  { twMerge: false },
);

type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;

export interface SurfaceProps
  extends Omit<BoxProps, "layer">, SurfaceVariantProps {
  variant?: /** Pairs layer="lowered" with shadow="lowered" for a sunken look. */
    "lowered" | "translucent";
  semanticRole?: SemanticRole;
}

export const Surface = forwardRef<RNView, SurfaceProps>(
  ({ className, size, variant, shadow, semanticRole, ...props }, ref) => {
    return (
      <SemanticScope semanticRole={semanticRole}>
        <Box
          ref={ref}
          layer={variant || "surface"}
          shadow={shadow ?? (variant === "lowered" ? "lowered" : "s")}
          className={surfaceVariants({ size, className })}
          {...props}
        />
      </SemanticScope>
    );
  },
);
