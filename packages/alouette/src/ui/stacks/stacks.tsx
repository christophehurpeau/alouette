import { forwardRef } from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";
import { twMerge } from "../../core/twMerge";

export type StackProps = RNViewProps;

/** @deprecated Use `<View className="flex-row flex-wrap">`. */
export const Stack = forwardRef<RNView, StackProps>(
  ({ className, ...props }, ref) => {
    return (
      <RNView
        ref={ref}
        className={twMerge("flex-row flex-wrap", className)}
        {...props}
      />
    );
  },
);

export type HStackProps = RNViewProps;

/**
 * @deprecated Use `<View className="flex-row">` — the className takes a
 * breakpoint prefix (`flex-col md:flex-row`). `npx alouette-codemod
 * surface-and-stacks src` rewrites every use.
 */
export const HStack = forwardRef<RNView, HStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <RNView ref={ref} className={twMerge("flex-row", className)} {...props} />
    );
  },
);

export type VStackProps = RNViewProps;

/**
 * @deprecated Use `<View>`: a View is already a column on React Native and
 * react-native-web. `npx alouette-codemod surface-and-stacks src` rewrites every
 * use.
 */
export const VStack = forwardRef<RNView, VStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <RNView ref={ref} className={twMerge("flex-col", className)} {...props} />
    );
  },
);
