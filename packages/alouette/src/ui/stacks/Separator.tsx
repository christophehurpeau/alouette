import { forwardRef } from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";

const separatorVariants = tv({
  base: "border-border-sharp",
  variants: {
    vertical: {
      true: "self-stretch border-r w-px",
      false: "self-stretch border-b h-px",
    },
  },
  defaultVariants: {
    vertical: false,
  },
});

type SeparatorVariantProps = VariantProps<typeof separatorVariants>;

export interface SeparatorProps extends RNViewProps, SeparatorVariantProps {}

export const Separator = forwardRef<RNView, SeparatorProps>(
  ({ className, vertical, ...props }, ref) => {
    return (
      <RNView
        ref={ref}
        className={separatorVariants({ vertical, className })}
        {...props}
      />
    );
  },
);
