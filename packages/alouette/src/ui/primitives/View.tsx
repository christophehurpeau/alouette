import { forwardRef } from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";

export type ViewProps = RNViewProps;

export const View = forwardRef<RNView, ViewProps>((props, ref) => {
  return <RNView ref={ref} {...props} />;
});
