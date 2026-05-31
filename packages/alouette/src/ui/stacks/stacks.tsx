import { forwardRef } from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";
import { type VariantProps, tv } from "tailwind-variants";

const stackVariants = tv({
  variants: {
    absoluteFill: {
      true: "absolute inset-0",
    },
  },
});

type StackVariantProps = VariantProps<typeof stackVariants>;

export interface StackProps extends RNViewProps, StackVariantProps {}

export const Stack = forwardRef<RNView, StackProps>(
  ({ className, absoluteFill, ...props }, ref) => {
    return (
      <RNView
        ref={ref}
        className={stackVariants({
          absoluteFill,
          className: `flex-row flex-wrap ${className ?? ""}`,
        })}
        {...props}
      />
    );
  },
);

export interface HStackProps extends RNViewProps, StackVariantProps {}

export const HStack = forwardRef<RNView, HStackProps>(
  ({ className, absoluteFill, ...props }, ref) => {
    return (
      <RNView
        ref={ref}
        className={stackVariants({
          absoluteFill,
          className: `flex-row ${className ?? ""}`,
        })}
        {...props}
      />
    );
  },
);

export type VStackProps = RNViewProps;

export const VStack = forwardRef<RNView, VStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <RNView ref={ref} className={`flex-col ${className ?? ""}`} {...props} />
    );
  },
);
