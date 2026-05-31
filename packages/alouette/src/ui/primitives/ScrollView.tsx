import { forwardRef } from "react";
import {
  ScrollView as RNScrollView,
  type ScrollViewProps as RNScrollViewProps,
} from "react-native";

export type ScrollViewProps = RNScrollViewProps;

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(
  (props, ref) => {
    return <RNScrollView ref={ref} {...props} />;
  },
);
