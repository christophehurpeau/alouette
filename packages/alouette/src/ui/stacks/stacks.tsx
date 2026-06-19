import { forwardRef } from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";

export type StackProps = RNViewProps;

export const Stack = forwardRef<RNView, StackProps>(
  ({ className, ...props }, ref) => {
    return (
      <RNView
        ref={ref}
        className={`flex-row flex-wrap ${className ?? ""}`}
        {...props}
      />
    );
  },
);

export type HStackProps = RNViewProps;

export const HStack = forwardRef<RNView, HStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <RNView ref={ref} className={`flex-row ${className ?? ""}`} {...props} />
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
