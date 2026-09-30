import type { ReactNode, Ref } from "react";
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

export interface SeparatorProps extends RNViewProps, SeparatorVariantProps {
  ref?: Ref<RNView>;
}

export function Separator({
  className,
  vertical,
  ...props
}: SeparatorProps): ReactNode {
  return (
    <RNView
      role="separator"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      className={separatorVariants({ vertical, className })}
      {...props}
    />
  );
}
