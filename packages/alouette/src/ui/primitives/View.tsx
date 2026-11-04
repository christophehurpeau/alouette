import type { ComponentRef, ReactNode, Ref } from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";

export interface ViewProps extends RNViewProps {
  ref?: Ref<ComponentRef<typeof RNView>>;
}

export function View(props: ViewProps): ReactNode {
  return <RNView {...props} />;
}
